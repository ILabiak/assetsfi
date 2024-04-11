import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, IconButton, CircularProgress, Tab } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Image from 'next/image';


function AddressInfo({ addressData, copyData, metadata }) {

    return (
        <Box className={styles.addressInfoContainer}>
            <Box className={styles.addressInfo}>
                <Box className={styles.networkInfo}>
                    <Image src={addressData['SupportedNetwork']?.logoUrl} width={50} height={50}></Image>
                    <Typography sx={{
                        fontFamily: 'DM Sans',
                        paddingLeft: '10px',
                        fontSize: '20px'
                    }}>
                        {addressData['SupportedNetwork'].name}
                    </Typography>
                </Box>
                <Box className={styles.walletWrap}>
                    <Typography sx={{
                        fontFamily: 'DM Sans',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>
                        Address
                    </Typography>
                    <Box className={styles.addresses}>
                        <Typography sx={{
                            fontFamily: 'DM Sans',
                            fontSize: '16px',
                            width: '90%',
                            color: '#A3A3A3',
                            wordBreak: 'break-all'
                        }}>
                            {addressData.address}
                        </Typography>
                        <IconButton
                            onClick={() => copyData(addressData.address)}
                            className={styles.copyButtonContainer}
                        >
                            <ContentCopyOutlinedIcon className={styles.copyButton} />
                        </IconButton>
                    </Box>
                </Box>
                <Box className={styles.progressInfo}>
                    <Typography sx={{
                        fontFamily: 'DM Sans',
                        fontSize: '20px',
                        fontWeight: '600',
                    }}>
                        Total donated
                    </Typography>
                    <Box className={styles.progressData}>
                        <Typography sx={{
                            fontFamily: 'DM Sans',
                            fontSize: '26px',
                            fontWeight: '600',
                            color: '#A3A3A3',
                        }}>
                            {addressData.targetAmount ? `${addressData.balance.toFixed(2)} / ${addressData.targetAmount} ${addressData['Currency'].symbol}`
                             : `${addressData.balance.toFixed(2)} ${addressData['Currency'].symbol}`}
                        </Typography>
                        {addressData.targetAmount && (
                            <Box>
                                <CircularProgressWithLabel value={addressData.balance/addressData.targetAmount * 100} />
                            </Box>
                        )}

                    </Box>


                </Box>
                {addressData.tokens.length > 0 && (
                    <Box className={styles.walletWrap} sx={{
                        marginBottom: '0px'
                    }}>
                        <Typography sx={{
                            fontFamily: 'DM Sans',
                            fontSize: '20px',
                            fontWeight: '600'
                        }}>
                            Tokens
                        </Typography>
                        {addressData.tokens.map(el => (
                            <TokenData token={el} currency={addressData['Currency']} metadata={metadata} />
                        ))}
                    </Box>
                )}


            </Box>


        </Box>
    );
}
export default AddressInfo;


function TokenData({ token, currency, metadata }) {
    return (
        <Box className={styles.tokenContainer}>
            <Box className={styles.tokenName}>
                <Image src={metadata[token.symbol][0]?.logo} width={30} height={30} />
                <Typography sx={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    width: '90%',
                    paddingLeft: '10px'
                }}>
                    {token.name}
                </Typography>
            </Box>

            <Box className={styles.balanceContainer}>
                <Typography sx={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    width: '90%',
                }}>
                    {`${token.tokens} ${token.symbol}`}
                </Typography>
                <Typography sx={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    width: '90%',
                    textAlign: 'right',
                    paddingRight: '10px'
                }}>
                    {`${parseFloat(token.balance).toFixed(2)} ${currency.symbol}`}
                </Typography>
            </Box>
        </Box>
    )
}

function CircularProgressWithLabel({ value }) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" size={'70px'} thickness={3} value={value} sx={{
                color: 'white',
                borderRadius: '50px',
                boxShadow: 'inset 0 0 0px 5px #A3A3A3'


            }} />
            <Box className={styles.center} >
                <Typography variant="caption" fontSize={'20px'} component="div" color="white">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}