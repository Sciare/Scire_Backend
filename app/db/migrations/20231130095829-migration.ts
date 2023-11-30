import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * createTable "attempt", deps: []
 * createTable "quiz", deps: []
 * createTable "quizQuestion", deps: []
 *
 **/

const info = {
  revision: "20231130095829",
  name: "migration",
  created: "2023-11-30T13:58:29.766Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "createTable",
    params: [
      "attempt",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        quizId: { type: Sequelize.INTEGER, field: "quizId", allowNull: false },
        userId: { type: Sequelize.INTEGER, field: "userId", allowNull: false },
        answers: { type: Sequelize.JSON, field: "answers", allowNull: false },
        startTime: {
          type: Sequelize.DATE,
          field: "startTime",
          allowNull: false,
        },
        endTime: { type: Sequelize.DATE, field: "endTime", allowNull: false },
        score: { type: Sequelize.INTEGER, field: "score", allowNull: false },
        passed: { type: Sequelize.BOOLEAN, field: "passed", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "quiz",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        courseId: {
          type: Sequelize.INTEGER,
          field: "courseId",
          allowNull: false,
        },
        duration: {
          type: Sequelize.INTEGER,
          field: "duration",
          allowNull: false,
        },
        passingScore: {
          type: Sequelize.INTEGER,
          field: "passingScore",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "quizQuestion",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        quizId: { type: Sequelize.INTEGER, field: "quizId", allowNull: false },
        question: { type: Sequelize.TEXT, field: "question", allowNull: false },
        answers: { type: Sequelize.JSON, field: "answers", allowNull: false },
        correct_answers: {
          type: Sequelize.TEXT,
          field: "correct_answers",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
];

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    for (const command of migrationCommands) {
      console.log("Execute: " + command.fn);
      await queryInterface[command.fn](...command.params);
    }
  },
  info: info,
};
