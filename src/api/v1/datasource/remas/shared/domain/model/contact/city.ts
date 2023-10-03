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
import { Province } from './province';
import { Address } from './address';

export interface CityAttributes {
  uuid?: string;
  code?: string;
  name?: string;
  provinceUuid?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'city', timestamps: false })
export class City
  extends Model<CityAttributes, CityAttributes>
  implements CityAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'city_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'city_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @ForeignKey(() => Province)
  @Column({ field: 'province_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'city_province_uuid_idx', using: 'btree', unique: false })
  provinceUuid?: string;

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

  @BelongsTo(() => Province)
  province?: Province;

  @HasMany(() => Address, { sourceKey: 'uuid' })
  addresses?: Address[];
}
