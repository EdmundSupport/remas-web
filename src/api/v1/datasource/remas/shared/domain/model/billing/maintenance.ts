import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../aaa/user';
import { MaintenanceStatus } from './maintenance_status';
import { MaintenanceStep } from './maintenance_step';
import { Product } from '../inventory/product';

@Table({schema: 'billing', tableName: 'maintenance', timestamps: false })
export class Maintenance extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'maintenance_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'maintenance_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  number?: string;

  @Column({
    field: 'date_start_scheduled',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  dateStartScheduled?: Date;

  @Column({
    field: 'date_end_scheduled',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  dateEndScheduled?: Date;

  @Column({ field: 'date_start', allowNull: true, type: DataType.DATE })
  dateStart?: Date;

  @Column({ field: 'date_end', allowNull: true, type: DataType.DATE })
  dateEnd?: Date;

  @ForeignKey(() => User)
  @Column({ field: 'user_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'maintenance_user_uuid_idx', using: 'btree', unique: false })
  userUuid?: string;

  @ForeignKey(() => MaintenanceStatus)
  @Column({
    field: 'maintenance_status_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'maintenance_maintenance_status_uuid_idx',
    using: 'btree',
    unique: false,
  })
  maintenanceStatusUuid?: string;

  @ForeignKey(()=>Product)
  @Index({
    name: 'maintenance_maintenance_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  productUuid?: string;

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

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => MaintenanceStatus)
  maintenanceStatus?: MaintenanceStatus;

  @HasMany(() => MaintenanceStep, { sourceKey: 'uuid' })
  maintenanceSteps?: MaintenanceStep[];
}
