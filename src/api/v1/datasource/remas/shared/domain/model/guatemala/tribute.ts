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
import { TributeCodeType } from './tribute_code_type';

export interface TributeAttributes {
  uuid?: string;
  tributeUuid?: string;
  tributeCodeTypeUuid?: string;
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

  @Column({ field: 'tribute_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'tribute_tribute_uuid_idx', using: 'btree', unique: false })
  tributeUuid?: string;

  @ForeignKey(() => TributeCodeType)
  @Column({
    field: 'tribute_code_type_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'tribute_tribute_code_type_uuid_idx',
    using: 'btree',
    unique: false,
  })
  tributeCodeTypeUuid?: string;

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

  @BelongsTo(() => TributeCodeType)
  tributeCodeType?: TributeCodeType;
}
