import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';
import { image } from '@keystone-6/core/fields';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      // name: text({ validation: { isRequired: true } }),
      name: text(),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      // posts: relationship({ ref: 'Post.author', many: true }),

      // Two Sided 
    
      // One to One

      // post: relationship({ ref: 'Post.author', many: false }),

      // One to Many

      // posts: relationship({ref: 'Post.author', many: true }),

      // Many to Many

      posts: relationship({ ref: 'Post.authors', many: true }),


      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      // title: text({ validation: { isRequired: true } }),
      // content: document({
      //   formatting: true,
      //   layouts: [
      //     [1, 1],
      //     [1, 1, 1],
      //     [2, 1],
      //     [1, 2],
      //     [1, 2, 1],
      //   ],
      //   links: true,
      //   dividers: true,
      // }),
      title: text(),
        content: text(),
      // author: relationship({ ref: 'User', many: true }),

      // One to One

      // author: relationship({ ref: 'User.post', many: false }),

      // One to Many

      // author: relationship({ ref: 'User.posts', many: false }),

      // Many to Many

      authors: relationship({ ref: 'User.posts', many: true }),

      


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
    },
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
};
