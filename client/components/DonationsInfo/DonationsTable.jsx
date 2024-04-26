import React, { useState } from 'react';
import styles from './donationsinfo.module.css';
import {
    Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, TableFooter, TablePagination,
} from '@mui/material';
import DonationRow from './DonationRow';
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themesMUI/TableTheme';


function DonationsTable({ donations, handleDonationsChange, foundations, currencies }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.tableContainer} >
                <TableContainer sx={{
                    borderRadius: '5px'
                }}>
                    <Table stickyHeader sx={{
                        minWidth: 650,
                        borderCollapse: "separate",
                        borderSpacing: "0px 10px",
                    }} aria-label="portfolios table">
                        <TableHead variant='donations' >
                            <TableRow sx={{
                                '& th': {
                                    color: '#AEAEAE',
                                    fontSize: '12px',
                                    fontFamily: 'DM Sans',
                                    backgroundColor: 'black',
                                },
                            }}>
                                <TableCell >Foundation</TableCell>
                                <TableCell align="right" >Amount</TableCell>
                                <TableCell align="right" >Date</TableCell>
                                <TableCell align="right" >Note</TableCell>
                                <TableCell align="right" ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody variant='donations'>
                            {donations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donation, index) => (
                                <DonationRow
                                    key={`donation-${index}`}
                                    donation={donation}
                                    handleDonationsChange={handleDonationsChange}
                                    foundations={foundations}
                                    currencies={currencies}
                                />
                            ))}
                        </TableBody>
                        {
                            donations.length > rowsPerPage && (
                                <TableFooter>
                                    <TableRow sx={{
                                        borderBottom: 'none',
                                    }}>
                                        <TablePagination
                                            showFirstButton
                                            showLastButton
                                            variant='donations'
                                            rowsPerPageOptions={[5]}
                                            colSpan={6}
                                            count={donations.length}
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

export default DonationsTable;