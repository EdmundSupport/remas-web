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
import { Discharge } from './discharge';
import { Product } from './product';
import { MeasureUnit } from './measure_unit';
import { DischargeDetail } from './discharge_detail';

@Table({ schema: 'inventory', tableName: 'discharge_detail_scheduled', timestamps: false })
export class DischargeDetailScheduled extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({
    name: 'discharge_detail_scheduled_uuid_pk',
    using: 'btree',
    unique: true,
  })
  @Index({
    name: 'discharge_detail_scheduled_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @ForeignKey(() => Discharge)
  @Column({ field: 'discharge_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'discharge_detail_scheduled_discharge_uuid_idx',
    using: 'btree',
    unique: false,
  })
  dischargeUuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  amount?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'discharge_detail_scheduled_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productUuid?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'discharge_detail_scheduled_measure_unit_uuid_idx',
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

  @BelongsTo(() => Discharge)
  discharge?: Discharge;

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;

  @HasMany(() => DischargeDetail, { sourceKey: 'uuid' })
  dischargeDetails?: DischargeDetail[];
}
