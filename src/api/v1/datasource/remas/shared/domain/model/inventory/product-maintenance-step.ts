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
  HasMany,
} from 'sequelize-typescript';
import { Product } from './product';
import { ProductMaintenanceStepDetail } from './product-maintenance-step-detail';

@Table({ schema: 'inventory',  tableName: 'product_maintenance_step', timestamps: false })
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

  @Column({
    field: 'duration_ms',
    allowNull: true,
    type: DataType.DECIMAL(65, 4),
    defaultValue: Sequelize.literal('0.0000'),
  })
  durationMs?: string;

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

  @HasMany(() => ProductMaintenanceStepDetail, { sourceKey: 'uuid', as: 'pmsd' })
  productMaintenanceStepDetails?: ProductMaintenanceStepDetail[];
}
