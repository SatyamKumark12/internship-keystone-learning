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
var import_core3 = require("@keystone-6/core");

// schema.ts
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// custom-fields/index.ts
var import_types = require("@keystone-6/core/types");
var import_core = require("@keystone-6/core");
function text({
  isIndexed,
  ...config2
} = {}) {
  return (meta) => (0, import_types.fieldType)({
    kind: "scalar",
    mode: "optional",
    scalar: "String",
    index: isIndexed === true ? "index" : isIndexed || void 0
  })({
    ...config2,
    input: {
      create: {
        arg: import_core.graphql.arg({ type: import_core.graphql.String }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return value;
        }
      },
      update: { arg: import_core.graphql.arg({ type: import_core.graphql.String }) },
      orderBy: { arg: import_core.graphql.arg({ type: import_types.orderDirectionEnum }) }
    },
    output: import_core.graphql.field({
      type: import_core.graphql.String,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve({ value, item }, args, context, info) {
        return value;
      }
    }),
    views: "./1-text-field/views",
    getAdminMeta() {
      return {};
    }
  });
}

// schema.ts
var lists = {
  User: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      name: text(),
      email: text({
        // validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Post: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      //   title: text({ validation: { isRequired: true } }),
      //     formatting: true,
      //     layouts: [
      //       [1, 1],
      //       [1, 1, 1],
      //       [2, 1],
      //       [1, 2],
      //       [1, 2, 1],
      //     ],
      //     links: true,
      //     dividers: true,
      //   }),
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
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.posts",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  Tag: (0, import_core2.list)({
    access: import_access.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: text(),
      posts: (0, import_fields.relationship)({ ref: "Post.tags", many: true })
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
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  // sessionData: 'name createdAt',
  sessionData: "name createdAt",
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
var {
  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000"
} = process.env;
var keystone_default = withAuth(
  (0, import_core3.config)({
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
