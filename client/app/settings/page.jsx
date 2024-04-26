"use client";
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Head from 'next/head';
import DashboardHeader from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import UserSettings from '@/components/UserSettings/UserSettings'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useCookies } from 'react-cookie';


export default function Settings() {
    const { user, error, isLoading } = useUser();
    const [open, setOpen] = useState(true);
    return (

        <main className={styles.main}>
            <Head>
                <link rel="icon" href='/favicon.ico' />
            </Head>
            {!isLoading && (
                <div className={styles.wrap}>
                    <DashboardHeader title={'Settings'} />
                    <Sidebar />
                    <UserSettings user={user} />
                </div>
            )}
        </main>
    );
}
