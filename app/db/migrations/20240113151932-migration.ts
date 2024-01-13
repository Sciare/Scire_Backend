import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * createTable "learningTrack", deps: [enrollment, lesson]
 *
 **/

const info = {
  revision: "20240113151932",
  name: "migration",
  created: "2024-01-13T19:19:32.481Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "createTable",
    params: [
      "learningTrack",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        enrollmentId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "enrollment", key: "id" },
          name: "enrollmentId",
          field: "enrollmentId",
          allowNull: false,
        },
        lessonId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "lesson", key: "id" },
          name: "lessonId",
          field: "lessonId",
          allowNull: false,
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          field: "isCompleted",
          defaultValue: false,
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
