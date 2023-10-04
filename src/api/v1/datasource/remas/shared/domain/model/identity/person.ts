import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'person', timestamps: false })
export class Person extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  @Index({ name: 'person_uuid_pk', using: 'btree', unique: true })
  @Index({ name: 'person_uuid_idx', using: 'btree', unique: false })
  uuid?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(65) })
  @Index({ name: 'person_un', using: 'btree', unique: true })
  number?: string;

  @Column({ field: 'name_first', allowNull: true, type: DataType.STRING })
  nameFirst?: string;

  @Column({ field: 'name_second', allowNull: true, type: DataType.STRING })
  nameSecond?: string;

  @Column({ field: 'name_other', allowNull: true, type: DataType.STRING })
  nameOther?: string;

  @Column({ field: 'surname_first', allowNull: true, type: DataType.STRING })
  surnameFirst?: string;

  @Column({ field: 'surname_second', allowNull: true, type: DataType.STRING })
  surnameSecond?: string;

  @Column({ field: 'surname_other', allowNull: true, type: DataType.STRING })
  surnameOther?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  birthday?: Date;

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
