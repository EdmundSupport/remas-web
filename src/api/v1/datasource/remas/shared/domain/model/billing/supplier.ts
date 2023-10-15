import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({schema: 'billing', tableName: 'supplier', timestamps: false })
export class Supplier extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'supplier_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'supplier_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ field: 'tribute_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'supplier_tribute_uuid_idx', using: 'btree', unique: false })
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
}
