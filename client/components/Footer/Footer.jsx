import * as React from 'react';
import styles from './feature.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import featureIcon from '@/public/featureicon.svg';

import Image from 'next/image';

function Feature({ icon, title, text }) {

    return (
        <Paper sx={{
            marginTop: 'calc(10% + 60px)',
            position: 'fixed',
            bottom: 0,
            width: '100%'
        }} component="footer" square variant="outlined">
            sdf
        </Paper>
    );
}
export default Feature;