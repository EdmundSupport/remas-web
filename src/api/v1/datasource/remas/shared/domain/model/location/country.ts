import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Province } from './province';

export interface CountryAttributes {
  uuid?: string;
  code?: string;
  name?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'country', timestamps: false })
export class Country
  extends Model<CountryAttributes, CountryAttributes>
  implements CountryAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'country_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'country_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

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

  @HasMany(() => Province, { sourceKey: 'uuid' })
  provinces?: Province[];
}
