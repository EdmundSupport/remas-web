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
import { PriceCategory } from './price-category';

@Table({ schema: 'inventory',  tableName: 'product_package', timestamps: false })
export class ProductPackage extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'product_package_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'product_package_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 4) })
  amount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 2) })
  price?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description?: string;

  @ForeignKey(() => PriceCategory)
  @Column({
    field: 'price_category_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'product_package_price_category_uuid_idx',
    using: 'btree',
    unique: false,
  })
  priceCategoryUuid?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_package_measure_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUnitUuid?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'parent_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_package_parent_uuid_idx',
    using: 'btree',
    unique: false,
  })
  parentUuid?: string;

  @ForeignKey(() => Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'product_package_product_uuid_idx',
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

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;

  @BelongsTo(() => PriceCategory)
  priceCategory?: PriceCategory;
}
