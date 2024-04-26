import React from 'react';
import styles from './portfoliosinfo.module.css';
import PortfolioRow from './PortfolioRow';
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Link
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themesMUI/TableTheme';


function PortfoliosList({ portfoliosData, handlePortfoliosChange, valuesHidden }) {

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.portfoliosListContainer}>
                <Box className={styles.portfoliosListTitle}>
                    <Typography sx={{
                        fontFamily: 'DM Sans',
                        fontSize: '16px',
                        color: '#AEAEAE',
                        textDecoration: 'none',
                    }}>
                        My Portfolios
                    </Typography>

                    <Box className={styles.coingeckoText}>
                        <Typography
                            sx={{
                                fontFamily: 'DM Sans',
                                fontSize: '12px',
                                color: '#AEAEAE',
                                textDecoration: 'none',
                            }}>
                            Coin price data from&nbsp;
                        </Typography>
                        <Link
                            href={'https://www.coingecko.com/'}
                            target="_blank"
                            sx={{
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}>
                            <Typography
                                sx={{
                                    fontFamily: 'DM Sans',
                                    fontSize: '12px',
                                    textDecoration: 'none',
                                    color: '#0228EE'
                                }}>
                                CoinGecko
                            </Typography>
                        </Link>
                    </Box>

                </Box>

                <TableContainer sx={{
                    borderRadius: '5px'
                }}>
                    <Table
                        stickyHeader
                        sx={{
                            minWidth: 650,
                            borderCollapse: "separate",
                            borderSpacing: "0px 10px",
                        }}
                        aria-label="portfolios table">
                        <TableHead
                        variant="portfolios"
                            // sx={{
                            //     '& th': {
                            //         borderBottom: 'none',
                            //     },
                            //     '& td': {
                            //         borderBottom: 'none',
                            //     },
                            //     "& .MuiTableRow-root th:first-of-type": {
                            //         borderTopLeftRadius: "10px",
                            //         borderBottomLeftRadius: "10px",
                            //     },
                            //     "& .MuiTableRow-root th:last-child": {
                            //         borderTopRightRadius: "10px",
                            //         borderBottomRightRadius: "10px",
                            //     },
                            // }}
                        >
                            <TableRow 
                            variant='portfoliosHead'
                            // sx={{
                                // '& th': {
                                //     color: '#AEAEAE',
                                //     fontSize: '12px',
                                //     fontFamily: 'DM Sans',
                                //     backgroundColor: 'black',
                                // },
                            // }}
                            >
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Total value</TableCell>
                                <TableCell align="right">24H change</TableCell>
                                <TableCell align="right">Total change</TableCell>
                                <TableCell align="right">Total invested</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody 
                        variant='portfolios'
                        // sx={{
                        //     borderRadius: '10px',
                        //     '& th': {
                        //         borderBottom: 'none',
                        //         backgroundColor: 'black',
                        //         flexDirection: 'row',
                        //     },
                        //     '& td': {
                        //         borderBottom: 'none',
                        //         backgroundColor: 'black',
                        //         // paddingBottom: '10px'
                        //     },
                        //     "& .MuiTableRow-root th:first-child": {
                        //         borderTopLeftRadius: "10px",
                        //         borderBottomLeftRadius: "10px",
                        //     },
                        //     "& .MuiTableRow-root th:last-child": {
                        //         borderTopLeftRadius: "10px",
                        //         borderBottomLeftRadius: "10px",
                        //     },
                        //     "& .MuiTableRow-root td:first-child": {
                        //         borderTopLeftRadius: "10px",
                        //         borderBottomLeftRadius: "10px",
                        //     },
                        //     "& .MuiTableRow-root td:last-child": {
                        //         borderTopRightRadius: "10px",
                        //         borderBottomRightRadius: "10px",
                        //     },
                        // }}
                        >
                            {portfoliosData.map((el) => (
                                <PortfolioRow
                                    key={`${el.uuid}-mainRow`}
                                    portfolio={el}
                                    handlePortfoliosChange={handlePortfoliosChange}
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

export default PortfoliosList;