import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from './product';
import { MeasureUuid } from './measure_uuid';
import { Measure } from './measure';

export interface MeasureAttributes {
  uuid?: string;
  keyName?: string;
  name?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'measure', timestamps: false })
export class Measure
  extends Model<MeasureAttributes, MeasureAttributes>
  implements MeasureAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'measure_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'measure_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ field: 'key_name', allowNull: true, type: DataType.STRING })
  keyName?: string;

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

  @HasMany(() => Product, { sourceKey: 'uuid' })
  products?: Product[];

  @HasMany(() => MeasureUuid, { sourceKey: 'uuid' })
  measureUuids?: MeasureUuid[];

  @HasMany(() => Measure, { sourceKey: 'uuid' })
  measures?: Measure[];

  @BelongsTo(() => Measure)
  measure?: Measure;
}
