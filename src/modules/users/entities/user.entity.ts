import { Transform } from 'class-transformer';
import {
  BeforeCreate,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { Contact } from '../../contacts/entities/contact.entity';
import { date2TzStringDate } from '../../../utils/timestamps.formatter';
import { UserContact } from './userContact.entity';
import { InternalServerErrorException } from '@nestjs/common';

@Table({
  paranoid: true,
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Contact, () => UserContact)
  contacts: Contact[];

  @CreatedAt
  @Transform(date2TzStringDate)
  public createdAt: Date;

  @UpdatedAt
  @Transform(date2TzStringDate)
  public updatedAt: Date;

  @DeletedAt
  @Transform(date2TzStringDate)
  public deletedAt: Date;

  @BeforeCreate
  static beforeCreateUser(instance: User) {
    try {
      const salt = bcrypt.genSaltSync(10);
      instance.password = bcrypt.hashSync(instance.password, salt);
    } catch (error) {
      throw new InternalServerErrorException(
        'failed to encript user password, please try again later!',
      );
    }
  }

  toJSON(): any {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      contacts: this.contacts,
    };
  }
}
