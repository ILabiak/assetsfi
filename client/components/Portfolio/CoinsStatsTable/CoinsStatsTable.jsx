import React, { useState } from 'react';
import styles from './coinsstatstable.module.css';
import CoinsStatsRow from './CoinsStatsRow'
import {
    Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themesMUI/TableTheme';


function CoinsStatsTable({ portfolio, handlePortfoliosChange, valuesHidden }) {
    const [portfolioData, setPortfolioData] = useState(portfolio)

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.coinStatsContainer}>
                <TableContainer sx={{
                    borderRadius: '5px'
                }}>
                    <Table stickyHeader sx={{
                        minWidth: 650,
                        borderCollapse: "separate",
                        borderSpacing: "0px 10px",
                    }} aria-label="portfolios table">
                        <TableHead variant='default' >
                            <TableRow variant='defaultHead'>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Total value</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">24H change</TableCell>
                                <TableCell align="right">Total change</TableCell>
                                <TableCell align="right">Total invested</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody variant='default'>
                            {portfolioData.coins.map((coin) => (
                                <CoinsStatsRow
                                    key={`coin-${coin.id}`}
                                    coin={coin}
                                    currency={portfolioData['Currency']}
                                    valuesHidden={valuesHidden}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
}

export default CoinsStatsTable;