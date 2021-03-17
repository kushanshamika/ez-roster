import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, user);
  }
}
