import React, { useContext } from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import SnackbarContext from '../BinanceData/SnackbarsContext';
import CloseIcon from '@mui/icons-material/Close';

function formatDate(timestamp) {
    let date = new Date(timestamp);

    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
}


function OrderRow({ order, handleOrdersChanged }) {
    const {
        setErrorText,
        setErrorOpen,
        setSuccessOpen,
        setSuccessText
    } = useContext(SnackbarContext);

    const cancelOrder = async (orderId, symbol) => {
        let orderObj = {
            orderId,
            symbol
        }
        console.log(orderObj)
        const response = await fetch('/api/server/binance/order/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderObj),
            credentials: 'include'
        });
        if (response.status === 200) {
            // let data = await response.json()
            setSuccessText(`Order was successfully canceled`)
            setSuccessOpen(true)
            handleOrdersChanged();
        } else {
            let data = await response.json()
            if (typeof data.message == 'string') {
                setErrorText(data.message)
            } else {
                setErrorText('Unknown error')
            }
            setErrorOpen(true)
            setCreateOrderButtonActive(true)
        }
    }

    return (
        <TableRow key={order.orderId} variant='ordersItem' >
            <TableCell component="th" scope="row" >
                {order.symbol}
            </TableCell>
            <TableCell >
                {order.type}
            </TableCell>
            <TableCell >
                {order.side}
            </TableCell>
            <TableCell >
                {order.type == 'MARKET' ? (parseFloat(order.cummulativeQuoteQty) / parseFloat(order.executedQty)).toFixed(2)
                    : parseFloat(order.price)}
            </TableCell>
            <TableCell >
                {order.type == 'MARKET' ? parseFloat(order.cummulativeQuoteQty) : parseFloat(order.origQty)}
            </TableCell>
            <TableCell >
                {formatDate(order.time)}
            </TableCell>
            <TableCell align="right" >
                {order.status}
            </TableCell>
            <TableCell align="right">
                {
                    order.status == 'NEW' && (
                        <IconButton
                            onClick={() => { cancelOrder(order.orderId, order.symbol) }}
                            aria-label="cancel-order"
                            color='primary'
                        >
                            <CloseIcon sx={{
                                color: 'white'
                            }} />
                        </IconButton>
                    )
                }

            </TableCell>
        </TableRow>
    );
}

export default OrderRow;