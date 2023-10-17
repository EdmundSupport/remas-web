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
import { ChargeStatus } from './charge_status';
import { User } from '../aaa/user';
import { ChargeDetailScheduled } from './charge_detail_scheduled';

@Table({schema: 'inventory', tableName: 'charge', timestamps: false })
export class Charge extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'charge_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'charge_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  number?: string;

  @Column({
    field: 'date_start_scheduled',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  dateStartScheduled?: Date;

  @Column({
    field: 'date_end_scheduled',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  dateEndScheduled?: Date;

  @Column({ field: 'date_start', allowNull: true, type: DataType.DATE })
  dateStart?: Date;

  @Column({ field: 'date_end', allowNull: true, type: DataType.DATE })
  dateEnd?: Date;

  @ForeignKey(() => User)
  @Column({ field: 'user_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'charge_user_uuid_idx', using: 'btree', unique: false })
  userUuid?: string;

  @ForeignKey(() => ChargeStatus)
  @Column({ field: 'charge_status_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'charge_charge_status_uuid_idx',
    using: 'btree',
    unique: false,
  })
  chargeStatusUuid?: string;

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

  @BelongsTo(() => ChargeStatus)
  chargeStatus?: ChargeStatus;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => ChargeDetailScheduled, { sourceKey: 'uuid' })
  chargeDetailScheduleds?: ChargeDetailScheduled[];
}
