import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  checkbox,
  integer,
  image,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';

type Session = {
  data: {
    id: string;
    isAdmin: boolean;
  }
}

const isAdmin = ({ session }: { session: Session | undefined }) => {
  // if the user is an Admin, they can access all the records
  console.log(session);
  if(!session) return false;
  
  if (session?.data.isAdmin) return true;
  // otherwise, filter for published posts
  return false;
}

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

      isAdmin: checkbox(),
    },
     ui:{
      listView:{
        initialColumns : ['name' , 'email' , 'isAdmin'],
      },
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
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

  Company: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      year: timestamp({ validation: { isRequired: true } }),
      phone: relationship({ ref: "Phone.company", many: true }),
    },
  }),
  
  Phone: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      company: relationship({ ref: "Company.phone", many: false }),
      document: document({
        formatting: {
          alignment: {
            center: true,
            end: true,
          },
          blockTypes: {
            blockquote: true,
          },
          inlineMarks: {
            bold: true,
            italic: true,
            underline: true,
          },
          headingLevels: [1, 2, 3],
          listTypes: {
            ordered: true,
            unordered: true,
          },
        },
        links: true,
        layouts: [],
        dividers: true,
      }),
    },
  }),


  Product: list({
    access: {
      operation: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    fields: {
      Product: text({ validation: { isRequired: true } }),
      Description: text({ validation: { isRequired: true } }),
      Price: integer({ validation: { isRequired: true } }),
      Image: image({ storage: "my_local_images" }),
     },
    hooks: {
      validateInput: ({ resolvedData, addValidationError }) => {
        const { title } = resolvedData;
        if (title === '') {
          // We call addValidationError to indicate an invalid value.
          addValidationError('The title of a blog post cannot be the empty string');
        }
      }
    },
  }),


};

