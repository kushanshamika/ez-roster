import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(crateUserDto: CreateUserDto): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      phone,
      identification,
      role,
      username,
      password,
    } = crateUserDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.identification = identification;
    user.role = role;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await UserRepository.hashPassword(password, user.salt);

    try {
      await user.save();

      user.password = undefined;
      user.salt = undefined;

      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async changePassword(
    authUser: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { old_password, new_password } = changePasswordDto;

    if (await authUser.validatePassword(old_password)) {
      authUser.salt = await bcrypt.genSalt();
      authUser.password = await UserRepository.hashPassword(
        new_password,
        authUser.salt,
      );

      await authUser.save();
    } else {
      throw new ForbiddenException('incorrect old password');
    }
  }

  async resetPassword(
    id: number,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const user = await this.findOne({ id });
    const { password } = resetPasswordDto;

    if (!user) {
      throw new NotFoundException();
    }

    user.salt = await bcrypt.genSalt();
    user.password = await UserRepository.hashPassword(password, user.salt);

    await user.save();
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne({ id });
    const {
      firstName,
      lastName,
      email,
      phone,
      identification,
      role,
      avatar,
      fcmToken,
      ward,
      username,
    } = updateUserDto;

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.identification = identification;
    user.role = role;
    user.avatar = avatar;
    user.fcmToken = fcmToken;
    user.ward = ward;
    user.username = username;

    try {
      await user.save();

      user.password = undefined;
      user.salt = undefined;

      return user;
    } catch (e) {
      if (e.errorCode === '23505') {
        throw new ConflictException(e.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
