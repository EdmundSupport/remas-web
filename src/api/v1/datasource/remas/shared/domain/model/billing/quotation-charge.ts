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
  
  @Table({ schema: 'billing', tableName: 'quotation_charge', timestamps: false })
  export class QuotationCharge extends Model {
	@Column({
	  primaryKey: true,
	  type: DataType.UUID,
	  defaultValue: Sequelize.literal('gen_random_uuid()'),
	})
	@Index({ name: 'quotation_charge_uuid_pk', using: 'btree', unique: true })
	@Index({ name: 'quotation_charge_uuid_idx', using: 'btree', unique: false })
	uuid?: string;
  
	@ForeignKey(() => Quotation)
	@Column({ field: 'quotation_uuid', allowNull: true, type: DataType.UUID })
	@Index({
	  name: 'quotation_charge_quotation_uuid_idx',
	  using: 'btree',
	  unique: false,
	})
	quotationUuid?: string;
  
	@Column({ field: 'charge_uuid', allowNull: true, type: DataType.UUID })
	@Index({
	  name: 'quotation_charge_charge_uuid_idx',
	  using: 'btree',
	  unique: false,
	})
	chargeUuid?: string;
  
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
  }
  