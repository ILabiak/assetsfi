import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image'
import styles from './donationsinfo.module.css';
import {
    Typography, Box, Table, TableCell, TableRow
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuDeleteDonation from '@/components/MenuDeleteDonation/MenuDeleteDonation'
import MenuChangeDonation from '@/components/MenuChangeDonation/MenuChangeDonation'

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
};


function DonationRow({ donation, valuesHidden, handleDonationsChange }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    // const [donation, setTransaction] = useState(donationData)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <TableRow
                key={donation.id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& th': { color: 'white', fontFamily: 'DM Sans' },
                    '& td': { color: 'white', fontFamily: 'DM Sans' },
                }}
            >
                <TableCell width={'30%'} component="th" scope="row">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image alt='coinImg' width={50} height={50} src={donation['Foundation']?.logoUrl || 'https://svgshare.com/i/14xY.svg'}>
                        </Image>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '10px'
                        }}>
                            <Typography sx={{
                                width: '150px'
                            }}>
                                {donation['Foundation']?.name || 'Other'}
                            </Typography>
                        </Box>
                    </Box>


                </TableCell>
                <TableCell width={'10%'} align="right" >
                    <Box sx={{
                        color: (donation.amount > 0) ? '#34B17F' : '#E85E5E'
                    }}>
                        {valuesHidden || donation.amount === undefined || donation.amount === null ? '***' : donation.amount + ' ' + (donation['Currency']?.symbol ?? '***')}
                    </Box>
                </TableCell>

                <TableCell width={'20%'} align="right" >{formatDate(donation.date)}
                </TableCell>
                <TableCell align="right" >
                    <Typography sx={{
                        // maxWidth: '20%'
                    }}>
                        {donation.description.length > 1 ?
                            (donation.description.length < 30) ? donation.description :
                                (donation.description.slice(0, 30) + '...') : ''}
                    </Typography>

                </TableCell>

                <TableCell width={'5%'} align="right" >
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
                        <MenuDeleteDonation donation={donation} handleDonationsChange={handleDonationsChange} />
                        <MenuChangeDonation donation={donation} handleDonationsChange={handleDonationsChange} />
                    </Menu>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default DonationRow;