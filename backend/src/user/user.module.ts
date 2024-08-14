import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { UserController } from './model/controller/user.controller';
import { UserHelperService } from 'src/user-helper/user-helper.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, UserHelperService],
  exports: [UserService]
})
export class UserModule {}
