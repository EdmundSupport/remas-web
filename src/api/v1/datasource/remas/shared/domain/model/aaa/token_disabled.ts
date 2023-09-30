import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface TokenDisabledAttributes {
  uuid?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'token_disabled', timestamps: false })
export class TokenDisabled
  extends Model<TokenDisabledAttributes, TokenDisabledAttributes>
  implements TokenDisabledAttributes
{
  @Column({
    allowNull: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  token?: string;

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
