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
  HasOne,
} from 'sequelize-typescript';
import { Client } from './client';
import { QuotationStatus } from './quotation_status';
import { QuotationDetail } from './quotation_detail';
import { QuotationMaintenance } from './quotation-maintenance';
import { QuotationCharge } from './quotation-charge';

@Table({ tableName: 'quotation', timestamps: false })
export class Quotation extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'quotation_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'quotation_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  number?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  date?: Date;

  @ForeignKey(() => Client)
  @Column({ field: 'client_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'quotation_client_uuid_idx', using: 'btree', unique: false })
  clientUuid?: string;

  @ForeignKey(() => QuotationStatus)
  @Column({
    field: 'quotation_status_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'quotation_quotation_status_uuid_idx',
    using: 'btree',
    unique: false,
  })
  quotationStatusUuid?: string;

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

  @BelongsTo(() => Client)
  client?: Client;

  @BelongsTo(() => QuotationStatus)
  quotationStatus?: QuotationStatus;

  @HasMany(() => QuotationDetail, { sourceKey: 'uuid' })
  quotationDetails?: QuotationDetail[];

  @HasOne(() => QuotationMaintenance, { sourceKey: 'uuid' })
  quotationMaintenance?: QuotationMaintenance;

  @HasOne(() => QuotationCharge, { sourceKey: 'uuid' })
  quotationCharge?: QuotationCharge;
}
