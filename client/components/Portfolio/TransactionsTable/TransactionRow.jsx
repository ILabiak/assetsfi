import React, { useState, Fragment } from 'react';
import Image from 'next/image'
import MenuChangeTransaction from '@/components/Portfolio/MenuChangeTransaction/MenuChangeTransaction'
import MenuDeleteTransaction from '@/components/Portfolio/MenuDeleteTransaction/MenuDeleteTransaction'
import {
    Typography, Box, TableCell, TableRow
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
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
            <TableRow key={transaction.id} variant='defaultItem'>
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
                        variant='defaultMenu'
                        sx={{
                            mt: '-30px',
                            ml: '-60px',
                            '& .MuiMenuItem-root': {
                                ml: '5px',
                                mr: '5px',
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