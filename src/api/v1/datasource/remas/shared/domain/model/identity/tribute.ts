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
import { Company } from './company';

export interface TributeAttributes {
  uuid?: string;
  code?: string;
  countryUuid?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'tribute', timestamps: false })
export class Tribute
  extends Model<TributeAttributes, TributeAttributes>
  implements TributeAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'tribute_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'tribute_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  code?: string;

  @Column({ field: 'country_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'tribute_country_uuid_idx', using: 'btree', unique: false })
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

  @HasMany(() => Company, { sourceKey: 'uuid' })
  companies?: Company[];
}
