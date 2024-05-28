import React, { useState } from 'react';
import styles from './transactiontable.module.css';
import TransactionRow from './TransactionRow'
import {
    Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, TableFooter, TablePagination,
} from '@mui/material';
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themesMUI/TableTheme';

function TransactionsTable({ transactions, currency, handleTransactionsChange, valuesHidden }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.coinStatsContainer} sx={{
                margin: {xs: '20px 15px 0', md: '20px 30px 0'}
            }}>
                <TableContainer sx={{
                    borderRadius: '5px'
                }}>
                    <Table stickyHeader sx={{
                        minWidth: 650,
                        borderCollapse: "separate",
                        borderSpacing: "0px 10px",
                    }} aria-label="portfolios table">
                        <TableHead variant='default'>
                            <TableRow variant='defaultHead'>
                                <TableCell>Type</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell align="right">Fees</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Total price</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody variant='default'>
                            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                                <TransactionRow
                                    key={`transaction-${transaction.id}`}
                                    transactionData={transaction}
                                    currency={currency}
                                    handleTransactionsChange={handleTransactionsChange}
                                    valuesHidden={valuesHidden}
                                />
                            ))}
                        </TableBody>
                        {
                            transactions.length > rowsPerPage && (
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
                                            count={transactions.length}
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

export default TransactionsTable;