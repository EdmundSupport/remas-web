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
import { City } from './city';

@Table({ schema: 'contact',  tableName: 'address', timestamps: false })
export class Address extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'address_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'address_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  @Index({ name: 'address_description_idx', using: 'btree', unique: false })
  description?: string;

  @ForeignKey(() => City)
  @Column({ field: 'city_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'address_city_uuid_idx', using: 'btree', unique: false })
  cityUuid?: string;

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

  @BelongsTo(() => City)
  city?: City;
}
