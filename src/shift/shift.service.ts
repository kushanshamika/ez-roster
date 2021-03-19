import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShiftRepository } from './shift.repository';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './shift.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(ShiftRepository) private shiftRepository: ShiftRepository,
  ) {}

  async createShift(createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftRepository.createShift(createShiftDto);
  }
}
