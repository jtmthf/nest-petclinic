import { Column, OneToMany, Entity } from 'typeorm';
import { Person } from '../common/model/person.entity';
import { IsNotEmpty } from 'class-validator';
import { Digits } from '../common/validators/digits.validator';
import { Pet } from './pet.entity';

@Entity('owners')
export class Owner extends Person {
  @Column()
  @IsNotEmpty()
  address!: string;

  @Column()
  @IsNotEmpty()
  city!: string;

  @Column()
  @IsNotEmpty()
  @Digits({ fraction: 0, integer: 10 })
  telephone!: string;

  @OneToMany(() => Pet, pet => pet.owner)
  pets!: Pet[];

  // TODO pet utils
}
