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
import axios from 'axios';
import { useEffect, useState } from 'react';

const data = [
  {
      name: 'Bangalore Bitcoin meetup #7',
      link: 'www.meetup.com',
      venue: 'Bangalore, India',
      day: '22 Oct',
      from: '2.00 pm',
      to: '6.00 pm',
      status: 'W'
  },
  {
      name: 'ABGA Blockchain Gaming 2022 Day 1',
      venue: 'Hyderabad, India',
      link: 'form.typeform.com',
      day: '22 Oct',
      timing: '2.00 pm - 6.00 pm'
  },
  {
      name: 'Web3 Disrupt',
      venue: 'IBA Karachi, Pakistan',
      link: 'wev3disrupt.io',
      day: '22 Oct',
      timing: '2.00 pm - 6.00 pm'
  },
  {
      name: 'Supermeet Pune',
      venue: 'Chennai, India',
      link: 'web3conclave.com',
      day: '22 Oct',
      timing: '2.00 pm - 6.00 pm'
  },
];

export default function Home() {

  return (
    <div>
      <div className={utilStyles.backgroundImage}>
        <Image
          src={landscapePic}
          alt="Picture of landscape"
        />
      </div>
      <Navbar/>
      <Banner/>
      <About/>
      <Newsletter/>
      <EventTable/>
      <EventForm/>
      {/* <MediaPartners/> */}
      <Footer/>
    </div>
  )
}
