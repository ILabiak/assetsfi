import React, { useState, useEffect } from 'react';
import styles from './binanceassetstable.module.css';
import BinanceAssetsRow from './BinanceAssetsRow'
// import PortfolioRow from './PortfolioRow';
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, TablePagination, TableFooter
} from '@mui/material';
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'


function BinanceAssetsTable({ binanceAssets, valuesHidden, handleChange }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


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
                            <TableCell align="right" ></TableCell>
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
                        {binanceAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((asset) => (
                            <BinanceAssetsRow
                                key={`asset-${asset.asset}`}
                                asset={asset}
                                valuesHidden={valuesHidden}
                                handleChange={handleChange}
                            />
                        ))}
                    </TableBody>
                    {
                        binanceAssets.length > rowsPerPage && (
                            <TableFooter>
                                <TableRow sx={{
                                    borderBottom: 'none',
                                }}>
                                    <TablePagination
                                        showFirstButton
                                        showLastButton
                                        sx={{
                                            width: '100%',
                                            borderBottom: 'none',
                                            '.MuiTablePagination-toolbar': {
                                                backgroundColor: 'black',
                                                paddingRight: '30px',
                                                paddingLeft: '30px',
                                                color: 'white',
                                                // height: '35px',
                                                borderRadius: '10px',

                                            },
                                            "& .MuiTablePagination-spacer": {
                                                display: "inline",
                                                color: 'white',
                                            },
                                        }}
                                        rowsPerPageOptions={[5]}
                                        colSpan={6}
                                        count={binanceAssets.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        )
                    }
                </Table>
            </TableContainer>
        </Box>
    );
}

export default BinanceAssetsTable;