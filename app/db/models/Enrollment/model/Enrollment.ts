import { Course } from "@/db/models/Course/model/Course";
import { User } from "@/db/models/User/model/User";
import { BaseModel } from "@/libraries/BaseModel";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "enrollment",
})
export class Enrollment extends BaseModel<Enrollment> {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Course)
  @Column({
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: () => new Date().toISOString().split("T")[0],
  })
  enrollment_date: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_started: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    defaultValue: null,
  })
  taken_lesson: string[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_completed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;
}
