import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image'
import styles from './portfoliosinfo.module.css';
import MiniStats from './MiniStats';
import TotalPortfoliosInfo from './TotalPortfoliosInfo';
import MenuDeletePortfolio from '@/components/MenuDeletePortfolio/MenuDeletePortfolio'
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Collapse
} from '@mui/material';
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';;

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

function PortfolioRow({ portfolioData, handlePortfoliosChange }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const [portfolio, setPortfolio] = useState(portfolioData)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <TableRow
                key={portfolio.uuid}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& th': { color: 'white', fontFamily: 'DM Sans' },
                    '& td': { color: 'white', fontFamily: 'DM Sans' },
                }}
            >
                <TableCell component="th" scope="row" >
                    {portfolio.title}
                </TableCell>
                <TableCell align="right">{`${portfolio?.totalValue.toFixed(2)} ${portfolio['Currency']?.symbol}`}
                </TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                        <Box>
                            {`${portfolio?.dailyGain.toFixed(2)} ${portfolio['Currency']?.symbol}`}
                        </Box>
                        {!isNaN(portfolio?.dailyChangePercentage) &&
                            <Box sx={{
                                backgroundColor: (parseFloat(portfolio?.dailyChangePercentage) > 0) ? '#34B17F' : '#5D2626',
                                borderRadius: '5px',
                                padding: '0 3px',
                                marginLeft: '5px'
                            }}>{`${portfolio?.dailyChangePercentage} %`}
                            </Box>
                        }
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                        <Box>
                            {portfolio?.totalGain.toFixed(2)} {portfolio['Currency']?.symbol}
                        </Box>
                        {!isNaN(portfolio?.totalChangePercentage) &&
                            <Box sx={{
                                backgroundColor: (parseFloat(portfolio?.totalChangePercentage) > 0) ? '#34B17F' : '#5D2626',
                                borderRadius: '5px',
                                padding: '0 3px',
                                marginLeft: '5px'
                            }}>
                                {portfolio?.totalChangePercentage} %
                            </Box>}
                    </Box>

                </TableCell>
                <TableCell align="right">{portfolio?.totalInvested.toFixed(2)} {portfolio['Currency']?.symbol}</TableCell>
                <TableCell align="right">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{
                            color: 'white'
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
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
                        <MenuItem key={'renamePortfolio'} >
                            Rename portfolio
                        </MenuItem>
                        {/* <MenuItem key={'deletePortfolio'} >
                            Delete portfolio
                        </MenuItem> */}
                        {/* {options.map((option) => (
                            
                        ))} */}
                        <MenuDeletePortfolio portfolio={portfolio} handlePortfoliosChange={handlePortfoliosChange}/>
                    </Menu>
                </TableCell>
            </TableRow>
            <TableRow key={`${portfolio.uuid}-transactionsTable`}
                sx={{
                    '& th': { color: 'white' }, '& td': { color: 'white' },
                }}>
                <TableCell style={{ padding: 0, }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ marginTop: 0, marginBottom: 0, }}>
                            <Typography paddingLeft='10px' paddingTop='10px' variant="h6" fontFamily='DM Sans' gutterBottom component="div">
                                Transactions
                            </Typography>
                            <Table size="small" sx={{
                                // border: '1px solid',
                                // borderRadius: '5px',

                            }}>
                                <TableHead>
                                    <TableRow
                                        key={`${portfolio.uuid}-transactionsHead`}
                                        sx={{
                                            '& th': {
                                                color: 'white',
                                                fontSize: '12px',
                                                fontFamily: 'DM Sans',
                                                backgroundColor: 'black',
                                            },
                                        }}>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Total price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{
                                    '& th': {
                                        borderTop: '4px solid #1A1A1A',
                                    },
                                    '& td': {
                                        borderTop: '4px solid #1A1A1A',
                                    },

                                }}>
                                    {
                                        portfolio['Transactions'] && portfolio['Transactions'].map((el, index) =>
                                        (
                                            <TableRow key={`${index}`}>
                                                <TableCell component="th" scope="row">
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                        // fontSize: '18px',
                                                        // backgroundColor: (el.amount > 0) ? '#2F4020' : '#5D2626'
                                                    }}>
                                                        <Image alt='coinImg' width={30} height={30} src={el['Coin']?.image}>
                                                        </Image>
                                                        <Box sx={{
                                                            // backgroundColor: '#2F4020'
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            marginLeft: '10px'
                                                        }}>
                                                            <Typography sx={{
                                                                fontSize: '18px',
                                                            }}>
                                                                {`${(el.amount > 0) ? 'Buy' : 'Sell'} ${el['Coin']?.symbol.toUpperCase()}`}
                                                            </Typography>
                                                            <Typography sx={{
                                                                fontFamily: 'DM Sans',
                                                                fontSize: '12px',
                                                            }}>
                                                                {formatDate(el.date)}
                                                            </Typography>

                                                        </Box>
                                                    </Box>


                                                </TableCell>
                                                <TableCell
                                                >
                                                    <Box sx={{
                                                        color: (el.amount > 0) ? '#34B17F' : '#E85E5E'
                                                    }}>
                                                        {el.amount > 0 ? '+' : '-'}{el.amount} {el['Coin']?.symbol.toUpperCase()}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">{el.costPerUnitInCurrency} {portfolio['Currency']?.symbol}</TableCell>
                                                <TableCell align="right">
                                                    {(el.amount * el.costPerUnitInCurrency).toFixed(2)} {portfolio['Currency']?.symbol}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default PortfolioRow;