import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * removeColumn "taken_lesson" from table "enrollment"
 *
 **/

const info = {
  revision: "20240113152536",
  name: "migration",
  created: "2024-01-13T19:25:36.058Z",
  comment: "",
};

const migrationCommands = [
  { fn: "removeColumn", params: ["enrollment", "taken_lesson"] },
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
