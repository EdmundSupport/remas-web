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
import { Tribute } from './tribute';
import { Branch } from './branch';

@Table({ schema: 'identity', tableName: 'company', timestamps: false })
export class Company extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'company_uuid_pk', using: 'btree', unique: true })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @ForeignKey(() => Tribute)
  @Column({ field: 'tribute_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'company_tribute_uuid_idx', using: 'btree', unique: false })
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

  @BelongsTo(() => Tribute)
  tribute?: Tribute;

  @HasMany(() => Branch, { sourceKey: 'uuid' })
  branches?: Branch[];
}
