import { config } from '@keystone-6/core';
import { lists } from './src/keystone/schema';
import { seedDemoData } from './src/keystone/seed';
import type { Context } from '.keystone/types';
import { withAuth, session } from './auth';


export default config( 
  withAuth({
  db: {
    provider: 'postgresql',
    url: 'postgres://postgres:Satu@7890@localhost:5432/keystone',
    // provider: 'sqlite',
    // url: `file:${process.cwd()}/keystone.db`,
     // next.js requires an absolute path for sqlite
    onConnect: async (context: Context) => {
      await seedDemoData(context);
    },

    // WARNING: this is only needed for our monorepo examples, dont do this
    prismaClientPath: 'node_modules/.myprisma/client',
  },
  lists,
  session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      cors: { origin: ['http://localhost:4000'], credentials: true },
      port: 3000,
    }
  })
);
