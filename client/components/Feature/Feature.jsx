import * as React from 'react';
import styles from './feature.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

function Feature({ icon, title, text }) {

    return (
        <Box className={styles.featureWrap}>
            <Box className={styles.featureInfo} sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
            }}>
                <div className={styles.featureIcon}>
                    <Image src={icon} alt='feature-img' sx={{
                        width: '68px',
                        height: 'auto'
                    }}>

                    </Image>
                </div>
                <div className={styles.featureTexts}>
                    <Typography fontWeight={1000} sx={{
                        fontSize: { md: '20px' },
                        fontFamily: 'DM Sans, sans-serif',
                        color: 'white',
                        marginBottom: '10px'
                    }}>
                        {title}
                    </Typography>
                    <Typography sx={{
                        fontSize: { md: '16px' },
                        fontFamily: 'DM Sans, sans-serif',
                        color: 'white'
                    }}>
                        {text}
                    </Typography>
                </div>
            </Box>
        </Box>

    );
}
export default Feature;