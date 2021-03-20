import { EntityRepository, Repository } from 'typeorm';
import { Shift } from './shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';
import { GetShiftFilterDto } from './dto/get-shift-filter.dto';

@EntityRepository(Shift)
export class ShiftRepository extends Repository<Shift> {
  async createShift(createShiftDto: CreateShiftDto): Promise<Shift> {
    const { name, type } = createShiftDto;

    const shift = new Shift();
    shift.name = name;
    shift.type = type;
    await shift.save();

    return shift;
  }

  async getWards(filterDto: GetShiftFilterDto): Promise<Shift[]> {
    const { type } = filterDto;
    const query = this.createQueryBuilder('shift');

    if (type) {
      query.andWhere('shift.type =  :type', { type });
    }

    return await query.getMany();
  }
}
