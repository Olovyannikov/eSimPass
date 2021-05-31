import * as React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    
    return() {
        <Html>
        <Head>
            <link href="./client/resources/fonts.css" as='font' rel="stylesheet"/>
            <link rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    }
}
