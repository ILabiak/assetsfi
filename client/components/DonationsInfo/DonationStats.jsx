import React from 'react';
import styles from './donationsinfo.module.css';
import { Typography, Box, Grid } from '@mui/material';
import AddDonationButton from './AddDonationButton';
import Image from 'next/image'

function DonationStats({ handleDonationsChange, donations, foundations, currencies }) {
    return (
        <>
            <Box className={styles.statsContainer}>
                <Grid container columnSpacing={4} spacing={1}>
                    <MiniStat
                        title={'Favourite foundation'}
                        value={donations.favouriteFoundation.name}
                        image={donations.favouriteFoundation?.logoUrl}
                    />
                    <MiniStat
                        title={'Total donated'}
                        value={`${donations.totalDonated.toFixed(2)} $`}
                    />
                    <MiniStat
                        title={'Biggest donation'}
                        value={`${donations.biggestDonation.amount} ${donations.biggestDonation['Currency']?.symbol}`}
                    />
                </Grid>

            </Box>
            <Box className={styles.addButtonContainer}>
                <Box>
                    <AddDonationButton 
                    handleDonationsChange={handleDonationsChange} 
                    foundations={foundations}
                    currencies={currencies}
                    />
                </Box>
            </Box>
        </>
    );
}
export default DonationStats;

let typographyUpperStyle = {
    display: 'flex',
    fontFamily: 'DM Sans',
    fontSize: '16px',
    color: '#AEAEAE',
    textDecoration: 'none',
    alignItems: 'center'
}

let typographyLowerStyle = {
    fontFamily: 'DM Sans',
    fontWeight: 1000,
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none',
}

function MiniStat({ title, value, image }) {
    return (
        <Grid item xs={12} md={4}>
            <Box className={styles.miniStats} >
                <Box className={styles.upperText}>
                    <Typography sx={typographyUpperStyle}>
                        {title}
                    </Typography>
                </Box>
                <Box className={styles.lowerText}>
                    {image && (
                        <Image alt='foundationImg' width={50} height={0} style={{
                            height: 'auto',
                            minHeight: '50px',
                            marginRight: '20px'
                        }}
                            src={image || 'https://svgshare.com/i/14xY.svg'}
                        />
                    )}
                    <Typography sx={typographyLowerStyle}>
                        {value}
                    </Typography>
                </Box>
            </Box >
        </Grid>
    )
} 