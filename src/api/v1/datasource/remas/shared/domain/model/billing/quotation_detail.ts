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
import { Quotation } from './quotation';
import { Product } from '../inventory';
import { InventoryMovement } from '../inventory/inventory-movement';

@Table({schema: 'billing', tableName: 'quotation_detail', timestamps: false })
export class QuotationDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'quotation_detail_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'quotation_detail_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 10) })
  amount?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65, 2) })
  price?: string;

  @ForeignKey(() => Quotation)
  @Column({ field: 'quotation_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'quotation_detail_quotation_uuid_idx',
    using: 'btree',
    unique: false,
  })
  quotationUuid?: string;

  @ForeignKey(()=>Product)
  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'quotation_detail_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productUuid?: string;

  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'quotation_detail_measure_unit_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUnitUuid?: string;

  @Column({
    field: 'price_category_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'quotation_detail_price_category_uuid_idx',
    using: 'btree',
    unique: false,
  })
  priceCategoryUuid?: string;

  @ForeignKey(() => InventoryMovement)
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

  @BelongsTo(() => Quotation)
  quotation?: Quotation;

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => InventoryMovement)
  inventoryMovement?: InventoryMovement;
}
