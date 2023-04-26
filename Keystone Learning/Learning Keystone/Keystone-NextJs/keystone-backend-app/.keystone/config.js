"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var isAdmin = ({ session: session2 }) => {
  console.log(session2);
  if (!session2)
    return false;
  if (session2?.data.isAdmin)
    return true;
  return false;
};
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      // posts: relationship({ ref: 'Post.author', many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      isAdmin: (0, import_fields.checkbox)()
    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "isAdmin"]
      }
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      })
      // author: relationship({
      //   ref: 'User.posts',
      //   ui: {
      //     displayMode: 'cards',
      //     cardFields: ['name', 'email'],
      //     inlineEdit: { fields: ['name', 'email'] },
      //     linkToItem: true,
      //     inlineConnect: true,
      //   },
      //   many: false,
      // }),
      // tags: relationship({
      //   ref: 'Tag.posts',
      //   many: true,
      //   ui: {
      //     displayMode: 'cards',
      //     cardFields: ['name'],
      //     inlineEdit: { fields: ['name'] },
      //     linkToItem: true,
      //     inlineConnect: true,
      //     inlineCreate: { fields: ['name'] },
      //   },
      // }),
    }
  }),
  // Tag: list({
  //   access: allowAll,
  //   ui: {
  //     isHidden: true,
  //   },
  //   fields: {
  //     name: text(),
  //     posts: relationship({ ref: 'Post.tags', many: true }),
  //   },
  // }),
  Company: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      year: (0, import_fields.timestamp)({ validation: { isRequired: true } }),
      phone: (0, import_fields.relationship)({ ref: "Phone.company", many: true })
    }
  }),
  Phone: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      company: (0, import_fields.relationship)({ ref: "Company.phone", many: false }),
      document: (0, import_fields_document.document)({
        formatting: {
          alignment: {
            center: true,
            end: true
          },
          blockTypes: {
            blockquote: true
          },
          inlineMarks: {
            bold: true,
            italic: true,
            underline: true
          },
          headingLevels: [1, 2, 3],
          listTypes: {
            ordered: true,
            unordered: true
          }
        },
        links: true,
        layouts: [],
        dividers: true
      })
    }
  }),
  Product: (0, import_core.list)({
    access: {
      operation: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    fields: {
      Product: (0, import_fields.text)({ validation: { isRequired: true } }),
      Description: (0, import_fields.text)({ validation: { isRequired: true } }),
      Price: (0, import_fields.integer)({ validation: { isRequired: true } }),
      Image: (0, import_fields.image)({ storage: "my_local_images" })
    },
    hooks: {
      validateInput: ({ resolvedData, addValidationError }) => {
        const { title } = resolvedData;
        if (title === "") {
          addValidationError("The title of a blog post cannot be the empty string");
        }
      }
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // sessionData: 'name createdAt',
  sessionData: "isAdmin",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var {
  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000"
} = process.env;
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "postgresql",
      url: "postgres://postgres:Satu@7890@localhost:5432/postgres"
    },
    lists,
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    },
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    server: {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true
      }
    }
  })
);
