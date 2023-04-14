import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text , password , timestamp , relationship , select , image , file} from '@keystone-6/core/fields';
import { withAuth, session } from './auth';
import { document } from '@keystone-6/fields-document';
import type { StorageConfig } from '@keystone-6/core/types';

const lists = {

    User: list({
    access: allowAll,
    fields: {
    name: text(),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    
    //       password: password({ validation: { isRequired: true } }),
    // One Sided relationships

    posts: relationship({ ref: 'Post.author', many: true }),
    
    password: password({ validation: { isRequired: true } }),

     },
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

    Post: list({
        access : allowAll,
        fields: {
          title: text(),
          publishedAt: timestamp(),
          status: select({
            options: [
              { label: 'Published', value: 'published' },
              { label: 'Draft', value: 'draft' },
            ],
            defaultValue: 'draft',
            ui: { displayMode: 'segmented-control' },
          }),
          author: relationship({
            ref: 'User.posts',
            ui: {
              displayMode: 'cards',
              cardFields: ['name', 'email'],
              inlineEdit: { fields: ['name', 'email'] }, 
              linkToItem: true,
              inlineCreate: { fields: ['name', 'email'] },
            },
          }),
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

// Image
 
Image: image({ storage: "my_local_images" }),

        },
        
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

        AfterOperation: list({
          access: allowAll,
          fields: {
            name: text(),
            email: text(),
           },
          hooks: {
            afterOperation: ({ operation, item }) => {
              if (operation === 'create') {
                console.log(`New user created. Name: ${item.name}, Email: ${item.email}`);
              }
            }
          },
        }),


        // Update User

      ResolveHook: list({
        access: allowAll,
        fields: {
          title: text({ validation: { isRequired: true } }),
          content: text({ validation: { isRequired: true } }),
         },
        hooks: {
          resolveInput: ({ resolvedData }) => {
            console.log(resolvedData);
            
            const { title } = resolvedData;
            if (title) {
              return {
                ...resolvedData,
                title: title[0].toUpperCase() + title.slice(1)
              }
            }
            return resolvedData;
          }
        },
      }),

      // Validate Input

      ValidateInput: list({
        access: allowAll,
        fields: {
          title: text({ validation: { isRequired: true } }),
          content: text({ validation: { isRequired: true } }),
         },
        hooks: {
          validateInput: ({ resolvedData, addValidationError }) => {
            const { title } = resolvedData;
            console.log(resolvedData);
            
            if (title === '') {
              // We call addValidationError to indicate an invalid value.
              addValidationError('The title of a blog post cannot be the empty string');
              
            }
          }
        },
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

    Filed: list({
      access: allowAll,
      fields: {
        name: text(),
        email: text({
          validation: { isRequired: true },
          hooks: {
            validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
              const email = resolvedData[fieldKey];
              if (email !== undefined && email !== null && !email.includes('@')) {
                addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
              }
            },
          },
        }),
       },
    }),

   

    
    
    
}

const {

  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000",
  
  } = process.env;




export default config(
    withAuth({
  db: {
    provider: 'postgresql',
    url: 'postgres://postgres:Satu@7890@localhost:5432/postgres',
  },
  lists,
  storage: {

    my_local_images: {
      kind: "local",  
      type: "image",  
      generateUrl: (path) => `http://localhost:3000/images${path}`,    
      serverRoute: {
      path: "/images",
    }, 
    storagePath: "public/images",
    },
    
    },
  session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
  
})
);