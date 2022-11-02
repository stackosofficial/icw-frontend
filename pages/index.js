import Head from 'next/head';
import Image from 'next/image';
import About from '../components/about';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import EventForm from '../components/eventForm';
import Newsletter from '../components/newsletter';
import EventTable from '../components/eventTable';
import MediaPartners from '../components/partners'
import Footer from '../components/footer';
import utilStyles from '../styles/utils.module.css';
import landscapePic from '../public/images/retrolandscape.webp';




export default function Home({NEXT_PUBLIC_BE_URL, NEXT_PUBLIC_RECAPTCHA_SITE_KEY}) {


  return (
    <div>
      <div className={utilStyles.backgroundImage}>
        <Image
          src={landscapePic}
          fill={true}
          alt="Picture of landscape"
        />
      </div>
      <Navbar/>
      <Banner/>
      <About/>
      <Newsletter siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY} NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}/>
      <EventTable NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}/>
      <EventForm siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY} NEXT_PUBLIC_BE_URL={NEXT_PUBLIC_BE_URL}/>
      {/* <MediaPartners/> */}
      <Footer/>
    </div>
  )
}
