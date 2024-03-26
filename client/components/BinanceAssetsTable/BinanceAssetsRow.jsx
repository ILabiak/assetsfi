import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image'
import styles from './binanceassetstable.module.css';
import {
    Typography, Box, Table, TableCell, TableRow
} from '@mui/material';


function BinanceAssetsRow({ asset, currency, handlePortfoliosChange }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <TableRow
                key={asset.id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& th': { color: 'white', fontFamily: 'DM Sans' },
                    '& td': { color: 'white', fontFamily: 'DM Sans' },
                }}
            >
                <TableCell component="th" scope="row" >
                    <Box className={styles.assetInfo}>
                        <Image alt='assetImg' width={30} height={30} src={asset?.logo} />
                        <Typography ml={'10px'}>
                            {asset.name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell >
                    {`${asset?.totalValue} $`}
                </TableCell>
                <TableCell >
                    {`${parseFloat(asset?.free)} ${asset?.asset.toUpperCase()}`}
                </TableCell>
                <TableCell >
                    {`${asset?.price} $`}
                </TableCell>
                <TableCell >
                    {
                        (asset?.dailyChange != 0 || asset?.dailyChangePercentage != '0') && (
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                                <Box>
                                    {`${asset?.dailyChange} $`}
                                </Box>
                                {!isNaN(asset?.dailyChangePercentage) &&
                                    <Box sx={{
                                        backgroundColor: (parseFloat(asset?.dailyChangePercentage) > 0) ? '#34B17F' : '#5D2626',
                                        borderRadius: '5px',
                                        padding: '0 3px',
                                        marginLeft: '5px'
                                    }}>{`${asset?.dailyChangePercentage} %`}
                                    </Box>
                                }
                            </Box>
                        )
                    }

                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default BinanceAssetsRow;