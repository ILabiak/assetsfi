"use client";

import styles from "./page.module.css";
import Head from 'next/head';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import MacMockup from '@/components/MacMockup/MacMockup';
import MainFeatures from '@/components/MainFeatures/MainFeatures';

export default function Home() {
  return (

    <main className={styles.main}>
      <Head>
        <link rel="icon" href='/favicon.ico' />
      </Head>
      <Header />
      <MacMockup />
      <MainFeatures />
      <Footer/>
    </main>
  );
}
