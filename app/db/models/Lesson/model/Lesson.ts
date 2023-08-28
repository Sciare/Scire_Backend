import { BaseModel } from "@/libraries/BaseModel";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Course } from "../../Course/model/Course";
import { File } from "../../File/model/File";

@Table({
  tableName: "lesson",
})
export class Lesson extends BaseModel<Lesson> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => Course)
  @Column({
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  duration: number;

  //FK TO FILE (url of the video)
  @ForeignKey(() => File)
  @Column({
    allowNull: true,
  })
  video: number;

  @BelongsTo(() => File, { as: "Video" })
  file: File;
}
