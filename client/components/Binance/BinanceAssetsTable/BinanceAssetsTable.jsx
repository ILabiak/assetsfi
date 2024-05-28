import React, { useState } from 'react';
import styles from './binanceassetstable.module.css';
import BinanceAssetsRow from './BinanceAssetsRow'
import {
    Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, TablePagination, TableFooter
} from '@mui/material';
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themesMUI/TableTheme';


function BinanceAssetsTable({ binanceAssets, valuesHidden, handleChange }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.coinStatsContainer} sx={{
                margin: {xs: '10px 15px 0', md: '10px 30px 0'}
            }}>
                <TableContainer sx={{
                    borderRadius: '5px'
                }}>
                    <Table stickyHeader sx={{
                        minWidth: 650,
                        borderCollapse: "separate",
                        borderSpacing: "0px 10px",
                    }} aria-label="binanceAssets table">
                        <TableHead variant='default' >
                            <TableRow variant='defaultHead'>
                                <TableCell>Name</TableCell>
                                <TableCell >Total value</TableCell>
                                <TableCell >Amount</TableCell>
                                <TableCell >Price</TableCell>
                                <TableCell align="right" >24H change</TableCell>
                                <TableCell align="right" ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody variant='default'>
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
                                            variant='default'
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
        </ThemeProvider>
    );
}

export default BinanceAssetsTable;