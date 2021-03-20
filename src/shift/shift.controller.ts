import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './shift.entity';
import { GetShiftFilterDto } from './dto/get-shift-filter.dto';

@Controller('shift')
@UseGuards(AuthGuard())
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createShift(@Body() createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftService.createShift(createShiftDto);
  }

  @Get('/all')
  getShifts(
    @Query(ValidationPipe) filterDto: GetShiftFilterDto,
  ): Promise<Shift[]> {
    return this.shiftService.getShifts(filterDto);
  }
}
