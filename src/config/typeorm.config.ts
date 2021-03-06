import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'baseapp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export { typeOrmConfig };
