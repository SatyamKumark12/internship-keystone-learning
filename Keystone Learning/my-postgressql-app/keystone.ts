import { config } from '@keystone-6/core';
import { lists } from './schema';
import type { DatabaseConfig } from '@keystone-6/core/types';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
  })
);
