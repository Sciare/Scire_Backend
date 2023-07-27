import { Table, Column, DataType } from "sequelize-typescript";
import { BaseModel } from "@/libraries/BaseModel";

@Table({
  tableName: "school",
})
export class School extends BaseModel<School> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
