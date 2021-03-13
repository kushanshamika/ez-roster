import { EntityRepository, Repository } from 'typeorm';
import { Ward } from './ward.entity';
import { CreateWardDto } from './dto/create-ward.dto';

@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {
  async createWard(createWardDto: CreateWardDto): Promise<Ward> {
    const { name, no } = createWardDto;

    const ward = new Ward();
    ward.name = name;
    ward.no = no;
    await ward.save();

    return ward;
  }

  async getWards(): Promise<Ward[]> {
    const query = this.createQueryBuilder('ward').orderBy('ward.no', 'ASC');

    const wards = await query.getMany();
    return wards;
  }
}
