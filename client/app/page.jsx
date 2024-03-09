"use client";
import React, { useState, } from 'react';

import styles from "./page.module.css";
import Head from 'next/head';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import MacMockup from '@/components/MacMockup/MacMockup';
import BackDrop from '@/components/BackDrop/BackDrop';
import MainFeatures from '@/components/MainFeatures/MainFeatures';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [open, setOpen] = useState(true);

  return (

    <main className={styles.main}>
      <Head>
        <link rel="icon" href='/favicon.ico' />
      </Head>
      <BackDrop isloading={isLoading} open={open} setOpen={setOpen} delay={500} />
      {!open && (
        <div className={styles.wrap}>
          <Header user={user} isLoading={isLoading} error={error} />
          <MacMockup user={user} isLoading={isLoading} error={error} />
          <MainFeatures />
          <Footer />
        </div>
      )}

    </main>
  );
}
