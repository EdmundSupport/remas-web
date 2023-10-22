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
import { Role } from './role';
import { Permission } from './permission';

@Table({ schema: 'aaa',  tableName: 'role_permission', timestamps: false })
export class RolePermission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'role_permission_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'role_permission_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => Permission)
  @Column({ field: 'permission_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'role_permission_permission_uuid_idx',
    using: 'btree',
    unique: false,
  })
  permissionUuid?: string;

  @ForeignKey(() => Role)
  @Column({ field: 'role_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'role_permission_role_uuid_idx',
    using: 'btree',
    unique: false,
  })
  roleUuid?: string;

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

  @BelongsTo(() => Permission)
  permission?: Permission;
}
