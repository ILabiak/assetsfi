import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image'
import styles from './transactiontable.module.css';
import TotalPortfoliosInfo from '../TotalPortfolioInfo/TotalPortfoliosInfo';
import MenuChangeTransaction from '@/components/MenuChangeTransaction/MenuChangeTransaction'
import MenuDeleteTransaction from '@/components/MenuDeleteTransaction/MenuDeleteTransaction'
import {
    Typography, Box, Table, TableCell, TableRow
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function formatDate(dateString) {
    const date = new Date(dateString);

    // Format the day
    const day = date.getDate();

    // Get the month name
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[date.getMonth()];

    // Format the year
    const year = date.getFullYear();

    // Construct the formatted date string
    const formattedDate = `${day} ${monthName}, ${year}`;

    return formattedDate;
}


function TransactionRow({ transactionData, currency, handleTransactionsChange, valuesHidden }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const [transaction, setTransaction] = useState(transactionData)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <TableRow
                key={transaction.id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& th': { color: 'white', fontFamily: 'DM Sans' },
                    '& td': { color: 'white', fontFamily: 'DM Sans' },
                }}
            >
                <TableCell component="th" scope="row">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image alt='coinImg' width={30} height={30} src={transaction['Coin']?.image}>
                        </Image>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '10px'
                        }}>
                            <Typography sx={{
                                fontSize: '18px',
                            }}>
                                {`${(transaction.amount > 0) ? 'Buy' : 'Sell'} ${transaction['Coin']?.symbol.toUpperCase()}`}
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'DM Sans',
                                fontSize: '12px',
                            }}>
                                {formatDate(transaction.date)}
                            </Typography>

                        </Box>
                    </Box>


                </TableCell>
                <TableCell>
                    <Box sx={{
                        color: (transaction.amount > 0) ? '#34B17F' : '#E85E5E'
                    }}>
                        {valuesHidden || transaction.amount === undefined || transaction.amount === null ? '***' : (transaction.amount > 0 ? '+' : '') + transaction.amount + ' ' + (transaction['Coin']?.symbol?.toUpperCase() ?? '***')}
                    </Box>
                </TableCell>

                <TableCell align="right">{valuesHidden ? '***' :
                    `${transaction.fees} ${currency?.symbol}`}
                </TableCell
                >
                <TableCell align="right">{valuesHidden ? '***' :
                    `${transaction.costPerUnitInCurrency} ${currency?.symbol}`}
                </TableCell>

                <TableCell align="right">
                    {valuesHidden ? '***' :
                        `${(transaction.amount * transaction.costPerUnitInCurrency).toFixed(2)} ${currency?.symbol}`}

                </TableCell>
                <TableCell align="right">
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
                        <MenuChangeTransaction transaction={transaction} currency={currency} handleTransactionsChange={handleTransactionsChange} />
                        <MenuDeleteTransaction transaction={transaction} handleTransactionsChange={handleTransactionsChange} />
                    </Menu>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default TransactionRow;