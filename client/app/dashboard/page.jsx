"use client";
import React, { useState, } from 'react';

import styles from "./page.module.css";
import Head from 'next/head';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import DashboardInfo from '@/components/DashboardInfo/DashboardInfo';
import Footer from '@/components/Footer/Footer';
import BackDrop from '@/components/BackDrop/BackDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
    const { user, error, isLoading } = useUser();
    const [open, setOpen] = useState(true);

    return (

        <main className={styles.main}>
            <Head>
                <link rel="icon" href='/favicon.ico' />
            </Head>
            <BackDrop isloading={isLoading} open={open} setOpen={setOpen} />
            {!open && (
                <div className={styles.wrap}>
                    {/* <Header user={user} isLoading={isLoading} error={error} />
                    <Footer /> */}
                    <DashboardHeader/>
                    <Sidebar/>
                    <DashboardInfo/>
                </div>
            )}
        </main>
    );
}
