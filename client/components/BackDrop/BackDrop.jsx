"use client";
import React, { useEffect } from 'react';

import styles from "./backdrop.module.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackDrop({ isLoading, open, setOpen, delay }) {
    
    useEffect(() => {
        let timeoutId;
        if (!isLoading) {
            timeoutId = setTimeout(() => {
                setOpen(false);
            }, delay);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isLoading]);


    return (

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)' }}
            open={open}
            // transitionDuration={2000}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}



