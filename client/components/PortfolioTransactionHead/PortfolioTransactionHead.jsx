import React, { useState, useEffect, use } from 'react';
import styles from './portfoliotransactionhead.module.css';
import CreateTransactionButton from '@/components/CreateTransactionButton/CreateTransactionButton'
import { Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function PortfolioTransactionHead({ currency, portfolio, handleTransactionsChange, valuesHidden, setValuesHidden }) {

    return (
        <Box className={styles.transactionsHead}>
            <Typography sx={{
                fontFamily: 'DM Sans',
                fontSize: '30px',
                color: 'white',
                // ml: '30px',
                textDecoration: 'none',
            }}>Transactions</Typography>
            <Box className={styles.createButtonBox}>
                {
                    valuesHidden ? (
                        <VisibilityOffIcon
                            onClick={() => { setValuesHidden(false) }}
                            sx={{
                                color: '#AEAEAE',
                                fontSize: '20px',
                                marginRight: '20px',
                                cursor: 'pointer',
                            }} />
                    ) : (
                        <VisibilityIcon
                            onClick={() => { setValuesHidden(true) }}
                            sx={{
                                color: '#AEAEAE',
                                fontSize: '20px',
                                marginRight: '20px',
                                cursor: 'pointer',
                            }} />
                    )
                }
                <CreateTransactionButton
                    currency={currency}
                    portfolio={portfolio}
                    handleTransactionsChange={handleTransactionsChange} />
            </Box>
        </Box>


    );
}
export default PortfolioTransactionHead;