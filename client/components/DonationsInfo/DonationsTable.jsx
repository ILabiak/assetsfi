import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import {
    Button, Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Alert
} from '@mui/material';
import DonationRow from './DonationRow';


function DonationsTable({donations, handleDonationsChange}) {
    // const [donationsData, setDonationsData] = useState([{"id":"6","userId":"google-oauth2|116450147994105467130","foundationId":null,"amount":3934,"date":"2024-04-02T12:45:22.739Z","description":"Third donation","currencyId":"3","amountInUsd":100,"createdAt":"2024-04-02T12:45:22.739Z","updatedAt":"2024-04-02T12:45:22.739Z","Foundation":null,"Currency":{"id":3,"name":"UAH","code":"uah","symbol":"₴","createdAt":"2024-03-10T18:21:45.952Z","updatedAt":"2024-03-10T18:21:45.952Z"}},{"id":"5","userId":"google-oauth2|116450147994105467130","foundationId":2,"amount":393.4,"date":"2024-04-02T12:45:02.469Z","description":"Second donation","currencyId":"3","amountInUsd":10,"createdAt":"2024-04-02T12:45:02.469Z","updatedAt":"2024-04-02T12:45:02.469Z","Foundation":{"id":"2","name":"Serhiy Prytula Charity Foundation","logoUrl":"https://ds7zgdsyui79p.cloudfront.net/logonew_f2314490c6.svg","createdAt":"2024-04-02T11:36:00.993Z","updatedAt":"2024-04-02T11:36:00.993Z"},"Currency":{"id":3,"name":"UAH","code":"uah","symbol":"₴","createdAt":"2024-03-10T18:21:45.952Z","updatedAt":"2024-03-10T18:21:45.952Z"}},{"id":"4","userId":"google-oauth2|116450147994105467130","foundationId":1,"amount":10,"date":"2024-04-02T12:44:11.586Z","description":"","currencyId":"1","amountInUsd":10,"createdAt":"2024-04-02T12:44:11.586Z","updatedAt":"2024-04-02T12:44:11.586Z","Foundation":{"id":"1","name":"Come Back Alive","logoUrl":"https://savelife.in.ua/wp-content/themes/savelife/assets/images/new-logo-en.svg","createdAt":"2024-04-02T11:35:14.641Z","updatedAt":"2024-04-02T11:35:14.641Z"},"Currency":{"id":1,"name":"USD","code":"usd","symbol":"$","createdAt":"2024-03-10T18:21:45.952Z","updatedAt":"2024-03-10T18:21:45.952Z"}}])


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
                        {donations.map((donation) => (
                            <DonationRow donation={donation} handleDonationsChange={handleDonationsChange} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default DonationsTable;