import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async sign(payload): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

    async unsign(payload): Promise<IUser> {
        const user = await this.jwtService.decode(payload);
        return  user as IUser;
    }
}
