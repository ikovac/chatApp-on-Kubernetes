import { Controller, Post, Body, Get } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    // https://blog.angular-university.io/angular-jwt-authentication/
    @Post('login')
    async login(@Body() user: IUser): Promise<string> {
        return await this.userService.checkIfUserIsOk(user) ? 'User found' : 'User info not correct';
    }
}
