import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShiftRepository } from './shift.repository';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './shift.entity';
import { GetShiftFilterDto } from './dto/get-shift-filter.dto';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(ShiftRepository) private shiftRepository: ShiftRepository,
  ) {}

  async createShift(createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftRepository.createShift(createShiftDto);
  }

  async getShifts(filterDto: GetShiftFilterDto): Promise<Shift[]> {
    return this.shiftRepository.getWards(filterDto);
  }
}
