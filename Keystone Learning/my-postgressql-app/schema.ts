import { config, graphql, list } from '@keystone-6/core';
import { virtual } from '@keystone-6/core/fields';
import { Context } from '.keystone/types';


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
import { stars } from "./2-stars-field";
import { pair } from './3-pair-field';
import {pair as pairNested} from './3-pair-field-nested';
import { pair as pairJson } from './3-pair-field-json';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),
      // posts: relationship({ ref: 'Post.author', many: true }),

      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),

      // Stars 

      rating: stars({
        ui:{
          description:'A rating of star of 1 to 5'
        }
      }),

      pair: pair({
        ui:{
          description:'one string two database filed'
        }
      }),
      pairNested: pairNested({
        ui: {
          description: 'Two strings, two database string fields',
        },
      }),
      pairJson : pairJson({
        ui:{
          description:'two string one database json field'
        }
      }),


      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
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

  Virtual: list({
    access: allowAll,
    fields: {
      content: text(),
      counts: virtual({
        field: graphql.field({
          type: graphql.object<{
            words: number;
            sentences: number;
            paragraphs: number;
          }>()({
            name: 'PostCounts',
            fields: {
              words: graphql.field({ type: graphql.Int }),
              sentences: graphql.field({ type: graphql.Int }),
              paragraphs: graphql.field({ type: graphql.Int }),
            },
          }),
          resolve(item: any) {
            const content = item.content || '';
            return {
              words: content.split(' ').length,
              sentences: content.split('.').length,
              paragraphs: content.split('\n\n').length,
            };
          },
        }),
        ui: { query: '{ words sentences paragraphs }' },
      }),
    },
  }),


  Name: list({
    access: allowAll,
    fields: {
      content: text(),
      author: relationship({ ref: 'Author', many: false }),
      authorName: virtual({
        field: graphql.field({
          type: graphql.String,
          async resolve(item, args, _context) {
            const context = _context as Context;
            const { author } = await context.query.Post.findOne({
              where: { id: item.id.toString() },
              query: 'author { name }',
            });
            return author && author.name;
          },
        }),
      }),
    },
  }),
  Author: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
    },
  }),
  

};
