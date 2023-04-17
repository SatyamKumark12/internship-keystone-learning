import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  checkbox,
  integer
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';
import { image } from '@keystone-6/core/fields';


// type Session = {
//   data: {
//     id: string;
//     isAdmin: boolean;
//   }
// }

type PersonData = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type Session = {
  data:{
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  }
};

// Validate there is a user with a valid session
const isUser = ({ session }: { session: Session }) =>
  !!session?.data.id;

// Validate the current user is an Admin
const isAdmin = ({ session }: { session: Session }) =>
  session?.data.isAdmin;

// Validate the current user is updating themselves
const isPerson = ({ session, item }: { session: Session, item: PersonData }) =>
  session?.data.id === item.id;

// Validate the current user is an Admin, or updating themselves
const isAdminOrPerson = ({ session, item }: { session: Session, item: PersonData }) =>
  isAdmin({ session }) || isPerson({ session, item });



// const isAdmin = ({ session }: { session: Session | undefined }) => {
//   // if the user is an Admin, they can access all the records
//   console.log(session);
//   if(!session) return false;
  
//   if (session?.data.isAdmin) return true;
//   // otherwise, filter for published posts
//   return false;
// }




export const lists: Lists = {
  User: list({
    access: {
      operation: {
        create: isAdmin,
        delete: isAdmin,
      },
      item: {
        update: isAdminOrPerson,
      },
    },
    fields: {
      // name: text({ validation: { isRequired: true } }),
      name: text(),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',access: {
          read: isAdminOrPerson,
        }
      }),
      password: password({ access: {
        // Note: password fields never reveal their value, only whether a value exists
        read: isAdminOrPerson,
        update: isPerson,
      }}),
      isAdmin: checkbox({ access: {
        read: isUser,
        update: isAdmin,
      }}),
      posts: relationship({ ref: 'Post.author', many: true }),
      // isAdmin: checkbox(),
      

      // Two Sided 
    
      // One to One

      // post: relationship({ ref: 'Post.author', many: false }),

      // One to Many

      // posts: relationship({ref: 'Post.author', many: true }),

      // Many to Many

      // posts: relationship({ ref: 'Post.authors', many: true }),


      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
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
      // title: text(),
      //   content: text(),
      // author: relationship({ ref: 'User', many: true }),

      // One to One

      // author: relationship({ ref: 'User.post', many: false }),

      // One to Many

      // author: relationship({ ref: 'User.posts', many: false }),

      // Many to Many

      // authors: relationship({ ref: 'User.posts', many: true }),

      


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

  Counter: list({
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
