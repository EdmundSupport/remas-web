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
import { DischargeDetailScheduled } from './discharge_detail_scheduled';
import { MeasureUnit } from './measure_unit';

@Table({ tableName: 'discharge_detail', timestamps: false })
export class DischargeDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'discharge_detail_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'discharge_detail_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => DischargeDetailScheduled)
  @Column({
    field: 'discharge_detail_scheduled_uuid',
    allowNull: true,
    type: DataType.UUID,
  })
  @Index({
    name: 'discharge_detail_discharge_detail_scheduled_uuid_idx',
    using: 'btree',
    unique: false,
  })
  dischargeDetailScheduledUuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  amount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  price?: string;

  @ForeignKey(() => MeasureUnit)
  @Column({ field: 'measure_unit_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'discharge_detail_measure_unit_uuid_idx',
    using: 'btree',
    unique: false,
  })
  measureUnitUuid?: string;

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

  @BelongsTo(() => DischargeDetailScheduled)
  dischargeDetailScheduled?: DischargeDetailScheduled;

  @BelongsTo(() => MeasureUnit)
  measureUnit?: MeasureUnit;
}
