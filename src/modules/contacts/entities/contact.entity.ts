import { Transform } from 'class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { date2TzStringDate } from '../../../utils/timestamps.formatter';
import { UserContact } from '../../users/entities/userContact.entity';

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

  @BelongsToMany(() => User, () => UserContact)
  user: User;

  @CreatedAt
  @Transform(date2TzStringDate)
  public createdAt: Date;

  @UpdatedAt
  @Transform(date2TzStringDate)
  public updatedAt: Date;

  @DeletedAt
  @Transform(date2TzStringDate)
  public deletedAt: Date;

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
