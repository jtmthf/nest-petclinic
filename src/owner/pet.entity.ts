import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { PetType } from './pet-type.entity';
import { Owner } from './owner.entity';
import { NamedEntity } from '../common/model/named.entity';
import { ValidateIf, IsNotEmpty, IsDefined } from 'class-validator';

@Entity('pets')
export class Pet extends NamedEntity {
  @IsNotEmpty()
  name!: string;

  @Column('date', { nullable: true })
  @IsDefined()
  birthDate?: Date;

  @ManyToOne(() => PetType, { nullable: true })
  @ValidateIf((p: Pet) => p.new)
  @IsDefined()
  type?: PetType;

  @ManyToOne(() => Owner, { nullable: true })
  owner?: Owner;

  // @OneToMany(() => Visit, visit => visit.pet)
  // visits!: Visit[];
}
