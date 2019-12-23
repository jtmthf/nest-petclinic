import { Column } from 'typeorm';
import { NamedEntity } from './named.entity';

export abstract class Person extends NamedEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
}
