import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisClientService {
    logger = new Logger('RedisClientService');

    constructor(private readonly redisService: RedisService) { }

    async getOnlineUsers(user) {
        const onlineUsersJSON = await this.redisService.getClient().get('online_users');
        const onlineUsers = onlineUsersJSON ? JSON.parse(onlineUsersJSON) : [];
        
        const userFullName = user.first_name + ' ' + user.last_name;

        if (!onlineUsers.includes(userFullName)) {
            onlineUsers.push(user.first_name + ' ' + user.last_name);
            await this.redisService.getClient().set('online_users', JSON.stringify(onlineUsers));
        }

        return onlineUsers;
    }

    async removeUserOnline(user) {
        const onlineUsersJSON = await this.redisService.getClient().get('online_users');
        const onlineUsers = onlineUsersJSON ? JSON.parse(onlineUsersJSON) : [];

        const newOnlineUsers = onlineUsers.filter((name) => name !== user.first_name + ' ' + user.last_name);

        await this.redisService.getClient().set('online_users', JSON.stringify(newOnlineUsers));
        return newOnlineUsers;
    }

    async getConversationsUsers() {
       const conversations_usersJSON = await this.redisService.getClient().get('conversations_users');
       return JSON.parse(conversations_usersJSON);
    }

    async setConversationsUsers(conversations_users) {
        return this.redisService.getClient().set('conversations_users', JSON.stringify(conversations_users));
    }
}
