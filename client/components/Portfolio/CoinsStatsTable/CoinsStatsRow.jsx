import React, { Fragment } from 'react';
import Image from 'next/image'
import styles from './coinsstatstable.module.css';
import {
    Typography, Box, TableCell, TableRow
} from '@mui/material';


function CoinsStatsRow({ coin, currency, handlePortfoliosChange, valuesHidden }) {
    return (
        <Fragment>
            <TableRow key={coin.id} variant='defaultItem'>
                <TableCell component="th" scope="row" >
                    <Box className={styles.coinInfo}>
                        <Image alt='coinImg' width={30} height={30} src={coin?.image} />
                        <Typography ml={'10px'}>
                            {coin.name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="right">
                    {valuesHidden ? '***' : `${coin?.totalValue.toFixed(2)} ${currency?.symbol}`}
                </TableCell>
                <TableCell align="right">
                    {valuesHidden ? '***' : `${parseFloat(coin?.amount.toFixed(5))} ${coin?.symbol.toUpperCase()}`}
                </TableCell>
                <TableCell align="right">
                    {valuesHidden ? '***' : `${coin?.price.toFixed(2)} ${currency?.symbol}`}
                </TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                        <Box>
                            {valuesHidden ? '***' : `${coin?.dailyChange.toFixed(2)} ${currency?.symbol}`}
                        </Box>
                        {!isNaN(coin?.dailyChangePercentage) && !valuesHidden &&
                            <Box sx={{
                                backgroundColor: (parseFloat(coin?.dailyChangePercentage) > 0) ? '#34B17F' : '#5D2626',
                                borderRadius: '5px',
                                padding: '0 3px',
                                marginLeft: '5px'
                            }}>{`${coin?.dailyChangePercentage} %`}
                            </Box>
                        }
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                        <Box>
                            {valuesHidden ? '***' : `${coin?.totalChange.toFixed(2)} ${currency?.symbol}`}
                        </Box>
                        {!isNaN(coin?.totalChangePercentage) && !valuesHidden &&
                            <Box sx={{
                                backgroundColor: (parseFloat(coin?.totalChangePercentage) > 0) ? '#34B17F' : '#5D2626',
                                borderRadius: '5px',
                                padding: '0 3px',
                                marginLeft: '5px'
                            }}>
                                {coin?.totalChangePercentage} %
                            </Box>}
                    </Box>
                </TableCell>
                <TableCell align="right">{valuesHidden ? '***' : `${coin?.totalInvested.toFixed(2)} ${currency?.symbol}`}</TableCell>
            </TableRow>
        </Fragment>
    );
}

export default CoinsStatsRow;