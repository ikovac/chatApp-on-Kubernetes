import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async sign(payload): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }
}
