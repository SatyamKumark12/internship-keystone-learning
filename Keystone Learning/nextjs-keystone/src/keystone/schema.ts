import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password ,text , timestamp , relationship } from '@keystone-6/core/fields';
import type { Lists } from '.keystone/types';
import { document } from '@keystone-6/fields-document';

export const lists: Lists = {
  User: list({
    // WARNING
    //   for this example, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password({ validation: { isRequired: true } }),
      about: text(),
      // posts: relationship({ ref: 'Post.author', many: true }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      title: text(),
      publishedAt: timestamp(),
      // author: relationship({
      //   ref: 'User.posts',
      //   ui: {
      //     displayMode: 'cards',
      //     cardFields: ['name', 'email'],
      //     inlineEdit: { fields: ['name', 'email'] },
      //     linkToItem: true,
      //     inlineCreate: { fields: ['name', 'email'] },
      //   },
      // }),

      authors: relationship({ ref: 'User', many: true, }),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      }),
    },
  }),
};
