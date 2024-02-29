import { config } from "@/config";
import { BaseModel } from "@/libraries/BaseModel";
import emailService from "@/services/EmailService";
import {
  AfterCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Course } from "../../Course/model/Course";
import { User } from "../../User/model/User";

@Table({
  tableName: "certificate",
})
export class Certificate extends BaseModel<Certificate> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Course)
  @Column({
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dateIssued: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  validityPeriod: number;

  @AfterCreate
  static async sendEmail (instance:Certificate) {
    const course = await Course.findByPk(instance.courseId);
    const userInfo = await User.findByPk(instance.userId)
    const emailData = {
      "email": `${userInfo.email}`,
      "subject": `Scire - Certificación: ${course.name}`,
      "page": "certificate",
      "locale": "es-ES",
      "context": {
        "userName": `${userInfo.name}`,
        "courseName": `${course.name}`,
        "url": config.scire.certificate_url,
      },
    }    
    emailService.sendEmail(emailData)
  }
}
