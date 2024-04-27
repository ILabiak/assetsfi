import React from 'react';
import styles from './binanceassetstable.module.css';
import OrderRow from './OrderRow';
import {
    Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themesMUI/TableTheme';

function OrdersTable({ orders, handleOrdersChanged }) {
    return (
        <ThemeProvider theme={theme}>
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
                        <TableHead variant='default'>
                            <TableRow variant='defaultHead'>
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
                        <TableBody variant='default'>
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
        </ThemeProvider>
    );
}

export default OrdersTable;