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
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { ProductPrice } from './product-price';
import { Product } from './product';

@Table({ schema: 'inventory',  tableName: 'price_category', timestamps: false })
export class PriceCategory extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'price_category_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'price_category_uuid_idx', using: 'btree', unique: false })
  @Index({
    name: 'product_price_price_category_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

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

  @BelongsToMany(() => Product, () => ProductPrice)
  products?: Product[];
}
