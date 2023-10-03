import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface BinnacleAttributes {
  uuid?: string;
  schemaName?: string;
  tableName?: string;
  tableUuid?: string;
  operationType?: string;
  userName?: string;
  data?: object;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'binnacle', timestamps: false })
export class Binnacle
  extends Model<BinnacleAttributes, BinnacleAttributes>
  implements BinnacleAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'binnacle_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'binnacle_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ field: 'schema_name', allowNull: true, type: DataType.STRING })
  schemaName?: string;

  @Column({ field: 'table_name', allowNull: true, type: DataType.STRING })
  @Index({ name: 'binnacle_table_name_idx', using: 'btree', unique: false })
  tableName?: string;

  @Column({ field: 'table_uuid', allowNull: true, type: DataType.STRING })
  @Index({ name: 'binnacle_table_uuid_idx', using: 'btree', unique: false })
  tableUuid?: string;

  @Column({ field: 'operation_type', allowNull: true, type: DataType.STRING })
  operationType?: string;

  @Column({ field: 'user_name', allowNull: true, type: DataType.STRING })
  userName?: string;

  @Column({ allowNull: true, type: DataType.JSONB })
  data?: object;

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
}
