import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from 'src/interfaces/user.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly authService: AuthService,
    ) { }

    async validateUser(user: IUser): Promise<IUser> {
        const dbUser = await this.userRepo.findOne({ username: user.username });

        if (!dbUser) {
            return null;
        }

        if (dbUser.pass !== user.pass) {
            return null;
        }

        const {pass, ...rest} = dbUser;
        return rest;
    }

    async login(user: IUser) {
        const result = await this.validateUser(user);

        if(!result) {
            return null;
        }

        return await this.authService.sign(result);
    }
}
