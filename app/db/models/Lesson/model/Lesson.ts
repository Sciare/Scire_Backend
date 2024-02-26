import { BaseModel } from "@/libraries/BaseModel";
import {
  AfterCreate,
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
  static populateUrl(lesson: Lesson | Lesson[]) {
    if (Array.isArray(lesson)) {
      lesson.forEach(lesson => {
        if (lesson) {
          lesson.populateUrl();
        }
      });
    } else {
      if (lesson) {
        lesson.populateUrl();
      }
    }
  }

  @AfterCreate
  static async updateCourseDuration(instance: Lesson) {
    try {
      const course = await Course.findByPk(instance.courseId);
      if (!course) {
        console.error("Curso no encontrado");
        return;
      }

      const lessonDuration = Number(instance.duration) || 0;
      const courseDuration = Number(course.duration) || 0;

      const newDuration = courseDuration + lessonDuration;
      course.duration = newDuration;
      await course.save();
    } catch (error) {
      console.error("Error al actualizar la duración del curso:", error);
    }
  }
}
