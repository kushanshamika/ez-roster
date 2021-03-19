import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './shift.entity';

@Controller('shift')
@UseGuards(AuthGuard())
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createShift(@Body() createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftService.createShift(createShiftDto);
  }
}
