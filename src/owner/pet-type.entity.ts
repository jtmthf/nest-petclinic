import { Entity } from 'typeorm';
import { NamedEntity } from '../common/model/named.entity';

@Entity('types')
export class PetType extends NamedEntity {}
