/**
* Documento generado automaticamente por Edmundo Guerrero, no modificar
*/
import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user';
import { Person } from './../identity/person';

@Table({ schema: 'aaa',  tableName: 'user_person', timestamps: false })
export class UserPerson extends Model {
  @ForeignKey(() => Person)
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

  @BelongsTo(() => User)
  user?: User;
}
