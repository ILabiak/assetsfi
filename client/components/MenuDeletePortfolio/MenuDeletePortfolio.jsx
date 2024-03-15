import React, { useState, useEffect, useRef } from 'react';
import styles from './menudeleteportfolio.module.css';
import { Typography, Box, Backdrop, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MenuDeletePortfolio({ portfolio, handlePortfoliosChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [deleteButtonActive, setDeleteButtonActive] = useState(true)
    const portfolioDeleteRef = useRef(null);

    const handleClose = (event) => {
        if (
            portfolioDeleteRef.current &&
            !portfolioDeleteRef.current.contains(event.target)
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    const handlePortfolioDelete = async () => {
        setDeleteButtonActive(false)
        // console.log('123')
        const response = await fetch('/api/server/portfolio/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uuid: portfolio?.uuid }),
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
            handlePortfoliosChange();
        } else {
            console.log('Some other error');
            setDeleteButtonActive(true)
        }
    }


    return (

        <React.Fragment>
            <MenuItem
                onClick={handleOpen}
                key={'deletePortfolio'} >
                Delete portfolio
            </MenuItem>
            <Backdrop
                onClick={handleClose}

                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)'
                }}
                open={backdropOpen}
            >
                <Box className={styles.deletePortfolioContainer} ref={portfolioDeleteRef}>
                    <Box className={styles.warningContainer}>
                        <Box className={styles.warning}>
                            <Box className={styles.deleteIcon}>
                                <DeleteIcon />
                            </Box>

                            <Box className={styles.warningTextBox}>
                                <Typography
                                    sx={{
                                        fontFamily: 'DM Sans',
                                        // fontStyle: 'bold',
                                        fontSize: '20px',
                                        fontWeight: '1000',
                                        // paddingLeft: '20px',
                                        // paddingBottom: '5px',
                                        // paddingTop: '5px',
                                        // borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                                    }}>
                                    Delete {portfolio.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'DM Sans',
                                        // fontStyle: 'bold',
                                        fontSize: '14px',
                                        fontWeight: '1000',
                                        // paddingLeft: '20px',
                                        // paddingBottom: '5px',
                                        // paddingTop: '5px',
                                        // borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                                    }}>
                                    Do you want to delete this portfolio?
                                </Typography>
                            </Box>

                        </Box>

                    </Box>

                    <Box className={styles.buttonsContainer}>
                        <Box className={styles.cancelButton}
                            onClick={() => setBackdropOpen(false)}
                            sx={{
                                // marginRight: '10px'
                            }}>
                            Cancel
                        </Box>
                        <Box
                            onClick={handlePortfolioDelete}
                            className={`${styles.deletePortfolioButton} ${!deleteButtonActive ? styles.disabled : ''}`}>
                            Delete
                        </Box>
                    </Box>
                </Box>
            </Backdrop>
        </React.Fragment>
    );
}
export default MenuDeletePortfolio;