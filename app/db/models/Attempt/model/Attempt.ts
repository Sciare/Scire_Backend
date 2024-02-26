import { BaseModel } from "@/libraries/BaseModel";
import {
  AfterCreate,
  BeforeCreate,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
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
        console.error("Quiz no encontrado");
        return;
      }
      instance.passed = instance.score >= quizInfo.passingScore;
      await instance.save();
    } catch (error) {
      console.error("Error al buscar la información del quiz:", error);
    }
  }
}
function compareAnswers(userAnswer: any, correct_answers: string) {
  return (
    userAnswer.trim().toLowerCase() === correct_answers.trim().toLowerCase()
  );
}
