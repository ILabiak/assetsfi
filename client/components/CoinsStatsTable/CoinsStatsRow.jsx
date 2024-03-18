import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image'
import styles from './coinsstatstable.module.css';
import TotalPortfoliosInfo from '../TotalPortfolioInfo/TotalPortfoliosInfo';
import MenuDeletePortfolio from '@/components/MenuDeletePortfolio/MenuDeletePortfolio'
import MenuChangePortfolio from '@/components/MenuChangePortfolio/MenuChangePortfolio'
import {
    Typography, Box, Table, TableCell, TableRow
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';;


function CoinsStatsRow({ coinData, currency, handlePortfoliosChange }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const [coin, setCoin] = useState(coinData)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <TableRow
                key={coin.id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& th': { color: 'white', fontFamily: 'DM Sans' },
                    '& td': { color: 'white', fontFamily: 'DM Sans' },
                }}
            >
                <TableCell component="th" scope="row" >
                    <Box className={styles.coinInfo}>
                        <Image alt='coinImg' width={30} height={30} src={coin?.image} />
                        <Typography ml={'10px'}>
                            {coin.name}
                        </Typography>

                    </Box>

                </TableCell>
                <TableCell align="right">
                    {`${coin?.totalValue.toFixed(2)} ${currency?.symbol}`}
                </TableCell>
                <TableCell align="right">
                    {`${parseFloat(coin?.amount.toFixed(5))} ${coin?.symbol.toUpperCase()}`}
                </TableCell>
                <TableCell align="right">
                    {`${coin?.price.toFixed(2)} ${currency?.symbol}`}
                </TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                        <Box>
                            {`${coin?.dailyChange.toFixed(2)} ${currency?.symbol}`}
                        </Box>
                        {!isNaN(coin?.dailyChangePercentage) &&
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
                            {coin?.totalChange.toFixed(2)} {currency?.symbol}
                        </Box>
                        {!isNaN(coin?.totalChangePercentage) &&
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
                <TableCell align="right">{coin?.totalInvested.toFixed(2)} {currency?.symbol}</TableCell>
                {/* <TableCell align="right">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={menuOpen ? 'long-menu' : undefined}
                        aria-expanded={menuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        sx={{
                            color: 'white'
                        }}
                        onClick={handleMenuClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="portfolio-menu"
                        sx={{
                            mt: '-30px',
                            ml: '-60px',
                            '& .MuiPaper-root': {
                                backgroundColor: '#000000',
                                border: '1px solid white',
                                borderRadius: '10px',
                                color: 'white',
                                padding: '0px',
                            },
                            '& .MuiMenuItem-root': {
                                ml: '5px',
                                mr: '5px',
                                '&:hover': {
                                    backgroundColor: "#34B17F",
                                    borderRadius: '5px',
                                },
                            },
                        }}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={menuOpen}
                        onClose={handleMenuClose}
                    >
                    </Menu>
                </TableCell> */}
            </TableRow>
        </Fragment>
    );
}

export default CoinsStatsRow;