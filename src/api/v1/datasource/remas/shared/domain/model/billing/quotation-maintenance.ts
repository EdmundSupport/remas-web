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
import { Maintenance } from './maintenance';
import { Quotation } from './quotation';

@Table({ schema: 'billing',  tableName: 'quotation_maintenance', timestamps: false })
export class QuotationMaintenance extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({
    name: 'quotation_maintenance_uuid_pk',
    using: 'btree',
    unique: true,
  })
  @Index({
    name: 'quotation_maintenance_uuid_idx',
    using: 'btree',
    unique: false,
  })
  uuid?: string;

  @ForeignKey(() => Quotation)
  @Column({ field: 'quotation_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'quotation_maintenance_quotation_uuid_idx',
    using: 'btree',
    unique: false,
  })
  quotationUuid?: string;

  @ForeignKey(() => Maintenance)
  @Column({ field: 'maintenance_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'quotation_maintenance_maintenance_uuid_idx',
    using: 'btree',
    unique: false,
  })
  maintenanceUuid?: string;

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

  @BelongsTo(() => Maintenance)
  maintenance?: Maintenance;

  @BelongsTo(() => Quotation)
  quotation?: Quotation;
}
