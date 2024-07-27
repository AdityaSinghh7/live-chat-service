import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateUserDto } from 'src/user/model/dto/create-user.dto';
import { LoginUserDto } from 'src/user/model/dto/login-user.dto';
import { UserInterface } from 'src/user/model/user.interface';

@Injectable()
export class UserHelperService {

    createUserDto(createUserDto: CreateUserDto): Observable<UserInterface>{
        return of({
            email: createUserDto.email,
            username: createUserDto.username,
            password: createUserDto.password,
        });

    }

    loginUserDto(loginUserDto: LoginUserDto): Observable<UserInterface>{
        return of({
            email: loginUserDto.email,
            password: loginUserDto.password,
        });
    }
}
