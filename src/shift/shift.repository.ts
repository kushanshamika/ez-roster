import { EntityRepository, Repository } from 'typeorm';
import { Shift } from './shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';

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
}
