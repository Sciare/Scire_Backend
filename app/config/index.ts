// import aws from "aws-sdk";
import ip from "ip";
import path from "path";
import { Dialect } from "sequelize/types";

export const config = {
  root: path.normalize(`${__dirname}/..`),

  env: process.env.NODE_ENV || "development",
  auth: {
    microsoft: {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      tenantID: process.env.MICROSOFT_TENANT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: process.env.MICROSOFT_CALLBACK_URL,
      registerCallbackURL: process.env.MICROSOFT_REGISTER_CALLBACK_URL,
    },
    azure: {
      tokenEndpoint: process.env.AZURE_TOKEN_ENDPOINT,
      scope: process.env.AZURE_SCOPE,
      grantType: process.env.AZURE_GRANT_TYPE,
      Blob: {
        storageAccountName: process.env.STORAGE_ACCOUNT_NAME, // Azure Storage Account Name (required for blob storage authentication with SAS tokens).
        connectionString:
          process.env.CONNECTION_STRING ||
          "DefaultEndpointsProtocol=https;AccountName=scireblob;AccountKey=OejHEAYB0iWbA4rSdoHm32OzuHcwZ/TD1Kaype0eUGbhbQcYFH8C0+HFTQ5gYua6d/qRrxOuXing+AStm3lfoA==;EndpointSuffix=core.windows.net",
        containerName: process.env.CONTAINER_NAME,
        storageAccountKey: process.env.STORAGE_KEY,
      },
    },
    routes: {
      home_page: process.env.HOME_PAGE,
      login_page: process.env.LOGIN_PAGE,
      register_page: process.env.REGISTER_PAGE,
    },
  },
  aws: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION,
    s3: {
      fileBucketName: process.env.APP_AWS_FILE_BUCKET,
    },
  },

  jwt: {
    secret:
      process.env.JWT_SECRET || "tYw9UcCxYKHjOTzcIJPPgoQJxWc6kH177UuDY0l4Qsw",
    access: {
      expiry: {
        unit: "hours",
        length: process.env.JWT_EXPIRY_HOURS
          ? parseInt(process.env.JWT_EXPIRY_HOURS)
          : 30 * 24,
      },
      subject: "access",
      audience: "user",
    },
    refresh: {
      expiry: {
        unit: "months",
        length: 6,
      },
      subject: "refresh",
      audience: "user",
    },
    reset: {
      expiry: {
        unit: "hours",
        length: 12,
      },
      subject: "reset",
      audience: "user",
    },
    confirmEmail: {
      expiry: {
        unit: "hours",
        length: 12,
      },
      subject: "confirmEmail",
      audience: "user",
    },
    exchange: {
      expiry: {
        unit: "minutes",
        length: 10,
      },
      subject: "exchange",
      audience: "user",
    },
  },

  emailAuth: {
    requireEmailConfirmation:
      process.env.EMAIL_AUTH_REQUIRE_EMAIL_CONFIRMATION === "true",
    emailConfirmUrl: process.env.CONFIRM_PAGE || "http://example.com/confirm",
    passwordResetUrl: process.env.RESET_PAGE || "http://example.com/reset",
  },

  email: {
    from_address:
      process.env.EMAIL_FROM_ADDRESS || "MyApp <no-reply@example.com>",
    host: process.env.EMAIL_SMTP_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_SMPT_PORT
      ? parseInt(process.env.EMAIL_SMPT_PORT)
      : 465,
    secure: process.env.EMAIL_SMTP_SECURE
      ? process.env.EMAIL_SMTP_SECURE === "true"
      : true,
    auth: {
      user: process.env.EMAIL_SMTP_USER || "(your SMTP user)",
      pass: process.env.EMAIL_SMTP_PASS || "(your SMTP password)",
    },
    routes: {
      passwordRecovery: process.env.PASSWORD_RECOVERY_ROUTE,
    },
    defaultPassword: process.env.DEFAULT_PASSWORD || "adminadmin",
  },

  server: {
    port: process.env.SERVER_PORT || 8888,
  },

  api: {
    // Default limit and offset levels for responses
    limit: 99,
    offset: 0,
    // Show detailed error responses or not
    debug: true,
    order: [["id", "ASC"]],
  },

  log: {
    // Console Log levels: error, warn, info, verbose, debug, silly
    level: process.env.LOG_LEVEL || "debug",
    logToFiles: process.env.LOG_TO_FILES
      ? process.env.LOG_TO_FILES === "true"
      : false,
  },

  urls: {
    // Url config as seen from the user NOT NECESSARILY THE SAME AS SERVER
    // http or https
    protocol: process.env.URLS_PROTOCOL || "http",
    url: process.env.URLS_URL || ip.address(),
    port: process.env.URLS_PORT ? String(process.env.URLS_PORT) : "",
    apiRoot: process.env.URLS_API_ROOT || "/api/v1",
    base: "",
    baseApi: "",
  },

  db: {
    database: process.env.DB_NAME || "backgroundengagement-back",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "test123",
    //host: process.env.DB_HOST || "localhost",
    host: process.env.DB_HOST || "database",
    dialect: (process.env.DB_TYPE || "postgres") as Dialect,
    logging: false,
    storage: process.env.DB_STORAGE || "db.sqlite",
    timezone: "utc", // IMPORTANT For correct timezone management with DB.
    encryptSecret: process.env.DB_ENCRYPT_SECRET,
  },
  swagger: {
    route: process.env.SWAGGER_ROUTE || "/swagger",
    username: process.env.SWAGGER_USERNAME || "admin",
    password: process.env.SWAGGER_PASSWORD || "password",
    hasAuth: process.env.SWAGGER_HAS_AUTH || false,
  },

  scire:{
    certificate_url: process.env.SCIRE_CERTIFICATE_URL || "http://localhost:5173/certificate"
  }
};

let portString = "";
if (Number.isInteger(parseInt(config.urls.port)))
  portString = `:${config.urls.port}`;

config.urls.base = `${config.urls.protocol}://${config.urls.url}${portString}`;
config.urls.baseApi = `${config.urls.base}${config.urls.apiRoot}`;

if (config.db.dialect === "sqlite") {
  // sqlite dialect doesn't support timezone and crashes if we pass one (it is utc by default anyway)
  delete config.db.timezone;
}

//AWS environment variables needed for s3

// aws.config.update({
//   secretAccessKey: config.aws.secretAccessKey,
//   accessKeyId: config.aws.accessKeyId,
//   sessionToken: config.aws.sessionToken,
//   region: config.aws.region,
// });
