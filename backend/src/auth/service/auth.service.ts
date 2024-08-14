import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/user/model/user.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService ){}

    generateJwt(user: UserInterface): Observable<string>{
        return from(this.jwtService.signAsync({user}) as Promise<string>);

    }

    hashPassword(password: string): Observable<string>{
        const saltRounds = 10;
        return from(bcrypt.hash(password, saltRounds) as Promise<string>);
    }

    comparePasswords(password: string, storedPasswordHash: string): Observable<any>{
        return from(bcrypt.compare(password, storedPasswordHash) as Promise<boolean>);
    }

    verifyJwt(jwt: string): Promise<any>{
        return this.jwtService.verifyAsync(jwt);
    }
}
