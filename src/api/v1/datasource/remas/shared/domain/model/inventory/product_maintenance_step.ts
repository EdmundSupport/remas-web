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
import { Product } from './product';
import { ProductMaintenanceStepDetail } from './product_maintenance_step_detail';

@Table({ tableName: 'product_maintenance_step', timestamps: false })
export class ProductMaintenanceStep extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({
    name: 'product_maintenance_step_uuid_pk',
    using: 'btree',
    unique: true,
  })
  @Index({
    name: 'product_maintenance_step_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  order?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_maintenance_step_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
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

  @HasMany(() => ProductMaintenanceStepDetail, { sourceKey: 'uuid' })
  productMaintenanceStepDetails?: ProductMaintenanceStepDetail[];
}
