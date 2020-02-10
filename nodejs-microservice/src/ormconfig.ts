import {ConnectionOptions} from 'typeorm';

const config: ConnectionOptions = {
    type: 'mysql',
    host: String(process.env.NODEJS_DB_HOST) || 'mysql_microservice',
    username: String(process.env.NODEJS_DB_USER) || 'root',
    password: String(process.env.NODEJS_DB_PASSWORD) || 'admin',
    database: String(process.env.NODEJS_DB) || 'chatapp',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/**/*.entity{.ts,.js}'],
    synchronize: false,
    cli: {
        migrationsDir: 'src/migrations',
    }
};

export = config;