"use client";
import React, { useState, } from 'react';
import styles from "./page.module.css";
import Head from 'next/head';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import Footer from '@/components/Footer/Footer';
import BackDrop from '@/components/BackDrop/BackDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Portfolio() {
    const { user, error, isLoading } = useUser();
    const [open, setOpen] = useState(true);

    return (

        <main className={styles.main}>
            <Head>
                <link rel="icon" href='/favicon.ico' />
                <meta name="theme-color" content="#1A1A1A"></meta>
            </Head>
            {/* <BackDrop isloading={isLoading} open={open} setOpen={setOpen} delay={500} /> */}
            {!isLoading && (
                <div className={styles.wrap}>
                    <DashboardHeader title={'Portfolios'} />
                    <Sidebar />
                </div>
            )}
        </main>
    );
}
