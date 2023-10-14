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
import { Measure } from './measure';
import { ProductPrice } from './product_price';
import { ProductMaintenanceStepDetail } from './product_maintenance_step_detail';

@Table({ tableName: 'measure_unit', timestamps: false })
export class MeasureUnit extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'measure_unit_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'measure_unit_uuid_idx', using: 'btree', unique: false })
  @Index({
    name: 'product_price_measure_unit_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @Column({ field: 'key_name', allowNull: true, type: DataType.STRING })
  keyName?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @Column({
    field: 'factor_conversion',
    allowNull: true,
    type: DataType.DECIMAL(65, 10),
  })
  factorConversion?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'parent_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'measure_unit_parent_uuid_idx',
    using: 'btree',
    unique: false,
  })
  parentUuid?: string;

  @ForeignKey(() => Measure)
  @Column({ field: 'measure_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'measure_unit_measure_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUuid?: string;

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

  @HasMany(() => MeasureUnit, { sourceKey: 'uuid' })
  measureUnits?: MeasureUnit[];

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;

  @HasMany(() => ProductPrice, { sourceKey: 'uuid' })
  productPrices?: ProductPrice[];

  @HasMany(() => ProductMaintenanceStepDetail, { sourceKey: 'uuid' })
  productMaintenanceStepDetails?: ProductMaintenanceStepDetail[];
}
