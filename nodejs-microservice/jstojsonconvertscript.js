const fs = require('fs');

const ormconfig = {
  type: 'mysql',
  host: process.env.NODEJS_DB_HOST || 'mysql_microservicee',
  port: 3306,
  username: process.env.NODEJS_DB_USER || 'root',
  password: process.env.NODEJS_DB_PASSWORD || 'admin',
  database: process.env.NODEJS_DB || 'chatapp',
  synchronize: false,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

const ormconfigJson = JSON.stringify(ormconfig);
fs.writeFile('ormconfig.json', ormconfigJson, 'utf8', (err) => {
    if(err) throw err;

    console.log("The ormconfig.json file was saved");
});