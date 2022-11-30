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
import landscapePic from '../public/images/India_Crypto_Week_V3.0.png';
import EventTimeline from '../components/eventTimeline';
import { sortEvents } from '../components/common';
import axios from 'axios';

export async function getStaticProps()
{
  const env = {
    NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL_EXTERNAL || '',
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    NEXT_PUBLIC_TELEGRAM_LINK: process.env.NEXT_PUBLIC_TELEGRAM_LINK || '',
    NEXT_PUBLIC_WHATSAPP_LINK: process.env.NEXT_PUBLIC_WHATSAPP_LINK || '',
  };

  var eventList = [];
  if(process.env.NEXT_PUBLIC_BE_URL_INTERNAL) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BE_URL_INTERNAL}/users`);
      eventList = sortEvents(res.data);
    }
    catch(err) {
      console.error(err);
    }
  }

  return {
    props: {
      ...env,
      eventList
    },
    revalidate: 10
  }
}

const googleScript = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NM1BGZ5S64');
}

export default function Home({
    eventList,
    NEXT_PUBLIC_BE_URL,
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
   NEXT_PUBLIC_TELEGRAM_LINK,
   NEXT_PUBLIC_WHATSAPP_LINK
  }) {

  return (
    <div>

      <div className={utilStyles.backgroundImage}>
        <img
          src='images/India_Crypto_Week_V3.0.png'
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
      {/* <EventTimeline/> */}
      <EventTable NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL} propEventList={eventList}/>
      <EventForm siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY} NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}/>
      <MediaPartners NEXT_PUBLIC_WHATSAPP_LINK={NEXT_PUBLIC_WHATSAPP_LINK}/>
      <Footer/>
    </div>
  )
}
