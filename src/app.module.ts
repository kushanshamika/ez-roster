import { Module } from '@nestjs/common';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WardModule } from './ward/ward.module';
import { UserModule } from './user/user.module';
import { ShiftModule } from './shift/shift.module';

@Module({
  imports: [
    TypeOrmCoreModule.forRoot(typeOrmConfig),
    AuthModule,
    WardModule,
    UserModule,
    ShiftModule,
  ],
})
export class AppModule {}
