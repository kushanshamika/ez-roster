import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WardService } from './ward.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { Ward } from './ward.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('ward')
@UseGuards(AuthGuard())
export class WardController {
  constructor(private wardService: WardService) {}

  @Get('/all')
  getWards(): Promise<Ward[]> {
    return this.wardService.getWards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createWard(@Body() createWardDto: CreateWardDto): Promise<Ward> {
    return this.wardService.createWard(createWardDto);
  }

  @Delete('/:id')
  deleteWardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.wardService.deleteWardById(id);
  }
}
