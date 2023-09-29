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
import { SessionType } from './session_type';
import { User } from './user';

export interface SessionAttributes {
  uuid?: string;
  userUuid?: string;
  sessionTypeUuid?: string;
  token?: string;
  condition?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'session', timestamps: false })
export class Session
  extends Model<SessionAttributes, SessionAttributes>
  implements SessionAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'token_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'token_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'token_user_uuid_idx', using: 'btree', unique: false })
  userUuid?: string;

  @ForeignKey(() => SessionType)
  @Column({ field: 'session_type_uuid', allowNull: true, type: DataType.UUID })
  @Index({ name: 'token_type_uuid_uuid_idx', using: 'btree', unique: false })
  sessionTypeUuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  token?: string;

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

  @BelongsTo(() => SessionType)
  sessionType?: SessionType;

  @BelongsTo(() => User)
  user?: User;
}
