import React, { useState, useEffect } from 'react';
import styles from './transactiontable.module.css';
import TransactionRow from './TransactionRow'
// import PortfolioRow from './PortfolioRow';
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Collapse
} from '@mui/material';


function TransactionsTable({ transactions, currency, handleTransactionsChange, valuesHidden }) {
    const [open, setOpen] = useState(false);
    const [transactionsData, setTransactionsData] = useState(transactions)


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
                        {transactionsData.map((transaction) => (
                            <TransactionRow
                                key={`transaction-${transaction.id}`}
                                transactionData={transaction}
                                currency={currency}
                                handleTransactionsChange={handleTransactionsChange}
                                valuesHidden={valuesHidden}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TransactionsTable;