import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user';
import { Privilege } from './privilege';
import { Permission } from './permission';
import { Module } from './module';

export interface RoleAttributes {
  uuid?: string;
  keyName?: string;
  name?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'role', timestamps: false })
export class Role
  extends Model<RoleAttributes, RoleAttributes>
  implements RoleAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'role_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'role_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ field: 'key_name', allowNull: true, type: DataType.STRING })
  keyName?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

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

  @HasMany(() => User, { sourceKey: 'uuid' })
  users?: User[];

  @BelongsToMany(() => Privilege, () => Permission)
  privileges?: Privilege[];

  @BelongsToMany(() => Module, () => Permission)
  modules?: Module[];

  @HasMany(() => Permission, { sourceKey: 'uuid' })
  permissions?: Permission[];
}
