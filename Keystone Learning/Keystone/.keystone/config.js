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
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // sessionData: 'name',
  sessionData: "isAdmin",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
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
      name: (0, import_fields.text)(),
      email: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      //       password: password({ validation: { isRequired: true } }),
      // One Sided relationships
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      isAdmin: (0, import_fields.checkbox)()
    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "isAdmin"]
      }
    }
  }),
  //  Post: list({
  //     access : allowAll,
  //     fields: {
  //       title: text(),
  //       author: relationship({ ref: 'User.posts',
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name', 'email'],
  //         inlineEdit: { fields: ['name', 'email'] },
  //         linkToItem: true,
  //         inlineCreate: { fields: ['name', 'email'] },
  //       },
  //     }),
  //     },
  //   }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      publishedAt: (0, import_fields.timestamp)(),
      status: (0, import_fields.select)({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" }
        ],
        defaultValue: "draft",
        ui: { displayMode: "segmented-control" }
      }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineCreate: { fields: ["name", "email"] }
        }
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ]
      }),
      // Image
      Image: (0, import_fields.image)({ storage: "my_local_images" })
    }
  }),
  // Image: list({
  //   access: allowAll,
  //   fields: {
  //   name: text({
  //     validation: {
  //     isRequired: true,
  //     },
  //   }),
  //   altText: text(),
  //   image: image({ storage: 'my_local_images' }),
  //   }
  // }),
  // Page: list({
  //   access: allowAll,
  //   fields: {
  //     name: text(),
  //     context: text(),
  //     images: relationship({ ref: 'Image', many: true })
  //   }
  // })
  // Hooks
  // Create User
  AfterOperation: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      email: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        if (operation === "create") {
          console.log(`New user created. Name: ${item.name}, Email: ${item.email}`);
        }
      }
    }
  }),
  // Update User
  ResolveHook: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields.text)({ validation: { isRequired: true } })
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        console.log(resolvedData);
        const { title } = resolvedData;
        if (title) {
          return {
            ...resolvedData,
            title: title[0].toUpperCase() + title.slice(1)
          };
        }
        return resolvedData;
      }
    }
  }),
  // Validate Input
  ValidateInput: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields.text)({ validation: { isRequired: true } })
    },
    hooks: {
      validateInput: ({ resolvedData, addValidationError }) => {
        const { title } = resolvedData;
        console.log(resolvedData);
        if (title === "") {
          addValidationError("The title of a blog post cannot be the empty string");
        }
      }
    }
  }),
  // Triggering Side Effect
  // TriggeringSideEffects: list({
  //   access: allowAll,
  //   fields: {
  //     name: text(),
  //     email: text(),
  //    },
  //   hooks: {
  //     afterOperation: ({ operation, item }) => {
  //       if (operation === 'create') {
  //         console.log(item.name, item.email);
  //       }
  //     }
  //   },
  // }),
  // Field Hooks
  Filed: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        hooks: {
          validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
            const email = resolvedData[fieldKey];
            if (email !== void 0 && email !== null && !email.includes("@")) {
              addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
            }
          }
        }
      })
    }
  }),
  //  Sign In
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
var {
  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000"
} = process.env;
var keystone_default = (0, import_core.config)(
  withAuth({
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
    }
  })
);
