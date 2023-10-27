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
  HasOne,
} from 'sequelize-typescript';
import { Measure } from './measure';
import { ProductType } from './product-type';
import { ProductPrice } from './product-price';
import { ProductMaintenanceStep } from './product-maintenance-step';
import { ProductMaintenanceStepDetail } from './product-maintenance-step-detail';
import { ChargeDetailScheduled } from './charge-detail-scheduled';
import { DischargeDetailScheduled } from './discharge-detail-scheduled';
import { ProductPackage } from './product-package';

@Table({ schema: 'inventory',  tableName: 'product', timestamps: false })
export class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'product_uuid_pk', using: 'btree', unique: true })
  @Index({
    name: 'maintenance_step_detail_uuid_idx',
    using: 'btree',
    unique: false,
  })
  @Index({ name: 'maintenance_step_uuid_idx', using: 'btree', unique: false })
  @Index({
    name: 'product_price_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  @Index({ name: 'product_uuid_idx', using: 'btree', unique: false })
  @Index({ name: 'step_detail_uuid_idx', using: 'btree', unique: false })
  @Index({ name: 'step_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  sku?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description?: string;

  @Column({
    field: 'price_cost',
    allowNull: true,
    type: DataType.DECIMAL(65, 2),
  })
  priceCost?: string;

  @ForeignKey(() => Measure)
  @Column({ field: 'measure_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'product_measure_uuid_idx', using: 'btree', unique: false })
  measureUuid?: string;

  @ForeignKey(() => ProductType)
  @Column({ field: 'product_type_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_product_type_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productTypeUuid?: string;

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

  @BelongsTo(() => Measure)
  measure?: Measure;

  @BelongsTo(() => ProductType)
  productType?: ProductType;

  @HasMany(() => ProductPrice, { sourceKey: 'uuid' })
  productPrices?: ProductPrice[];

  @HasMany(() => ProductMaintenanceStep, { sourceKey: 'uuid' })
  productMaintenanceSteps?: ProductMaintenanceStep[];

  @HasMany(() => ProductMaintenanceStepDetail, { sourceKey: 'uuid' })
  productMaintenanceStepDetails?: ProductMaintenanceStepDetail[];

  @HasMany(() => ChargeDetailScheduled, { sourceKey: 'uuid' })
  chargeDetailScheduleds?: ChargeDetailScheduled[];

  @HasMany(() => DischargeDetailScheduled, { sourceKey: 'uuid' })
  dischargeDetailScheduleds?: DischargeDetailScheduled[];

  @HasOne(() => ProductPackage, { sourceKey: 'uuid', as: 'productPackage' })
  productPackage?: ProductPackage;

  @HasMany(() => ProductPackage, { sourceKey: 'uuid', as: 'productPackages' })
  productPackages?: ProductPackage[];
}
