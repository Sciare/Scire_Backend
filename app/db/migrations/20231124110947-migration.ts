import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * changeColumn "school_id" on table "course"
 *
 **/

const info = {
  revision: "20231124110947",
  name: "migration",
  created: "2023-11-24T15:09:47.277Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "changeColumn",
    params: [
      "course",
      "school_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "school", key: "id" },
        name: "school_id",
        field: "school_id",
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
