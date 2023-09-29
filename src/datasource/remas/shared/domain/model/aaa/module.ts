import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Role } from './role';
import { Permission } from './permission';
import { Privilege } from './privilege';

export interface ModuleAttributes {
  uuid?: string;
  keyName?: string;
  name?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'module', timestamps: false })
export class Module
  extends Model<ModuleAttributes, ModuleAttributes>
  implements ModuleAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'module_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'module_uuid_idx', using: 'btree', unique: false })
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

  @BelongsToMany(() => Role, () => Permission)
  roles?: Role[];

  @BelongsToMany(() => Privilege, () => Permission)
  privileges?: Privilege[];

  @HasMany(() => Permission, { sourceKey: 'uuid' })
  permissions?: Permission[];
}
