import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerRepository } from './owner.repository';
import { PetRepository } from './pet.repository';
import { PetType } from './pet-type.entity';
import { PetController } from './pet.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OwnerRepository, PetRepository, PetType]),
  ],
  controllers: [OwnerController, PetController],
})
export class OwnerModule {}
