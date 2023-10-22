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
  HasMany,
} from 'sequelize-typescript';
import { Country } from './country';
import { City } from './city';

@Table({ schema: 'contact',  tableName: 'province', timestamps: false })
export class Province extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'province_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'province_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @ForeignKey(() => Country)
  @Column({ field: 'country_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'province_country_uuid_idx', using: 'btree', unique: false })
  countryUuid?: string;

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

  @BelongsTo(() => Country)
  country?: Country;

  @HasMany(() => City, { sourceKey: 'uuid' })
  cities?: City[];
}
