import { User } from "@/db/models/User/model/User";
import { BaseModel } from "@/libraries/BaseModel";
import {
  AfterFind,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { File } from "../../File/model/File";
import { School } from "../../School/model/School";

@Table({
  tableName: "course",
})
export class Course extends BaseModel<Course> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  duration: number;

  @ForeignKey(() => User)
  @Column
  author: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  school_id: number;

  @BelongsTo(() => School)
  school: School;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    defaultValue: null,
  })
  tags: string[];

  //FK TO image
  @ForeignKey(() => File)
  @Column({
    allowNull: true,
  })
  cover: number;

  @BelongsTo(() => File)
  file: File;

  async populateUrl() {
    if (this.cover && this.file) {
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
