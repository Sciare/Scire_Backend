import { BaseModel } from "@/libraries/BaseModel";
import {
  AfterCreate,
  BeforeCreate,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Certificate } from "../../Certificate/model/Certificate";
import { Enrollment } from "../../Enrollment/model/Enrollment";
import { Quiz } from "../../Quiz/model/Quiz";
import { QuizQuestion } from "../../QuizQuestion/model/QuizQuestion";
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
  answers: any;

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
    allowNull: true,
  })
  score: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  passed: boolean;

  @BeforeCreate
  static async calculateUserScore(instance: Attempt) {
    const { quizId, answers: userAnswers } = instance;

    const quizQuestions = await QuizQuestion.findAll({ where: { quizId } });
    let correctAnswersCount = 0;

    const totalQuestions = quizQuestions.length;
    quizQuestions.forEach(question => {
      const userAnswer = userAnswers[question.question];
      if (userAnswer && compareAnswers(userAnswer, question.correct_answers)) {
        correctAnswersCount++;
      }
    });

    const totalScore = (correctAnswersCount / totalQuestions) * 100;
    instance.score = totalScore;
  }

  @AfterCreate
  static async calculateScore(instance: Attempt) {
    try {
      const quizInfo = await Quiz.findByPk(instance.quizId);
      if (!quizInfo) {
        console.error("Quiz not found");
        return;
      }
      if (instance.score >= quizInfo.passingScore) {
        instance.passed = true;
        const alreadyHasCertificate = await Certificate.findOne({ where: { courseId:quizInfo.courseId, userId:instance.userId}})
        if(!alreadyHasCertificate) {
          await Certificate.create({
            userId: instance.userId,
            courseId: quizInfo.courseId,
            dateIssued: new Date(),
            validityPeriod: 365,
          });
          console.info("Certificate created successfully");
        }
        await Enrollment.update(
          { is_completed: true },
          {
            where: { courseId: quizInfo.courseId, userId: instance.userId },
          },
        );
        console.info("Enrollment updated to completed");
      }
      await instance.save();
    } catch (error) {
      console.error("Error calculating quiz score:", error);
    }
  }
}
function compareAnswers(userAnswer: any, correct_answers: string) {
  return (
    userAnswer.trim().toLowerCase() === correct_answers.trim().toLowerCase()
  );
}
