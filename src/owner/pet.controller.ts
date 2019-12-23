import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { OwnerRepository } from './owner.repository';
import { Repository, FindManyOptions } from 'typeorm';
import { PetType } from './pet-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('owners/:ownerId')
export class PetController {
  constructor(
    private readonly pets: PetRepository,
    private readonly owners: OwnerRepository,
    @InjectRepository(PetType) private readonly petTypes: Repository<PetType>,
  ) {}

  @Get('pets/new')
  initCreationForm(@Param('ownerId', ParseIntPipe) ownerId: number) {
    return this.initModel(ownerId);
  }

  private async initModel(ownerId: number) {
    const [types, owner] = await Promise.all([
      this.petTypes.find({
        order: {
          name: 'ASC',
        },
      } as FindManyOptions<PetType>),
      this.owners.findOneOrFail(ownerId),
    ]);

    return {
      owner,
      types,
    };
  }
}
