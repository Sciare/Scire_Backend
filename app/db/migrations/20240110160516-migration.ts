import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * addColumn "lesson_number" to table "lesson"
 *
 **/

const info = {
  revision: "20240110160516",
  name: "migration",
  created: "2024-01-10T20:05:16.180Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "addColumn",
    params: [
      "lesson",
      "lesson_number",
      { type: Sequelize.INTEGER, field: "lesson_number", allowNull: true },
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
