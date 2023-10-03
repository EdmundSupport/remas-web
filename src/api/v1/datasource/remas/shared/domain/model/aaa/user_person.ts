import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';
import { Person } from './../identity/person';
import { User } from './user';

export interface UserPersonAttributes {
  uuid?: string;
  userUuid?: string;
  personUuid?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'user_person', timestamps: false })
export class UserPerson
  extends Model<UserPersonAttributes, UserPersonAttributes>
  implements UserPersonAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'user_person_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'user_person_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'user_person_user_uuid_idx', using: 'btree', unique: false })
  userUuid?: string;

  @ForeignKey(() => Person)
  @Column({ field: 'person_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'user_person_person_uuid_idx', using: 'btree', unique: false })
  personUuid?: string;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('true'),
  })
  condition?: boolean;

  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  updatedAt?: Date;
}
