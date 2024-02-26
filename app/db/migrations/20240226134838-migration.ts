import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * changeColumn "score" on table "attempt"
 * changeColumn "passed" on table "attempt"
 * changeColumn "passed" on table "attempt"
 * changeColumn "courseId" on table "quiz"
 * changeColumn "courseId" on table "quiz"
 * changeColumn "courseId" on table "quiz"
 * changeColumn "courseId" on table "quiz"
 * changeColumn "quizId" on table "quizQuestion"
 * changeColumn "quizId" on table "quizQuestion"
 * changeColumn "quizId" on table "quizQuestion"
 * changeColumn "quizId" on table "quizQuestion"
 *
 **/

const info = {
  revision: "20240226134838",
  name: "migration",
  created: "2024-02-26T17:48:38.038Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "changeColumn",
    params: [
      "attempt",
      "score",
      { type: Sequelize.INTEGER, field: "score", allowNull: true },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "attempt",
      "passed",
      {
        type: Sequelize.BOOLEAN,
        field: "passed",
        defaultValue: false,
        allowNull: true,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "attempt",
      "passed",
      {
        type: Sequelize.BOOLEAN,
        field: "passed",
        defaultValue: false,
        allowNull: true,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quiz",
      "courseId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "course", key: "id" },
        name: "courseId",
        field: "courseId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quiz",
      "courseId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "course", key: "id" },
        name: "courseId",
        field: "courseId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quiz",
      "courseId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "course", key: "id" },
        name: "courseId",
        field: "courseId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quiz",
      "courseId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "course", key: "id" },
        name: "courseId",
        field: "courseId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quizQuestion",
      "quizId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "quiz", key: "id" },
        name: "quizId",
        field: "quizId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quizQuestion",
      "quizId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "quiz", key: "id" },
        name: "quizId",
        field: "quizId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quizQuestion",
      "quizId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "quiz", key: "id" },
        name: "quizId",
        field: "quizId",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "quizQuestion",
      "quizId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "quiz", key: "id" },
        name: "quizId",
        field: "quizId",
        allowNull: false,
      },
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
