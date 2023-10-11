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
import { MeasureUnit } from './measure_unit';
import { PriceCategory } from './price-category';

@Table({ tableName: 'product_price', timestamps: false })
export class ProductPrice extends Model {
  @ForeignKey(() => Product)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'product_price_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'product_price_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 2) })
  amount?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  productUuid?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  measureUnitUuid?: string;

  @ForeignKey(() => PriceCategory)
  @Column({
    field: 'price_category_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  priceCategoryUuid?: string;

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

  @BelongsTo(() => PriceCategory)
  priceCategory?: PriceCategory;
}
