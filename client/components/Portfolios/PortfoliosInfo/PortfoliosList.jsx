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
            <Box className={styles.portfoliosListContainer} sx={{
                margin: {xs: '20px 15px 0', md: '20px 30px 0'}
            }}>
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
                        <TableHead variant="default">
                            <TableRow variant='defaultHead' >
                                <TableCell width={'15%'}>Name</TableCell>
                                <TableCell width={'20%'} align="right">Total value</TableCell>
                                <TableCell width={'17%'} align="right">24H change</TableCell>
                                <TableCell width={'17%'} align="right">Total change</TableCell>
                                <TableCell width={'19%'} align="right">Total invested</TableCell>
                                <TableCell width={'10%'} align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody variant='default' >
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