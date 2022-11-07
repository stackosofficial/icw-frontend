import Head from 'next/head';
import Image from 'next/image';
import About from '../components/about';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import EventForm from '../components/eventForm';
import EventLinkBar from '../components/eventLinkBar';
import Newsletter from '../components/newsletter';
import EventTable from '../components/eventTable';
import SignupBar from '../components/signupbar';
import MediaPartners from '../components/partners'
import Footer from '../components/footer';
import utilStyles from '../styles/utils.module.css';
import landscapePic from '../public/images/India_Crypto_Week_V2.0.png';




export default function Home({
    NEXT_PUBLIC_BE_URL,
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
   NEXT_PUBLIC_TELEGRAM_LINK,
   NEXT_PUBLIC_WHATSAPP_LINK
  }) {

  return (
    <div>
      <div className={utilStyles.backgroundImage}>
        {/* <Image
          src={landscapePic}
          fill={true}
          alt="Picture of landscape"
        /> */}
        <img
          src='images/India_Crypto_Week_V2.0.png'
          className='globalBackgroundImage'
        />
      </div>
      <Navbar/>
      <Banner/>
      <EventLinkBar/>
      <About/>
      <Newsletter
        siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}
        NEXT_PUBLIC_TELEGRAM_LINK={NEXT_PUBLIC_TELEGRAM_LINK}
        NEXT_PUBLIC_WHATSAPP_LINK={NEXT_PUBLIC_WHATSAPP_LINK}
        />
      <EventTable NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}/>
      <EventForm siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY} NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}/>
      {/* <MediaPartners/> */}
      <Footer/>
    </div>
  )
}
