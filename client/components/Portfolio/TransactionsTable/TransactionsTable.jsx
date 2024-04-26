import React, { useState, useEffect } from 'react';
import styles from './transactiontable.module.css';
import TransactionRow from './TransactionRow'
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, TableFooter, TablePagination,
} from '@mui/material';
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'




function TransactionsTable({ transactions, currency, handleTransactionsChange, valuesHidden }) {
    const [open, setOpen] = useState(false);
    const [transactionsData, setTransactionsData] = useState(transactions)
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
                }} aria-label="portfolios table">
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
                            <TableCell>Type</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="right">Fees</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Total price</TableCell>
                            <TableCell align="right"></TableCell>
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
                        {transactionsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
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
                        transactionsData.length > rowsPerPage && (
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
                                        count={transactionsData.length}
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

export default TransactionsTable;