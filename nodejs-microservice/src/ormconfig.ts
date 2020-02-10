import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'mysql',
    host: String(process.env.NODEJS_DB_HOST) || 'mysql_microservice',
    username: String(process.env.NODEJS_DB_USER) || 'root',
    password: String(process.env.NODEJS_DB_PASSWORD) || 'admin',
    database: String(process.env.NODEJS_DB) || 'chatapp',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    cli: {
        migrationsDir: 'src/migrations',
    }
};

export = config;