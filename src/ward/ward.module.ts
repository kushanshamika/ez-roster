import { Module } from '@nestjs/common';
import { WardController } from './ward.controller';
import { WardService } from './ward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardRepository } from './ward.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([WardRepository]), AuthModule],
  controllers: [WardController],
  providers: [WardService],
})
export class WardModule {}
