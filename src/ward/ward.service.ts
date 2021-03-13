import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WardRepository } from './ward.repository';
import { CreateWardDto } from './dto/create-ward.dto';
import { Ward } from './ward.entity';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(WardRepository)
    private wardRepository: WardRepository,
  ) {}

  async getWards(): Promise<Ward[]> {
    return this.wardRepository.getWards();
  }

  async createWard(createWardDto: CreateWardDto): Promise<Ward> {
    return this.wardRepository.createWard(createWardDto);
  }

  async deleteWardById(id: number): Promise<void> {
    const result = await this.wardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
