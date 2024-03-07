import * as React from 'react';
import styles from './mainfeatures.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Feature from '@/components/Feature/Feature';

import featureIcon from '@/public/featureicon.svg';

import Image from 'next/image';


function MainFeatures() {

    return (
        <Box className={styles.main}>
            <Box sx={{ width: '100vw' }} className={styles.featuresContainer}>
                <Box className={styles.featuresWrap} sx={{
                    marginLeft: { xs: '20px', md: '100px' },
                    marginRight: { xs: '20px', md: '100px' }
                }}>
                    <Typography sx={{
                        fontSize: { xs: '40px', md: '68px' },
                        fontFamily: 'DM Sans',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        Main Features
                    </Typography>
                    <Grid container spacing={5} columnSpacing={5}>
                        <Grid item xs={12} md={6}>
                            <Feature icon={featureIcon} title={'OPEN SOURCE'} 
                            text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.'}></Feature>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Feature icon={featureIcon} title={'FREE TO USE'} 
                            text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.'}></Feature>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Feature icon={featureIcon} title={'100+ ASSETS SUPPORTED'} 
                            text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.'}></Feature>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Feature icon={featureIcon} title={'TRANSPARENT'} 
                            text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.'}></Feature>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </Box>
    );
}
export default MainFeatures;