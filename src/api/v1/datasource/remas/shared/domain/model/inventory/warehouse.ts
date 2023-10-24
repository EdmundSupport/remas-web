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
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Vehicle } from './vehicle';
import { WarehouseVehicle } from './warehouse-vehicle';
import { Event } from './event';
import { WarehouseEvent } from './warehouse-event';
import { Address } from './../contact/address';
import { WarehouseAddress } from './warehouse-address';

@Table({ schema: 'inventory',  tableName: 'warehouse', timestamps: false })
export class Warehouse extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'warehouse_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'warehouse_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @Column({ field: 'address_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'warehouse_address_uuid_idx', using: 'btree', unique: false })
  addressUuid?: string;

  @Column({
    field: 'warehouse_type_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'warehouse_warehouse_type_uuid_idx',
    using: 'btree',
    unique: false,
  })
  warehouseTypeUuid?: string;

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

  @BelongsToMany(() => Vehicle, () => WarehouseVehicle)
  vehicles?: Vehicle[];

  @BelongsToMany(() => Event, () => WarehouseEvent)
  events?: Event[];

  @BelongsToMany(() => Address, () => WarehouseAddress)
  addresses?: Address[];

  @HasMany(() => WarehouseVehicle, { sourceKey: 'uuid' })
  warehouseVehicles?: WarehouseVehicle[];

  @HasMany(() => WarehouseEvent, { sourceKey: 'uuid' })
  warehouseEvents?: WarehouseEvent[];

  @HasMany(() => WarehouseAddress, { sourceKey: 'uuid' })
  warehouseAddresses?: WarehouseAddress[];
}
