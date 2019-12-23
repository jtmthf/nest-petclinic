import { Repository, EntityRepository } from 'typeorm';
import { Owner } from './owner.entity';

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {}
