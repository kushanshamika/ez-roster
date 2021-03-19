import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftRepository } from './shift.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftRepository]), AuthModule],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
