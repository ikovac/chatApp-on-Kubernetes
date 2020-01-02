import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

    async checkIfUserIsOk(user: IUser): Promise<boolean> {
        const dbUser = await this.userRepo.findOne({ username: user.username });

        if (!dbUser) {
            return false;
        }

        if (dbUser.pass !== user.pass) {
            return false;
        }

        return true;
    }
}
