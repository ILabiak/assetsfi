import React, { useState, useEffect } from 'react';
import styles from './portfoliosinfo.module.css';
import MiniStats from './MiniStats';
import TotalPortfoliosInfo from './TotalPortfoliosInfo';
import PortfolioRow from './PortfolioRow';
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


function PortfoliosList({ portfoliosData }) {
    const [open, setOpen] = useState(false);

    const [portfolios, setPortfolios] = useState([{
        "id": 1,
        "uuid": "48995826-0d2e-40ed-97e2-4c14e710b84d", "userId": "google-oauth2|116450147994105467130",
        "title": "test", "currencyId": 1, "visibility": false,
        "createdAt": "2024-03-10T18:20:27.528Z", "updatedAt": "2024-03-10T18:20:54.638Z",
        "Currency": {
            "id": 1, "name": "USD", "code": "usd",
            "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z"
        }
    },
    {
        "id": 2,
        "uuid": "48995826-0d2e-40ed-97e2-4c14e710b2344d", "userId": "google-oauth2|116450147994105467130",
        "title": "Portfolio2", "currencyId": 1, "visibility": false,
        "createdAt": "2024-03-10T18:20:27.528Z", "updatedAt": "2024-03-10T18:20:54.638Z",
        "Currency": {
            "id": 1, "name": "USD", "code": "usd",
            "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z"
        }
    },
    {
        "id": 2,
        "uuid": "48995826-0d2e-40ed-97e2-4c14e710b2344d", "userId": "google-oauth2|116450147994105467130",
        "title": "Portfolio2", "currencyId": 1, "visibility": false,
        "createdAt": "2024-03-10T18:20:27.528Z", "updatedAt": "2024-03-10T18:20:54.638Z",
        "Currency": {
            "id": 1, "name": "USD", "code": "usd",
            "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z"
        }
    }])

    return (
        <Box className={styles.portfoliosListContainer}>
            <TableContainer sx={{
                borderRadius: '5px'
            }}>
                <Table stickyHeader sx={{
                    minWidth: 650,
                    borderCollapse: "separate",
                    borderSpacing: "0px 10px",
                }} aria-label="portfolios table">
                    <TableHead sx={{
                        '& th': {
                            borderBottom: 'none',
                        },
                        '& td': {
                            borderBottom: 'none',
                        },
                        "& .MuiTableRow-root th:first-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root th:last-child": {
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                        },
                    }} >
                        <TableRow sx={{
                            '& th': {
                                color: 'white',
                                fontSize: '12px',
                                fontFamily: 'DM Sans',
                                backgroundColor: 'black',
                            },

                        }}>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Total value</TableCell>
                            <TableCell align="right">24H change</TableCell>
                            <TableCell align="right">Total change</TableCell>
                            <TableCell align="right">Total invested</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        borderRadius: '10px',
                        '& th': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
                        },
                        '& td': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
                            // paddingBottom: '10px'
                        },
                        "& .MuiTableRow-root th:first-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root th:last-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root td:first-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root td:last-child": {
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                        },
                    }}>
                        {portfolios.map((el) => (
                            // <TableRow
                            //     key={el.uuid}
                            //     sx={{
                            //         '&:last-child td, &:last-child th': { border: 0 },
                            //         '& th': { color: 'white' }, '& td': { color: 'white' }
                            //     }}
                            // >
                            //     <TableCell component="th" scope="row">
                            //         {el.title}
                            //     </TableCell>
                            //     <TableCell align="right">32 208,59 $</TableCell>
                            //     <TableCell align="right">1 911,26 $	</TableCell>
                            //     <TableCell align="right">12 316,04 $</TableCell>
                            //     <TableCell align="right">20 286,26 $</TableCell>
                            //     <TableCell align="right">
                            //     <IconButton
                            //             aria-label="expand row"
                            //             size="small"
                            //             sx={{
                            //                 color: 'white'
                            //             }}
                            //             onClick={() => setOpen(!open)}
                            //         >
                            //             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            //         </IconButton>
                            //     </TableCell>
                            // </TableRow>
                            <PortfolioRow portfolioData={el} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default PortfoliosList;