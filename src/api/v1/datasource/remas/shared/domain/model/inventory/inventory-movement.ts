import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { QuotationDetail } from './../billing/quotation_detail';

@Table({ tableName: 'inventory_movement', timestamps: false })
export class InventoryMovement extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'inventory_movement_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'inventory_movement_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  amount?: string;

  @Column({ field: 'product_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'inventory_movement_product_uuid_idx',
    using: 'btree',
    unique: false,
  })
  productUuid?: string;

  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'inventory_movement_measure_unit_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUnitUuid?: string;

  @Column({ field: 'reference_schema', allowNull: true, type: DataType.STRING })
  @Index({
    name: 'inventory_movement_reference_schema_idx',
    using: 'btree',
    unique: false,
  })
  referenceSchema?: string;

  @Column({ field: 'reference_table', allowNull: true, type: DataType.STRING })
  @Index({
    name: 'inventory_movement_reference_table_idx',
    using: 'btree',
    unique: false,
  })
  referenceTable?: string;

  @Column({ field: 'reference_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'inventory_movement_reference_uuid_idx',
    using: 'btree',
    unique: false,
  })
  referenceUuid?: string;

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

  @HasOne(() => QuotationDetail, { sourceKey: 'uuid' })
  quotationDetail?: QuotationDetail;
}
