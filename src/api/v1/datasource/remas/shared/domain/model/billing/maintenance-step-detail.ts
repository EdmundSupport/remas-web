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
import { Product } from './../inventory/product';
import { MaintenanceStep } from './maintenance-step';
import { MeasureUnit } from './../inventory/measure-unit';

@Table({ schema: 'billing',  tableName: 'maintenance_step_detail', timestamps: false })
export class MaintenanceStepDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({
    name: 'maintenance_step_detail_uuid_pk',
    using: 'btree',
    unique: true,
  })
  @Index({
    name: 'maintenance_step_detail_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 10) })
  amount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 2) })
  price?: string;

  @ForeignKey(() => MaintenanceStep)
  @Column({
    field: 'maintenance_step_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'maintenance_step_detail_maintenance_step_uuid_idx',
    using: 'btree',
    unique: false,
  })
  maintenanceStepUuid?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'maintenance_step_detail_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productUuid?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'maintenance_step_detail_measure_unit_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUnitUuid?: string;

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

  @BelongsTo(() => MaintenanceStep)
  maintenanceStep?: MaintenanceStep;

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;
}
