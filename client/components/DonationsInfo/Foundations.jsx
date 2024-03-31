import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import FoundationInfo from './FoundationInfo';
import Masonry from '@mui/lab/Masonry';


function Foundations() {
    const [foundationsData, setFoundationsData] = useState()
    const [successOpen, setSuccessOpen] = useState(false);


    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        setSuccessOpen(true)
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/foundations`);
            if (response.status === 200) {
                const data = await response.json();
                setFoundationsData(data)
            } else if (response.status === 401) {
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting foundations data', error);
        }
    }


    useEffect(() => {
        fetchData().catch(console.error)
    }, []);

    return (
        <Box className={styles.foundationsContainer}>
            {foundationsData ? (
                <Masonry columns={2} spacing={4} >
                    {
                        foundationsData.data.map((el, index) => (
                            <FoundationInfo
                                key={`foundation-${index}`}
                                foundation={el}
                                copyData={copyToClipboard} />
                        ))
                    }
                </Masonry>
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 200px)',
                    width: '100%'
                }}>
                    <CircularProgress size={70} sx={{
                        color: '#0228EE',
                    }} />
                </Box>
            )}

            <Snackbar open={successOpen}
                autoHideDuration={750}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Copied to clipboard.
                </Alert>
            </Snackbar>
        </Box>
    );
}
export default Foundations;