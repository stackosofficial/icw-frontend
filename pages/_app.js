import '../styles/global.css'
import getConfig from 'next/config';

export default function App({ Component, pageProps }) {

  
  return <Component {...pageProps} />
}

App.getInitialProps = async () => {

  return {
    pageProps: {
      NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL,
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      NEXT_PUBLIC_TELEGRAM_LINK: process.env.NEXT_PUBLIC_TELEGRAM_LINK,
      NEXT_PUBLIC_WHATSAPP_LINK: process.env.NEXT_PUBLIC_WHATSAPP_LINK
    }
  }
}