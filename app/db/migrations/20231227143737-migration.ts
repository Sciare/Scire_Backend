import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * addColumn "is_completed" to table "enrollment"
 *
 **/

const info = {
  revision: "20231227143737",
  name: "migration",
  created: "2023-12-27T18:37:37.609Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "addColumn",
    params: [
      "enrollment",
      "is_completed",
      { type: Sequelize.BOOLEAN, field: "is_completed", defaultValue: false },
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
