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
import { Quotation } from './quotation';
import { Tribute } from '../identity/tribute';

@Table({schema: 'billing', tableName: 'client', timestamps: false })
export class Client extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'client_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'client_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => Tribute)
  @Column({ field: 'tribute_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'client_tribute_uuid_idx', using: 'btree', unique: false })
  tributeUuid?: string;

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

  @HasMany(() => Quotation, { sourceKey: 'uuid' })
  quotations?: Quotation[];

  @BelongsTo(() => Tribute)
  tribute?: Tribute;
}
