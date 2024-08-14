import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "src/auth/service/auth.service";
import { UserInterface } from "src/user/model/user.interface";
import { UserService } from "src/user/user.service";


export interface RequestModel extends Request{
    user: UserInterface
}

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private authService: AuthService, private userService: UserService){}

    async use(req: Request, res: Response, next: NextFunction){

        try{
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
            const user: UserInterface = await this.userService.getOne(decodedToken.user.id);
            if(user){

                req.user = user;
                next();
            } else{
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch{
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

    }
}