import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import type { ServerConfig } from '@keystone-6/core/types';

const {

  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000",
  
  } = process.env;



export default withAuth(
  config({
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
    server: {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true,
      },
    },
  })
);
