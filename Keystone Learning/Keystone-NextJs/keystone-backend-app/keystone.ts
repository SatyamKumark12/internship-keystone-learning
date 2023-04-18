import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: 'postgres://postgres:Satu@7890@localhost:5432/postgres',
    },
    lists,
    session,
  })
);
