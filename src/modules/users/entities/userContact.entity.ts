import { Transform } from 'class-transformer';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { date2TzStringDate } from 'src/utils/timestamps.formatter';
import { Contact } from '../../contacts/entities/contact.entity';
import { User } from './user.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class UserContact extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Contact)
  @Column
  contactId: number;

  @CreatedAt
  @Transform(date2TzStringDate)
  public createdAt: Date;

  @UpdatedAt
  @Transform(date2TzStringDate)
  public updatedAt: Date;

  @DeletedAt
  @Transform(date2TzStringDate)
  public deletedAt: Date;
}
