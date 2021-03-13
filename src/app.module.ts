import { Module } from '@nestjs/common';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WardModule } from './ward/ward.module';

@Module({
  imports: [TypeOrmCoreModule.forRoot(typeOrmConfig), AuthModule, WardModule],
})
export class AppModule {}
