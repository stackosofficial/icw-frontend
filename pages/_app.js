import '../styles/global.css'
import getConfig from 'next/config';

export default function App({ Component, pageProps }) {

  
  return <Component {...pageProps} />
}

App.getInitialProps = async (ctx) => {
  const {  publicRuntimeConfig } = getConfig()
  
  return {
    pageProps: {
      NEXT_PUBLIC_BE_URL: publicRuntimeConfig.NEXT_PUBLIC_BE_URL,
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    }

   }
}