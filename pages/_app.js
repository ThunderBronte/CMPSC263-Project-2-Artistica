import Head from 'next/head'    //use instead of head
import { StateContext } from "@/context/StateContext"
import { createGlobalStyle } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';

export const GlobalStyle = createGlobalStyle`
  * 
  {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>Purrfect Pals</title>
          <link rel="icon" type="image/x-icon" href="/PurrfectPals.png"></link>
          <meta name='description' content='Put a description here about your app'/>
          <meta name='robots' content='index, follow'/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon_package/site.webmanifest"/>
          
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossOrigin="anonymous"
          />

          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>

        <GlobalStyle />

      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </>
  )
}
