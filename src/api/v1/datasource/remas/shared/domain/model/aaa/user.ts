import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Session } from './session';
import { Role } from './role';
import { UserPerson } from './user_person';
import { Person } from '../identity';

@Table({ tableName: 'user', timestamps: false })
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'user_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'user_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  @Index({ name: 'user_un', using: 'btree', unique: true })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  password?: string;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('true'),
  })
  condition?: boolean;

  @ForeignKey(() => Role)
  @Column({ field: 'role_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'user_role_uuid_idx', using: 'btree', unique: false })
  roleUuid?: string;

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

  @HasMany(() => Session, { sourceKey: 'uuid' })
  sessions?: Session[];

  @BelongsTo(() => Role)
  role?: Role;

  @BelongsToMany(() => Person, () => UserPerson)
  persons?: Person[];

  @HasMany(() => UserPerson, { sourceKey: 'uuid' })
  userPersons?: UserPerson[];
}
