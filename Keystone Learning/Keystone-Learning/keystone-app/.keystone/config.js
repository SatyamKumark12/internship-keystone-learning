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
  default: () => keystone_default,
  myInt: () => myInt
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var import_fields2 = require("@keystone-6/core/fields");
var isUser = ({ session: session2 }) => !!session2?.data.id;
var isAdmin = ({ session: session2 }) => session2?.data.isAdmin;
var isPerson = ({ session: session2, item }) => session2?.data.id === item.id;
var isAdminOrPerson = ({ session: session2, item }) => isAdmin({ session: session2 }) || isPerson({ session: session2, item });
var lists = {
  User: (0, import_core.list)({
    access: {
      operation: {
        create: isAdmin,
        delete: isAdmin
      },
      item: {
        update: isAdminOrPerson
      }
    },
    fields: {
      // name: text({ validation: { isRequired: true } }),
      name: (0, import_fields.text)(),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique",
        access: {
          read: isAdminOrPerson
        }
      }),
      password: (0, import_fields.password)({ access: {
        // Note: password fields never reveal their value, only whether a value exists
        read: isAdminOrPerson,
        update: isPerson
      } }),
      isAdmin: (0, import_fields.checkbox)({ access: {
        read: isUser,
        update: isAdmin
      } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      // isAdmin: checkbox(),
      // Two Sided 
      // One to One
      // post: relationship({ ref: 'Post.author', many: false }),
      // One to Many
      // posts: relationship({ref: 'Post.author', many: true }),
      // Many to Many
      // posts: relationship({ ref: 'Post.authors', many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
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
      }),
      // title: text(),
      //   content: text(),
      // author: relationship({ ref: 'User', many: true }),
      // One to One
      // author: relationship({ ref: 'User.post', many: false }),
      // One to Many
      // author: relationship({ ref: 'User.posts', many: false }),
      // Many to Many
      // authors: relationship({ ref: 'User.posts', many: true }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      })
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
      Image: (0, import_fields2.image)({ storage: "my_local_images" })
    },
    hooks: {
      validateInput: ({ resolvedData, addValidationError }) => {
        const { title } = resolvedData;
        if (title === "") {
          addValidationError("The title of a blog post cannot be the empty string");
        }
      }
    }
  }),
  Counter: (0, import_core.list)({
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
      Image: (0, import_fields2.image)({ storage: "my_local_images" })
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
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  // sessionData: 'name createdAt',
  sessionData: "isAdmin",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_types = require("@keystone-6/core/types");
var import_core3 = require("@keystone-6/core");
var {
  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000"
} = process.env;
var myInt = ({
  isIndexed,
  ...config2
} = {}) => (meta) => (0, import_types.fieldType)({
  kind: "scalar",
  mode: "optional",
  scalar: "Int",
  index: isIndexed === true ? "index" : isIndexed || void 0
})({
  ...config2,
  input: {
    create: { arg: import_core3.graphql.arg({ type: import_core3.graphql.Int }) },
    update: { arg: import_core3.graphql.arg({ type: import_core3.graphql.Int }) },
    orderBy: { arg: import_core3.graphql.arg({ type: import_types.orderDirectionEnum }) }
  },
  output: import_core3.graphql.field({ type: import_core3.graphql.Int }),
  views: "./view"
});
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "postgresql",
      url: "postgres://postgres:Satu@7890@localhost:5432/postgres"
    },
    lists,
    session,
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
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  myInt
});
