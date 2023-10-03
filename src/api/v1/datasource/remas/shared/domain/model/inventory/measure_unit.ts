import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { ProductPrice } from './product_price';

export interface MeasureUnitAttributes {
  uuid?: string;
  keyName?: string;
  name?: string;
  factorConversion?: string;
  parentUuid?: string;
  measureUuid?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'measure_unit', timestamps: false })
export class MeasureUnit
  extends Model<MeasureUnitAttributes, MeasureUnitAttributes>
  implements MeasureUnitAttributes
{
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

  @Column({ field: 'parent_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'measure_unit_parent_uuid_idx',
    using: 'btree',
    unique: false,
  })
  parentUuid?: string;

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

  @HasMany(() => ProductPrice, { sourceKey: 'uuid' })
  productPrices?: ProductPrice[];
}
