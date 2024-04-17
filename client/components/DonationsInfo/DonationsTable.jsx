import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import {
    Button, Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, TableFooter, TablePagination,
} from '@mui/material';
import DonationRow from './DonationRow';
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'


function DonationsTable({ donations, handleDonationsChange, foundations, currencies }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <Box className={styles.tableContainer} >
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
                            <TableCell >Foundation</TableCell>
                            <TableCell align="right" >Amount</TableCell>
                            <TableCell align="right" >Date</TableCell>
                            <TableCell align="right" >Note</TableCell>
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
                                        sx={{
                                            width: '100%',
                                            borderBottom: 'none',
                                            '.MuiTablePagination-toolbar': {
                                                backgroundColor: 'black',
                                                paddingRight: '30px',
                                                paddingLeft: '30px',
                                                color: 'white',
                                                borderRadius: '10px',

                                            },
                                            "& .MuiTablePagination-spacer": {
                                                display: "inline",
                                                color: 'white',
                                            },
                                        }}
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
    );
}
export default DonationsTable;