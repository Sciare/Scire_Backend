import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * createTable "file", deps: []
 * createTable "jwtblacklist", deps: []
 * createTable "policy", deps: []
 * createTable "region", deps: []
 * createTable "role", deps: []
 * createTable "school", deps: []
 * createTable "user", deps: []
 * createTable "course", deps: [user, file]
 * createTable "lesson", deps: [course, file]
 * createTable "enrollment", deps: [user, course]
 * createTable "comment", deps: [user, lesson]
 * createTable "profile", deps: [user]
 * createTable "role_policy", deps: [role, policy]
 * createTable "user_role", deps: [user, role]
 *
 **/

const info = {
  revision: "20231123213643",
  name: "migration",
  created: "2023-11-24T01:36:43.909Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "createTable",
    params: [
      "file",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        type: { type: Sequelize.STRING, field: "type", allowNull: false },
        fileName: {
          type: Sequelize.STRING,
          field: "fileName",
          allowNull: false,
        },
        path: { type: Sequelize.STRING, field: "path", allowNull: false },
        isUploaded: {
          type: Sequelize.BOOLEAN,
          field: "isUploaded",
          defaultValue: false,
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
      "jwtblacklist",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING(512),
          field: "token",
          allowNull: false,
        },
        expires: {
          type: Sequelize.DATE,
          field: "expires",
          defaultValue: null,
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
      "policy",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        permission: {
          type: Sequelize.JSON,
          field: "permission",
          allowNull: false,
        },
        isSystemManaged: {
          type: Sequelize.BOOLEAN,
          field: "isSystemManaged",
          defaultValue: false,
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
      "region",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        regionCodeAlphaThree: {
          type: Sequelize.STRING,
          field: "regionCodeAlphaThree",
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
      "role",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        label: {
          type: Sequelize.STRING,
          field: "label",
          defaultValue: "",
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        isDefault: {
          type: Sequelize.BOOLEAN,
          field: "isDefault",
          defaultValue: false,
          allowNull: true,
        },
        isPrivate: {
          type: Sequelize.BOOLEAN,
          field: "isPrivate",
          defaultValue: false,
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
      "school",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
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
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          defaultValue: null,
          allowNull: true,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          defaultValue: null,
          allowNull: true,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
          defaultValue: null,
          allowNull: true,
        },
        uid_azure: {
          type: Sequelize.STRING,
          field: "uid_azure",
          defaultValue: null,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          field: "isActive",
          defaultValue: false,
          allowNull: false,
        },
        isEmailConfirmed: {
          type: Sequelize.BOOLEAN,
          field: "isEmailConfirmed",
          defaultValue: false,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          validate: { isEmail: true },
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          validate: { isLength: { min: 8 } },
          allowNull: false,
        },
        authType: {
          type: Sequelize.ENUM("email", "microsoft", "google"),
          field: "authType",
          defaultValue: "email",
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
      "course",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          defaultValue: null,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: true,
        },
        duration: {
          type: Sequelize.INTEGER,
          field: "duration",
          allowNull: true,
        },
        author: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          allowNull: true,
          name: "author",
          field: "author",
        },
        school_id: {
          type: Sequelize.INTEGER,
          field: "school_id",
          allowNull: false,
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          field: "is_active",
          defaultValue: true,
        },
        tags: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          field: "tags",
          defaultValue: null,
          allowNull: true,
        },
        cover: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "file", key: "id" },
          name: "cover",
          field: "cover",
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
      "lesson",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: true,
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
        duration: {
          type: Sequelize.INTEGER,
          field: "duration",
          defaultValue: null,
          allowNull: true,
        },
        video: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "file", key: "id" },
          name: "video",
          field: "video",
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
      "enrollment",
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
        courseId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "course", key: "id" },
          name: "courseId",
          field: "courseId",
          allowNull: false,
        },
        enrollment_date: {
          type: Sequelize.DATEONLY,
          field: "enrollment_date",
          allowNull: false,
        },
        is_started: {
          type: Sequelize.BOOLEAN,
          field: "is_started",
          defaultValue: false,
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          field: "is_active",
          defaultValue: true,
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
      "comment",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        comment: { type: Sequelize.STRING, field: "comment", allowNull: false },
        date: { type: Sequelize.DATEONLY, field: "date", allowNull: false },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          name: "userId",
          field: "userId",
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
      "profile",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        time_zone: {
          type: Sequelize.STRING,
          field: "time_zone",
          defaultValue: null,
          allowNull: true,
        },
        locale: {
          type: Sequelize.ENUM("en", "es"),
          field: "locale",
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          allowNull: true,
          name: "userId",
          field: "userId",
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
      "role_policy",
      {
        roleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "role", key: "id" },
          name: "roleId",
          field: "roleId",
          allowNull: false,
        },
        policyId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "policy", key: "id" },
          name: "policyId",
          field: "policyId",
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
      "user_role",
      {
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "user", key: "id" },
          primaryKey: true,
          name: "userId",
          field: "userId",
          allowNull: false,
        },
        roleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "role", key: "id" },
          name: "roleId",
          field: "roleId",
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
