import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Measure } from './measure';
import { ProductType } from './product_type';
import { ProductPrice } from './product_price';
import { PriceCategory } from './price-category';

@Table({ tableName: 'product', timestamps: false })
export class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'product_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'product_uuid_idx', using: 'btree', unique: false })
  @Index({
    name: 'product_price_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  sku?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'parent_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'product_parent_uuid_idx', using: 'btree', unique: false })
  parentUuid?: string;

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

  @HasMany(() => Product, { sourceKey: 'uuid' })
  products?: Product[];

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => Measure)
  measure?: Measure;

  @BelongsTo(() => ProductType)
  productType?: ProductType;

  @HasMany(() => ProductPrice, { sourceKey: 'uuid' })
  productPrices?: ProductPrice[];

  @BelongsToMany(() => PriceCategory, () => ProductPrice)
  priceCategories?: PriceCategory[];
}
