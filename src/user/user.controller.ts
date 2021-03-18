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
import { GetUser } from '../auth/get-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

  @Patch('/change-password')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  changePassword(
    @GetUser() authUser: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.userService.changePassword(authUser, changePasswordDto);
  }

  @Patch('/reset-password/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return this.userService.resetPassword(id, resetPasswordDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }
}
