import { Enrollment } from "@/db/models/Enrollment/model/Enrollment";
import { BaseModel } from "@/libraries/BaseModel";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Lesson } from "../../Lesson/model/Lesson";

@Table({
  tableName: "learningTrack",
})
export class LearningTrack extends BaseModel<LearningTrack> {
  @ForeignKey(() => Enrollment)
  @Column({
    allowNull: false,
  })
  enrollmentId: number;

  @BelongsTo(() => Enrollment)
  enrollment: Enrollment;

  @ForeignKey(() => Lesson)
  @Column({
    allowNull: false,
  })
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isCompleted: boolean;
}
