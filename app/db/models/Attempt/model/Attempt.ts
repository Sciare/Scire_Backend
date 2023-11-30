import { BaseModel } from "@/libraries/BaseModel";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Quiz } from "../../Quiz/model/Quiz";
import { User } from "../../User/model/User";

@Table({
  tableName: "attempt",
})
export class Attempt extends BaseModel<Attempt> {
  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quizId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  answers: any; // JSON field to store student's answers

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endTime: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  score: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  passed: boolean;
}
