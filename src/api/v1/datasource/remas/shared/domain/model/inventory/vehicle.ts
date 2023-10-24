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
import { Warehouse } from './warehouse';
import { WarehouseVehicle } from './warehouse-vehicle';

@Table({ schema: 'inventory',  tableName: 'vehicle', timestamps: false })
export class Vehicle extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'vehicle_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'vehicle_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  plate?: string;

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

  @BelongsToMany(() => Warehouse, () => WarehouseVehicle)
  warehouses?: Warehouse[];

  @HasMany(() => WarehouseVehicle, { sourceKey: 'uuid' })
  warehouseVehicles?: WarehouseVehicle[];
}
