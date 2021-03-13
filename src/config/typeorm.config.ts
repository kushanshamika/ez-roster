import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'ezroster',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
