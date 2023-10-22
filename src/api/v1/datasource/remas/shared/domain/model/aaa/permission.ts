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
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Module } from './module';
import { Privilege } from './privilege';
import { Role } from './role';
import { RolePermission } from './role-permission';

@Table({ schema: 'aaa',  tableName: 'permission', timestamps: false })
export class Permission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'permission_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'permission_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ field: 'key_name', allowNull: true, type: DataType.STRING })
  keyName?: string;

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

  @BelongsTo(() => Module)
  module?: Module;

  @BelongsTo(() => Privilege)
  privilege?: Privilege;

  @BelongsToMany(() => Role, () => RolePermission)
  roles?: Role[];

  @HasMany(() => RolePermission, { sourceKey: 'uuid' })
  rolePermissions?: RolePermission[];
}
