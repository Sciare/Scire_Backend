import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * createTable "certificate", deps: [course, user]
 * createTable "user_certification", deps: [user, certificate]
 *
 **/

const info = {
  revision: "20231124103453",
  name: "migration",
  created: "2023-11-24T14:34:53.368Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "createTable",
    params: [
      "certificate",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        courseId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "course", key: "id" },
          name: "courseId",
          field: "courseId",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          name: "userId",
          field: "userId",
          allowNull: false,
        },
        dateIssued: {
          type: Sequelize.DATEONLY,
          field: "dateIssued",
          allowNull: false,
        },
        validityPeriod: {
          type: Sequelize.INTEGER,
          field: "validityPeriod",
          allowNull: true,
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
      "user_certification",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          name: "userId",
          field: "userId",
          allowNull: false,
        },
        certificateId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "certificate", key: "id" },
          name: "certificateId",
          field: "certificateId",
          allowNull: false,
        },
        dateObtained: {
          type: Sequelize.DATEONLY,
          field: "dateObtained",
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
