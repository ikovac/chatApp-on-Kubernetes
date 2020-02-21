import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisClientService {
    logger = new Logger('RedisClientService');

    constructor(private readonly redisService: RedisService) {}

    async logTheClient() {
        // this.logger.log(await this.redisService.getClient());
    }
}
