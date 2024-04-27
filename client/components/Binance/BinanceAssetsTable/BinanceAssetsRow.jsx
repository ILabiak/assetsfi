import React, { useState, Fragment } from 'react';
import Image from 'next/image'
import styles from './binanceassetstable.module.css';
import {
    Typography, Box, TableCell, TableRow, IconButton, Menu
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuViewChart from './MenuViewChart';


function BinanceAssetsRow({ asset, valuesHidden, handleChange }) {
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
                variant='defaultItem'
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
                    {valuesHidden ? '***' : `${asset?.totalValue} $`}
                </TableCell>
                <TableCell >
                    {valuesHidden ? '***' : `${asset?.tokens} ${asset?.asset.toUpperCase()}`}
                </TableCell>
                <TableCell >
                    {valuesHidden ? '***' : `${asset?.price} $`}
                </TableCell>
                <TableCell >
                    {
                        (asset?.dailyChange != 0 || asset?.dailyChangePercentage != '0') && (
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', }}>
                                <Box>
                                    {valuesHidden ? '***' : `${asset?.dailyChange} $`}
                                </Box>
                                {!isNaN(asset?.dailyChangePercentage) && !valuesHidden &&
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
                <TableCell align="right">
                    {asset?.pair && (
                        <>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={menuOpen ? 'long-menu' : undefined}
                                aria-expanded={menuOpen ? 'true' : undefined}
                                aria-haspopup="true"
                                sx={{
                                    color: 'white'
                                }}
                                onClick={handleMenuClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="portfolio-menu"
                                variant='defaultMenu'
                                sx={{
                                    mt: '-30px',
                                    ml: '-60px',
                                    '& .MuiMenuItem-root': {
                                        ml: '5px',
                                        mr: '5px',
                                    },
                                }}
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                                open={menuOpen}
                                onClose={handleMenuClose}
                            >
                                <MenuViewChart asset={asset} handleChange={handleChange} />
                            </Menu>
                        </>
                    )}

                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default BinanceAssetsRow;