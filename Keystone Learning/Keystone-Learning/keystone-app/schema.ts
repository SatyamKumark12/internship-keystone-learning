// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {

  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';


import { document } from '@keystone-6/fields-document';
import {text} from "./custom-fields/index"

import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({

    access: allowAll,

    fields: {
      
      name: text(),

      email: text({
        // validation: { isRequired: true },
       
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      posts: relationship({ ref: 'Post.author', many: true }),

      createdAt: timestamp({
       
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    access: allowAll,
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

    
      author: relationship({
       
        ref: 'User.posts',

        
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },

        many: false,
      }),

     
      tags: relationship({
       
        ref: 'Tag.posts',

        
        many: true,

       
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
    },
  }),

  
  Tag: list({
   
   
    access: allowAll,

 
    ui: {
      isHidden: true,
    },

   
    fields: {
      name: text(),
     
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),
};
