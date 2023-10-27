/**
* Documento generado automaticamente por Edmundo Guerrero, no modificar
*/
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
import { Maintenance } from './maintenance';
import { MaintenanceStepDetail } from './maintenance-step-detail';

@Table({ schema: 'billing',  tableName: 'maintenance_step', timestamps: false })
export class MaintenanceStep extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'maintenance_step_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'maintenance_step_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => Maintenance)
  @Column({ field: 'maintenance_uuid', allowNull: true, type: DataType.UUID })
  @Index({
    name: 'maintenance_step_maintenance_uuid_idx',
    using: 'btree',
    unique: false,
  })
  maintenanceUuid?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL,
  })
  order?: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  description?: string;

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

  @BelongsTo(() => Maintenance)
  maintenance?: Maintenance;

  @HasMany(() => MaintenanceStepDetail, { sourceKey: 'uuid', as: 'msd' })
  maintenanceStepDetails?: MaintenanceStepDetail[];
}
