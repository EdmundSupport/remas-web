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
import { Quotation } from './quotation';

export interface ClientAttributes {
  uuid?: string;
  tributeUuid?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'client', timestamps: false })
export class Client
  extends Model<ClientAttributes, ClientAttributes>
  implements ClientAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'client_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'client_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

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
}
