"use client";
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Head from 'next/head';
import DashboardHeader from '@/components/Header/Header';
import BinanceData from '@/components/BinanceData/BinanceData';
import Footer from '@/components/HomePage/Footer/Footer';
import BackDrop from '@/components/BackDrop/BackDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useCookies } from 'react-cookie';


export default function Portfolios() {
    const { user, error, isLoading } = useUser();
    const [open, setOpen] = useState(true);
    return (

        <main className={styles.main}>
            <Head>
                <link rel="icon" href='/favicon.ico' />
            </Head>
            {/* <BackDrop isloading={isLoading} open={open} setOpen={setOpen} delay={500} /> */}
            {!isLoading && (
                <div className={styles.wrap}>
                    <DashboardHeader title={'Binance Assets'} />
                    <Sidebar />
                    <BinanceData/>
                </div>
            )}
        </main>
    );
}
