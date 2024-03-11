import React, { useState, useEffect, Fragment } from 'react';
import styles from './portfoliosinfo.module.css';
import MiniStats from './MiniStats';
import TotalPortfoliosInfo from './TotalPortfoliosInfo';
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function PortfolioRow({ portfolioData }) {
    const [open, setOpen] = useState(false);

    const [portfolio, setPortfolio] = useState({
        "id": 1,
        "uuid": "48995826-0d2e-40ed-97e2-4c14e710b84d", "userId": "google-oauth2|116450147994105467130",
        "title": "test", "currencyId": 1, "visibility": false,
        "createdAt": "2024-03-10T18:20:27.528Z", "updatedAt": "2024-03-10T18:20:54.638Z",
        "Currency": {
            "id": 1, "name": "USD", "code": "usd",
            "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z"
        }
    })

    return (
        <Fragment>
            <TableRow
                key={portfolio.uuid}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& th': { color: 'white', },
                    '& td': { color: 'white', },
                }}
            >
                <TableCell component="th" scope="row" >
                    {portfolio.title}
                </TableCell>
                <TableCell align="right">32 208,59 $</TableCell>
                <TableCell align="right">1 911,26 $	</TableCell>
                <TableCell align="right">12 316,04 $</TableCell>
                <TableCell align="right">20 286,26 $</TableCell>
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
                </TableCell>
            </TableRow>
            <TableRow sx={{
                '& th': { color: 'white' }, '& td': { color: 'white' },
            }}>
                <TableCell style={{ padding: 0, }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ marginTop: 0, marginBottom: 2, }}>
                            <Typography paddingLeft='10px' paddingTop='10px' variant="h6" gutterBottom component="div">
                                Transactions
                            </Typography>
                            <Table size="small" sx={{
                                // border: '1px solid',
                                // borderRadius: '5px',

                            }}>
                                <TableHead>
                                    <TableRow sx={{
                                        '& th': {
                                            color: 'white',
                                            fontSize: '12px',
                                            fontFamily: 'DM Sans',
                                            backgroundColor: 'black',
                                        },
                                    }}>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Coin</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={portfolio.uuid}>
                                        <TableCell component="th" scope="row">Sell 20.02.2024 </TableCell>
                                        <TableCell>Bitcoin</TableCell>
                                        <TableCell align="right">0.33</TableCell>
                                        <TableCell align="right">
                                            2342,34 $
                                        </TableCell>
                                    </TableRow>
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