import { BaseModel } from "@/libraries/BaseModel";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Course } from "../../Course/model/Course";
import { User } from "../../User/model/User";

@Table({
  tableName: "certificate",
})
export class Certificate extends BaseModel<Certificate> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Course)
  @Column({
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dateIssued: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  validityPeriod: number;
}
