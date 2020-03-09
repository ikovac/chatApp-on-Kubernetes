import { Controller, Post, Body, Get, UseGuards, Request as Req, Response as Res, Param } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { UserService } from './user.service';
import { Response, Request, CookieOptions } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    // https://blog.angular-university.io/angular-jwt-authentication/
    @Post('login')
    async login(@Body() user: IUser, @Req() req: Request, @Res() res: Response) {
        const jwt = await this.userService.login(user);

        if (!jwt) {
            return res.json({
                status: false,
                msg: 'User not found'
            });
        }
        const cookieOptions: CookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            // sameSite: 'none',
            // secure: true,
        };
        res.cookie('token', jwt, cookieOptions);
        res.json({
            status: true,
            msg: 'User found',
            data: jwt
        });
    }

    @Get('getall/:currentUser')
    async getAllUsers(@Param() params): Promise<IUser[]> {
        const dbUsers = await this.userService.getAllUsers(params.currentUser);
        return dbUsers.map(user => {
            const { pass, ...rest } = user;
            return rest;
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    profile(@Req() req: Request) {
        return req.user;
    }
}
