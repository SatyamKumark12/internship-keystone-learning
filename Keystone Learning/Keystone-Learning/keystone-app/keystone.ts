import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import {
  BaseListTypeInfo,
  FieldTypeFunc,
  CommonFieldConfig,
  fieldType,
  orderDirectionEnum,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

const {

  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000",
  
  } = process.env;

  export type MyIntFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
  };

export const myInt =
  <ListTypeInfo extends BaseListTypeInfo>({
    isIndexed,
    ...config
  }: MyIntFieldConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> =>
  meta =>
    fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'Int',
      index: isIndexed === true ? 'index' : isIndexed || undefined,
    })({
      ...config,
      input: {
        create: { arg: graphql.arg({ type: graphql.Int }) },
        update: { arg: graphql.arg({ type: graphql.Int }) },
        orderBy: { arg: graphql.arg({ type: orderDirectionEnum }) },
      },
      output: graphql.field({ type: graphql.Int }),
      views: './view',
    });




export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
    provider: 'postgresql',
    url: 'postgres://postgres:Satu@7890@localhost:5432/postgres',
    },
    lists,
    session,
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
  })
);
