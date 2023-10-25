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
import { Product } from './product';
import { MeasureUnit } from './measure-unit';
import { ProductMaintenanceStep } from './product-maintenance-step';

@Table({ schema: 'inventory',  tableName: 'product_maintenance_step_detail', timestamps: false })
export class ProductMaintenanceStepDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({
    name: 'product_maintenance_step_detail_uuid_pk',
    using: 'btree',
    unique: true,
  })
  @Index({
    name: 'product_maintenance_step_detail_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 10) })
  amount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 2) })
  price?: string;

  @ForeignKey(() => ProductMaintenanceStep)
  @Column({
    field: 'product_maintenance_step_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'product_maintenance_step_detail_product_maintenance_step_uuid_i',
    using: 'btree',
    unique: false,
  })
  productMaintenanceStepUuid?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_maintenance_step_detail_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productUuid?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_maintenance_step_detail_measure_unit_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUnitUuid?: string;

  @Column({
    field: 'inventory_movement_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  inventoryMovementUuid?: string;

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

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;

  @BelongsTo(() => ProductMaintenanceStep)
  productMaintenanceStep?: ProductMaintenanceStep;
}
