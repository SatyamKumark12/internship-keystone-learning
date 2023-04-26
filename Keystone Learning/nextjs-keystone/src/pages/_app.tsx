import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../util/request'
import Layout from '../../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
   <ApolloProvider client={client}>
     <Layout>
      <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  </>

}

export default MyApp;
