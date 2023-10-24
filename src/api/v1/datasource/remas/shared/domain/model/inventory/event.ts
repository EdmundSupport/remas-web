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
import { WarehouseEvent } from './warehouse-event';

@Table({ schema: 'inventory',  tableName: 'event', timestamps: false })
export class Event extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'event_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'event_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({
    field: 'date_start',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  dateStart?: Date;

  @Column({
    field: 'date_end',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  dateEnd?: Date;

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

  @BelongsToMany(() => Warehouse, () => WarehouseEvent)
  warehouses?: Warehouse[];

  @HasMany(() => WarehouseEvent, { sourceKey: 'uuid' })
  warehouseEvents?: WarehouseEvent[];
}
