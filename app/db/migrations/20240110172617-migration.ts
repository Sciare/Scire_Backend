import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * addColumn "taken_lesson" to table "enrollment"
 *
 **/

const info = {
  revision: "20240110172617",
  name: "migration",
  created: "2024-01-10T21:26:17.562Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "addColumn",
    params: [
      "enrollment",
      "taken_lesson",
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: "taken_lesson",
        defaultValue: null,
        allowNull: true,
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
