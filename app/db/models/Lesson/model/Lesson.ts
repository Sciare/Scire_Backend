import { BaseModel } from "@/libraries/BaseModel";
import {
  AfterFind,
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
    type: DataType.INTEGER,
    allowNull: true,
  })
  lesson_number: number;

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

  @BelongsTo(() => File)
  file: File;

  async populateUrl() {
    if (this.video && this.file) {
      await this.file.populateUrl();
    }
  }

  @AfterFind
  static populateUrl(course: Course | Course[]) {
    if (Array.isArray(course)) {
      course.forEach(course => {
        if (course) {
          course.populateUrl();
        }
      });
    } else {
      if (course) {
        course.populateUrl();
      }
    }
  }
}
