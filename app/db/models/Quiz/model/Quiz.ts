import { BaseModel } from "@/libraries/BaseModel";
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from "sequelize-typescript";
import { Course } from "../../Course/model/Course";
import { QuizQuestion } from "../../QuizQuestion/model/QuizQuestion";

@Table({
  tableName: "quiz",
})
export class Quiz extends BaseModel<Quiz> {
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passingScore: number;

  @HasMany(() => QuizQuestion)
  QuizQuestion: QuizQuestion[];
}
