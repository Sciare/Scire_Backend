import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BaseModel } from "@/libraries/BaseModel";
import { User } from "../../User/model/User";
import { Lesson } from "../../Lesson/model/Lesson";

@Table({
  tableName: "comment",
})
export class Comment extends BaseModel<Comment> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: () => new Date().toISOString().split("T")[0],
  })
  date: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Lesson)
  @Column({
    allowNull: false,
  })
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: User;
}
