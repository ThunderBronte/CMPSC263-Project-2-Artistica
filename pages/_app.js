import Head from 'next/head'    //use instead of head
import { StateContext } from "@/context/StateContext"
import { createGlobalStyle } from 'styled-components'
import { ThirdwebProvider, metamaskWallet, 
  coinbaseWallet, walletConnect, localWallet, 
  embeddedWallet} from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

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
          <title>Artistica</title>
          <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
          <meta name='description' content='Put a description here about your app'/>
          <meta name='robots' content='index, follow'/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon_package/site.webmanifest"/>
          

          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>

        <GlobalStyle />

        {/* <StateContext>
          <ThirdwebProvider  
            
          >
          {/* <WithdrawModel />
          <InvestModel />
          <BotStatsModel /> 
          <Component {...pageProps} />
        </ThirdwebProvider>
      </StateContext> */}

      {/* <QueryClientProvider client={queryClient}> */}
        <StateContext>
          <ThirdwebProvider                                                               // Might need to change!!! - clientId
            activeChain="ethereum" //clientId="cc42b11c37e27d6f284c1fd4203573d1" 
            supportedWallets={[ metamaskWallet({ recommended: true }), coinbaseWallet(),walletConnect(),
              localWallet(), embeddedWallet({ auth: { options: ["email","google","apple","facebook",],},}),
            ]}
          >
          {/* <WithdrawModal />
          <InvestModal />
          <BotStatsModel /> */}
            <Component {...pageProps} /> 
          </ThirdwebProvider>
        </StateContext>
      {/* </QueryClientProvider> */}
    </>
  )
}


