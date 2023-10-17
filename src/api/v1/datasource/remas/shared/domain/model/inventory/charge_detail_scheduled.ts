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
import { Charge } from './charge';
import { Product } from './product';
import { MeasureUnit } from './measure_unit';
import { ChargeDetail } from './charge_detail';

@Table({ tableName: 'charge_detail_scheduled', timestamps: false })
export class ChargeDetailScheduled extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({
    name: 'charge_detail_scheduled_uuid_pk',
    using: 'btree',
    unique: true,
  })
  @Index({
    name: 'charge_detail_scheduled_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @ForeignKey(() => Charge)
  @Column({ field: 'charge_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'charge_detail_scheduled_charge_uuid_idx',
    using: 'btree',
    unique: false,
  })
  chargeUuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  amount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  price?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'charge_detail_scheduled_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productUuid?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'charge_detail_scheduled_measure_unit_uuid_idx',
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

  @BelongsTo(() => Charge)
  charge?: Charge;

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;

  @HasMany(() => ChargeDetail, { sourceKey: 'uuid' })
  chargeDetails?: ChargeDetail[];
}
