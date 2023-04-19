import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import type { ServerConfig } from '@keystone-6/core/types';


export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: 'postgres://postgres:Satu@7890@localhost:5432/postgres',
    },
    lists,
    session,
    server: {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true,
      },
    },
  })
);
