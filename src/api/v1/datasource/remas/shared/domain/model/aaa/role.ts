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
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user';
import { Permission } from './permission';
import { RolePermission } from './role-permission';

@Table({ schema: 'aaa',  tableName: 'role', timestamps: false })
export class Role extends Model {
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

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions?: Permission[];

  @HasMany(() => RolePermission, { sourceKey: 'uuid' })
  rolePermissions?: RolePermission[];
}
