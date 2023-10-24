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
import { Warehouse } from './warehouse';
import { Vehicle } from './vehicle';

@Table({ schema: 'inventory',  tableName: 'warehouse_vehicle', timestamps: false })
export class WarehouseVehicle extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'warehouse_vehicle_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'warehouse_vehicle_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => Vehicle)
  @Column({ field: 'vehicle_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'warehouse_vehicle_vehicle_uuid_idx',
    using: 'btree',
    unique: false,
  })
  vehicleUuid?: string;

  @ForeignKey(() => Warehouse)
  @Column({ field: 'warehouse_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'warehouse_vehicle_warehouse_uuid_idx',
    using: 'btree',
    unique: false,
  })
  warehouseUuid?: string;

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

  @BelongsTo(() => Warehouse)
  warehouse?: Warehouse;

  @BelongsTo(() => Vehicle)
  vehicle?: Vehicle;
}
