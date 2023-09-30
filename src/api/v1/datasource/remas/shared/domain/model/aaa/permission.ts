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
import { Role } from './role';
import { Privilege } from './privilege';
import { Module } from './module';

export interface PermissionAttributes {
  uuid?: string;
  roleUuid?: string;
  moduleUuid?: string;
  privilegeUuid?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'permission', timestamps: false })
export class Permission
  extends Model<PermissionAttributes, PermissionAttributes>
  implements PermissionAttributes
{
  @ForeignKey(() => Module)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'permission_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'permission_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => Role)
  @Column({ field: 'role_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'permission_role_uuid_idx', using: 'btree', unique: false })
  roleUuid?: string;

  @ForeignKey(() => Module)
  @Column({ field: 'module_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'permission_module_uuid_idx', using: 'btree', unique: false })
  moduleUuid?: string;

  @ForeignKey(() => Privilege)
  @Column({ field: 'privilege_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'permission_privilege_uuid_idx',
    using: 'btree',
    unique: false,
  })
  privilegeUuid?: string;

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

  @BelongsTo(() => Role)
  role?: Role;

  @BelongsTo(() => Privilege)
  privilege?: Privilege;

  @BelongsTo(() => Module)
  module?: Module;
}
