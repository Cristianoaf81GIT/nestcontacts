import { Exclude, Transform } from 'class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { date2TzStringDate } from '../../../utils/timestamps.formatter';

@Table({
  paranoid: true,
  timestamps: true,
})
export class Contact extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

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
