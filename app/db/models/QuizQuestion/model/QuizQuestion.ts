import { BaseModel } from "@/libraries/BaseModel";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Quiz } from "../../Quiz/model/Quiz";

@Table({
  tableName: "quizQuestion",
})
export class QuizQuestion extends BaseModel<QuizQuestion> {
  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quizId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  question: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  answers: []; // Array field to store answers

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  correct_answers: string;
}
