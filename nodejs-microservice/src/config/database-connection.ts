export const connection: object = {
    type: 'mysql',
    host: String(process.env.NODEJS_DB_HOST) || 'localhost',
    username: String(process.env.NODEJS_DB_USER) || 'root',
    password: String(process.env.NODEJS_DB_PASSWORD) || 'admin',
    database: String(process.env.NODEJS_DB) || 'chatapp',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
}