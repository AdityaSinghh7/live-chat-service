import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { map, Observable, of, switchMap } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserHelperService } from 'src/user-helper/user-helper.service';
import { UserInterface } from '../user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginResponse } from '../login-response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';



@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
        private userHelper: UserHelperService
    ){}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<UserInterface>{
        return this.userHelper.createUserDto(createUserDto).pipe(
            switchMap((user: UserInterface) => this.userService.create(user))
        )
    }

    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Observable<Pagination<UserInterface>>{
        limit = limit > 100 ? 100: limit;
        return this.userService.findAll({page, limit, route: 'http://localhost:3000/api/users'})

    }

    @Post('login')
    login(@Body() loginUserDto:LoginUserDto): Observable<LoginResponse>{
        return this.userHelper.loginUserDto(loginUserDto).pipe(
            switchMap((user: UserInterface) => this.userService.login(user).pipe(
                map((jwt: string) => {
                    return {
                       access_token: jwt,
                       token_type: "JWT",
                       expires_in: 10000
                    };
                    

                })
            ))
        )
    }

}
