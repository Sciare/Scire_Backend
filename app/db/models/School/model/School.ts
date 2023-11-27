import { BaseModel } from "@/libraries/BaseModel";
import { Column, DataType, HasMany, Table } from "sequelize-typescript";
import { Course } from "../../Course/model/Course";

@Table({
  tableName: "school",
})
export class School extends BaseModel<School> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Course)
  courses: Course[];
}
