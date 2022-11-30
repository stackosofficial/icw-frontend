import React from 'react';
import Head from 'next/head';
import '../styles/global.css';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-3SM1Y7P34B' });
  }, []);  

  return (<React.Fragment>
        <Head>
          <title>India Blockchain Week</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="India Blockchain Week is a week of various independently organised side events around major crypto events in India.
            Don't miss out and get updated on the latest major crypto events!"
            key="desc"
            />
        </Head>
    <Component {...pageProps} />
  </React.Fragment>)
}