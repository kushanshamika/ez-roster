import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.updateUser(id, user);
  }
}
