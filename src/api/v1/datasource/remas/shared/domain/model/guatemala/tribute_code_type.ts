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
import { Tribute } from './tribute';

export interface TributeCodeTypeAttributes {
  uuid?: string;
  keyName?: string;
  name?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'tribute_code_type', timestamps: false })
export class TributeCodeType
  extends Model<TributeCodeTypeAttributes, TributeCodeTypeAttributes>
  implements TributeCodeTypeAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'tribute_code_type_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'tribute_code_type_uuid_idx', using: 'btree', unique: false })
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

  @HasMany(() => Tribute, { sourceKey: 'uuid' })
  tributes?: Tribute[];
}
