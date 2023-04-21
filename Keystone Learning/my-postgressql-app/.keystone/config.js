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
var import_core6 = require("@keystone-6/core");

// schema.ts
var import_core5 = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// 2-stars-field/index.ts
var import_types = require("@keystone-6/core/types");
var import_core = require("@keystone-6/core");
var stars = ({
  isIndexed,
  maxStars = 5,
  ...config3
} = {}) => (meta) => (0, import_types.fieldType)({
  // this configures what data is stored in the database
  kind: "scalar",
  mode: "optional",
  scalar: "Int",
  index: isIndexed === true ? "index" : isIndexed || void 0
})({
  // this passes through all of the common configuration like access control and etc.
  ...config3,
  hooks: {
    ...config3.hooks,
    // We use the `validateInput` hook to ensure that the user doesn't set an out of range value.
    // This hook is the key difference on the backend between the stars field type and the integer field type.
    async validateInput(args) {
      const val = args.resolvedData[meta.fieldKey];
      if (!(val == null || val >= 0 && val <= maxStars)) {
        args.addValidationError(`The value must be within the range of 0-${maxStars}`);
      }
      await config3.hooks?.validateInput?.(args);
    }
  },
  // all of these inputs are optional if they don't make sense for a particular field type
  input: {
    create: {
      arg: import_core.graphql.arg({ type: import_core.graphql.Int }),
      // this field type doesn't need to do anything special
      // but field types can specify resolvers for inputs like they can for their output GraphQL field
      // this function can be omitted, it is here purely to show how you could change it
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve(val, context) {
        if (val === null) {
          return null;
        }
        if (val === void 0) {
          return void 0;
        }
        return val;
      }
    },
    update: { arg: import_core.graphql.arg({ type: import_core.graphql.Int }) },
    orderBy: { arg: import_core.graphql.arg({ type: import_types.orderDirectionEnum }) }
  },
  // this
  output: import_core.graphql.field({
    type: import_core.graphql.Int,
    // like the input resolvers, providing the resolver is unnecessary if you're just returning the value
    // it is shown here to show what you could do
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolve({ value, item }, args, context, info) {
      return value;
    }
  }),
  views: "./2-stars-field/views",
  getAdminMeta() {
    return { maxStars };
  }
});

// 3-pair-field/index.ts
var import_types2 = require("@keystone-6/core/types");
var import_core2 = require("@keystone-6/core");
var PairInput = import_core2.graphql.String;
var PairOutput = import_core2.graphql.String;
var PairFilter = import_core2.graphql.inputObject({
  name: "PairFilter",
  fields: {
    equals: import_core2.graphql.arg({ type: import_core2.graphql.String })
  }
});
function pair(config3 = {}) {
  function resolveInput(value) {
    if (!value)
      return { left: value, right: value };
    const [left = "", right = ""] = value.split(" ", 2);
    return {
      left,
      right
    };
  }
  function resolveOutput(value) {
    const { left, right } = value;
    if (left === null || right === null)
      return null;
    return `${left} ${right}`;
  }
  function resolveWhere(value) {
    if (value === null) {
      throw new Error("PairFilter cannot be null");
    }
    if (value.equals === void 0) {
      return {};
    }
    const { left, right } = resolveInput(value.equals);
    return {
      left: { equals: left },
      right: { equals: right }
    };
  }
  return (meta) => (0, import_types2.fieldType)({
    kind: "multi",
    fields: {
      left: {
        kind: "scalar",
        mode: "optional",
        scalar: "String"
      },
      right: {
        kind: "scalar",
        mode: "optional",
        scalar: "String"
      }
    }
  })({
    ...config3,
    input: {
      where: {
        arg: import_core2.graphql.arg({ type: PairFilter }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveWhere(value);
        }
      },
      create: {
        arg: import_core2.graphql.arg({ type: PairInput }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveInput(value);
        }
      },
      update: {
        arg: import_core2.graphql.arg({ type: PairInput }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveInput(value);
        }
      }
    },
    output: import_core2.graphql.field({
      type: PairOutput,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve({ value, item }, args, context, info) {
        return resolveOutput(value);
      }
    }),
    views: "./3-pair-field/views",
    getAdminMeta() {
      return {};
    }
  });
}

// 3-pair-field-nested/index.ts
var import_types3 = require("@keystone-6/core/types");
var import_core3 = require("@keystone-6/core");
var PairInput2 = import_core3.graphql.inputObject({
  name: "PairNestedInput",
  fields: {
    left: import_core3.graphql.arg({ type: import_core3.graphql.String }),
    right: import_core3.graphql.arg({ type: import_core3.graphql.String })
  }
});
var PairOutput2 = import_core3.graphql.object()({
  name: "PairNestedOutput",
  fields: {
    left: import_core3.graphql.field({ type: import_core3.graphql.String }),
    right: import_core3.graphql.field({ type: import_core3.graphql.String })
  }
});
var PairFilter2 = import_core3.graphql.inputObject({
  name: "PairNestedFilter",
  fields: {
    equals: import_core3.graphql.arg({
      type: PairInput2
    })
  }
});
function pair2(config3 = {}) {
  function resolveInput(value) {
    const { left = null, right = null } = value ?? {};
    return { left, right };
  }
  function resolveOutput(value) {
    return value;
  }
  function resolveWhere(value) {
    if (value === null) {
      throw new Error("PairFilter cannot be null");
    }
    if (value.equals === void 0) {
      return {};
    }
    const { left, right } = resolveInput(value.equals);
    return {
      left: { equals: left },
      right: { equals: right }
    };
  }
  return (meta) => (0, import_types3.fieldType)({
    kind: "multi",
    fields: {
      left: {
        kind: "scalar",
        mode: "optional",
        scalar: "String"
      },
      right: {
        kind: "scalar",
        mode: "optional",
        scalar: "String"
      }
    }
  })({
    ...config3,
    input: {
      where: {
        arg: import_core3.graphql.arg({ type: PairFilter2 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveWhere(value);
        }
      },
      create: {
        arg: import_core3.graphql.arg({ type: PairInput2 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveInput(value);
        }
      },
      update: {
        arg: import_core3.graphql.arg({ type: PairInput2 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveInput(value);
        }
      }
    },
    output: import_core3.graphql.field({
      type: PairOutput2,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve({ value, item }, args, context, info) {
        return resolveOutput(value);
      }
    }),
    views: "./3-pair-field-nested/views",
    getAdminMeta() {
      return {};
    }
  });
}

// 3-pair-field-json/index.ts
var import_types4 = require("@keystone-6/core/types");
var import_core4 = require("@keystone-6/core");
var PairInput3 = import_core4.graphql.inputObject({
  name: "PairJsonInput",
  fields: {
    left: import_core4.graphql.arg({ type: import_core4.graphql.String }),
    right: import_core4.graphql.arg({ type: import_core4.graphql.String })
  }
});
var PairOutput3 = import_core4.graphql.object()({
  name: "PairJsonOutput",
  fields: {
    left: import_core4.graphql.field({ type: import_core4.graphql.String }),
    right: import_core4.graphql.field({ type: import_core4.graphql.String })
  }
});
var PairFilter3 = import_core4.graphql.inputObject({
  name: "PairJsonFilter",
  fields: {
    equals: import_core4.graphql.arg({
      type: PairInput3
    })
  }
});
function pair3(config3 = {}) {
  function resolveInput(value) {
    const { left = null, right = null } = value ?? {};
    return JSON.stringify({ left, right });
  }
  function resolveOutput(value) {
    if (value === null)
      return { left: null, right: null };
    return JSON.parse(value);
  }
  function resolveWhere(value) {
    if (value === null) {
      throw new Error("PairFilter cannot be null");
    }
    if (value.equals === void 0) {
      return {};
    }
    const json = resolveInput(value.equals);
    return { equals: json };
  }
  return (meta) => (0, import_types4.fieldType)({
    kind: "scalar",
    mode: "optional",
    // we should use 'Json', but it's complicated with sqlite
    //   we are using String for the example
    scalar: "String"
  })({
    ...config3,
    input: {
      where: {
        arg: import_core4.graphql.arg({ type: PairFilter3 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveWhere(value);
        }
      },
      create: {
        arg: import_core4.graphql.arg({ type: PairInput3 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveInput(value);
        }
      },
      update: {
        arg: import_core4.graphql.arg({ type: PairInput3 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return resolveInput(value);
        }
      }
    },
    output: import_core4.graphql.field({
      type: PairOutput3,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve({ value, item }, args, context, info) {
        return resolveOutput(value);
      }
    }),
    views: "./3-pair-field-json/views",
    getAdminMeta() {
      return {};
    }
  });
}

// schema.ts
var lists = {
  User: (0, import_core5.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields2.text)({ validation: { isRequired: true } }),
      email: (0, import_fields2.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields2.password)({ validation: { isRequired: true } }),
      // posts: relationship({ ref: 'Post.author', many: true }),
      createdAt: (0, import_fields2.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Post: (0, import_core5.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields2.text)({ validation: { isRequired: true } }),
      // Stars 
      rating: stars({
        ui: {
          description: "A rating of star of 1 to 5"
        }
      }),
      pair: pair({
        ui: {
          description: "one string two database filed"
        }
      }),
      pairNested: pair2({
        ui: {
          description: "Two strings, two database string fields"
        }
      }),
      pairJson: pair3({
        ui: {
          description: "two string one database json field"
        }
      }),
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
  Virtual: (0, import_core5.list)({
    access: import_access.allowAll,
    fields: {
      content: (0, import_fields2.text)(),
      counts: (0, import_fields.virtual)({
        field: import_core5.graphql.field({
          type: import_core5.graphql.object()({
            name: "PostCounts",
            fields: {
              words: import_core5.graphql.field({ type: import_core5.graphql.Int }),
              sentences: import_core5.graphql.field({ type: import_core5.graphql.Int }),
              paragraphs: import_core5.graphql.field({ type: import_core5.graphql.Int })
            }
          }),
          resolve(item) {
            const content = item.content || "";
            return {
              words: content.split(" ").length,
              sentences: content.split(".").length,
              paragraphs: content.split("\n\n").length
            };
          }
        }),
        ui: { query: "{ words sentences paragraphs }" }
      })
    }
  }),
  Name: (0, import_core5.list)({
    access: import_access.allowAll,
    fields: {
      content: (0, import_fields2.text)(),
      author: (0, import_fields2.relationship)({ ref: "Author", many: false }),
      authorName: (0, import_fields.virtual)({
        field: import_core5.graphql.field({
          type: import_core5.graphql.String,
          async resolve(item, args, _context) {
            const context = _context;
            const { author } = await context.query.Post.findOne({
              where: { id: item.id.toString() },
              query: "author { name }"
            });
            return author && author.name;
          }
        })
      })
    }
  }),
  Author: (0, import_core5.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields2.text)({ validation: { isRequired: true } })
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
  sessionData: "name createdAt",
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
var keystone_default = withAuth(
  (0, import_core6.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session
  })
);
