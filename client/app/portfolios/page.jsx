"use client";
import React, { useState } from 'react';
import styles from "./page.module.css";
import Head from 'next/head';
import DashboardHeader from '@/components/Header/Header';
import PortfoliosInfo from '@/components/Portfolios/PortfoliosInfo/PortfoliosInfo';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Portfolios() {
    const { user, error, isLoading } = useUser();
    const [open, setOpen] = useState(true);
    return (

        <main className={styles.main}>
            <Head>
                <link rel="icon" href='/favicon.ico' />
            </Head>
            {!isLoading && (
                <div className={styles.wrap}>
                    <DashboardHeader title={'My portfolios'} />
                    <Sidebar />
                    <PortfoliosInfo/>
                </div>
            )}
        </main>
    );
}
