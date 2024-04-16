import React, { useState, useEffect } from 'react';
import styles from './binanceassetstable.module.css';
import OrderRow from './OrderRow';
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Collapse
} from '@mui/material';


function OrdersTable({ orders, handleOrdersChanged }) {

    return (
        <Box className={styles.ordersTableContainer}>
            <TableContainer sx={{
                height: orders.length > 3 ? '0px' : 'auto',
                flexGrow: orders.length > 3 ? 1 : 0,
                overflow: 'auto',
                borderRadius: '5px',
            }}>
                <Table stickyHeader sx={{
                    flexGrow: 1,
                    minWidth: 650,
                    height: '100%',
                    borderCollapse: "separate",
                    borderSpacing: "0px 10px",
                }} aria-label="orders table">
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
                            <TableCell>Symbol</TableCell>
                            <TableCell >Type</TableCell>
                            <TableCell >Direction</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >Quantity</TableCell>
                            <TableCell >Time</TableCell>
                            <TableCell align="right" >Status</TableCell>
                            <TableCell align="right" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        // overflow: 'scroll',
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
                        {orders.map((order) => (
                            <OrderRow
                                key={`order-${order.orderId}`}
                                order={order}
                                handleOrdersChanged={handleOrdersChanged}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default OrdersTable;