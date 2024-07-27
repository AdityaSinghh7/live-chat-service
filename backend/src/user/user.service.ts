import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './model/user.interface';
import { catchError, from, map, mapTo, Observable, switchMap, throwError } from 'rxjs';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/service/auth.service';
import { LoginResponse } from './model/login-response.interface';
import { plainToClass } from 'class-transformer';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private authenticationService: AuthService
    ){}

    create(newUser: UserInterface): Observable<UserInterface>{
        return this.mailExists(newUser.email).pipe(
            switchMap((exists: boolean) => {
                if (exists) {
                    throw new HttpException('Email already in use:', HttpStatus.CONFLICT);
                } else {
                    return this.hashPassword(newUser.password).pipe(
                        switchMap((hashedPassword: string) => {
                            newUser.password = hashedPassword;
                            return from(this.userRepo.save(newUser)).pipe(
                                map((savedUser: UserInterface) => plainToClass(UserEntity, savedUser)),
                                catchError(err => throwError(() => new Error(`Failed to create user: ${err.message}`)))
                            );
                        })
                    );
                }
            })
        );
    }

    login(user: UserInterface): Observable<string>{
        return this.findByEmail(user.email).pipe(
            switchMap((foundUser: UserInterface) => {
                if (foundUser) {
                    return this.validatePassword(user.password, foundUser.password).pipe(
                        switchMap((matches: boolean) => {
                            if (matches) {
                                return this.findOne(foundUser.id).pipe(
                                    switchMap((payload: UserInterface)=> this.authenticationService.generateJwt(payload))
                                );
                            } else {
                                throw new HttpException('Unauthorized credentials', HttpStatus.UNAUTHORIZED);
                            }
                        })
                    );
                } else {
                    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                }
            })
        );
    }






    findAll(options: IPaginationOptions): Observable<Pagination<UserInterface>>{
        return from(paginate<UserEntity>(this.userRepo, options));
    }






    private findOne(id: number): Observable<UserInterface> {
        return from(this.userRepo.findOne({ where: { id }, select: ['id', 'username', 'email'] }));
    }

    private validatePassword(password: string, storedPasswordHash: string): Observable<boolean>{
        return this.authenticationService.comparePasswords(password, storedPasswordHash);

    }

    private findByEmail(email: string): Observable<UserInterface>{
        return from(this.userRepo.findOne({where: {email}, select: ['id', 'email', 'password', 'username']}));
    }

    private hashPassword(password: string): Observable<string>{
        return this.authenticationService.hashPassword(password);
    }

    private mailExists(email: string): Observable<boolean>{
        return from(this.userRepo.findOne({ where: { email } })).pipe(
            map((user: UserInterface) => {
                return !!user;  
            })
        );
    }
}
