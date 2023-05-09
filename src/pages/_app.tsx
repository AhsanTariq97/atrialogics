import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api.atrialogics.io/graphql',
    cache: new InMemoryCache(),
});

import { Lexend_Giga } from '@next/font/google';
const lexendGiga = Lexend_Giga({
  subsets: ['latin'],
  variable: '--font-lexend-giga',
});

import { IBM_Plex_Sans } from '@next/font/google';
const IBMPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-IBM',
});

import { Roboto } from '@next/font/google';
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

import { Raleway } from '@next/font/google';
const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <main className={`${lexendGiga.variable} ${IBMPlexSans.variable} ${roboto.variable} ${raleway.variable} font-giga`}>
        <Component {...pageProps}/>
      </main>
    </ApolloProvider>
  )
}
