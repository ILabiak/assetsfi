import React, { useState, useEffect } from 'react';
import styles from './binanceassetstable.module.css';
import BinanceAssetsRow from './BinanceAssetsRow'
// import PortfolioRow from './PortfolioRow';
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Collapse
} from '@mui/material';


function BinanceAssetsTable({ binanceAssets, handlePortfoliosChange }) {
    // const [open, setOpen] = useState(false);
    // const [binanceAssetsData, setBinanceAssetsData] = useState(binanceAssets)

    return (
        <Box className={styles.coinStatsContainer}>
            <TableContainer sx={{
                borderRadius: '5px'
            }}>
                <Table stickyHeader sx={{
                    minWidth: 650,
                    borderCollapse: "separate",
                    borderSpacing: "0px 10px",
                }} aria-label="binanceAssets table">
                    <TableHead sx={{
                        '& th': {
                            borderBottom: 'none',
                        },
                        '& td': {
                            borderBottom: 'none',
                        },
                        "& .MuiTableRow-root th:first-of-type": {
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
                                color: '#AEAEAE',
                                fontSize: '12px',
                                fontFamily: 'DM Sans',
                                backgroundColor: 'black',
                            },

                        }}>
                            <TableCell>Name</TableCell>
                            <TableCell >Total value</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell align="right" >24H change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        borderRadius: '10px',
                        '& th': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
                            flexDirection: 'row',
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
                        {binanceAssets.map((asset) => (
                            <BinanceAssetsRow key={`asset-${asset.asset}`} asset={asset} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default BinanceAssetsTable;