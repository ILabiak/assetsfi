import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Link, IconButton, Paper, Tab } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import Image from 'next/image';


function FoundationInfo({ foundation, copyData }) {

    return (
        <Box key={foundation.orgName}>
            <Box className={styles.foundation}>
                <Box className={styles.foundationInfo}>
                    <Box className={styles.foundationName}>
                        <Box className={styles.imageWrap}>
                            <Image alt={foundation.orgName} src={foundation.orgLogo} width={120} height={0} style={{
                                height: '100%',
                                maxHeight: '90px'
                            }}></Image>
                        </Box>
                        <Typography sx={{
                            ml: '20px',
                            fontFamily: 'DM Sans',
                            fontSize: '20px',
                            fontWeight: '900'
                        }}>
                            {foundation.orgName}
                        </Typography>
                    </Box>
                    <Link sx={{
                        color: '#A3A3A3',
                        marginRight: '10px'
                    }}
                    href={foundation.link} target="_blank">
                        <LaunchIcon />
                    </Link>

                </Box>
                <Box className={styles.foundationWallets}>
                    {foundation.addresses.map((el, index) => (
                        <Box className={styles.walletWrap} key={index}>
                            <Typography sx={{
                                fontFamily: 'DM Sans',
                                fontSize: '20px',
                                fontWeight: '600'
                            }}>
                                {el.currencyType}
                            </Typography>
                            {el.walletAddresses.map((address, index) => (
                                <Box key={`address${index}`} className={styles.addresses}>
                                    <Typography sx={{
                                        fontFamily: 'DM Sans',
                                        fontSize: '16px',
                                        width: '90%',
                                        color: '#A3A3A3',
                                        wordBreak: 'break-all'
                                    }}>
                                        {address}
                                    </Typography>
                                    <IconButton
                                        onClick={() => copyData(address)}
                                        className={styles.copyButtonContainer}
                                    >
                                        <ContentCopyOutlinedIcon className={styles.copyButton} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
export default FoundationInfo;