import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * dropTable "user_certification"
 * changeColumn "school_id" on table "course"
 * changeColumn "school_id" on table "course"
 * changeColumn "school_id" on table "course"
 * changeColumn "school_id" on table "course"
 *
 **/

const info = {
  revision: "20231124110717",
  name: "migration",
  created: "2023-11-24T15:07:17.301Z",
  comment: "",
};

const migrationCommands = [
  { fn: "dropTable", params: ["user_certification"] },
  {
    fn: "changeColumn",
    params: [
      "course",
      "school_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "school", key: "id" },
        name: "school_id",
        field: "school_id",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "course",
      "school_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "school", key: "id" },
        name: "school_id",
        field: "school_id",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "course",
      "school_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "school", key: "id" },
        name: "school_id",
        field: "school_id",
        allowNull: false,
      },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "course",
      "school_id",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
