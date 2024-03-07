import * as React from 'react';
import styles from './macmockup.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import macMockup from '@/public/macbookMock.svg';



function MacMockup() {


    return (
        <Box className={styles.main} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box className={styles.mockupInfoWrap} sx={{
                width: { xs: '90%', md: '50%' }
            }}>
                <Box className={styles.mockupInfo}>
                    <p className={styles.mainText}>
                        Controlling your finances is finally effortless
                    </p>
                    <p className={styles.additionalText}>
                        Manage your fiat and cryptocurrency holdings easily, all in one place.
                    </p>
                    <div className={styles.buttonsWrap}>
                        <Button className={styles.loginButton} sx={{
                            backgroundColor: '#0328EE',
                            color: 'white',
                            fontFamily: 'DM Sans',
                            fontSize: '20px',
                            borderRadius: '80px',
                            marginRight: '20px',
                        }}>
                            Login
                        </Button>
                        <Button className={styles.signupButton} sx={{
                            backgroundColor: '#323232',
                            color: 'white',
                            fontFamily: 'DM Sans',
                            fontSize: '20px',
                            borderRadius: '80px',
                            display: { xs: 'none', md: 'flex' }
                        }}>
                            SIGN UP
                        </Button>
                    </div>
                </Box>
            </Box>

            <Box className={styles.laptopWrap} sx={{
                display: { xs: 'none', md: 'flex' },
            }}>
                <Image className={`${styles.laptop} ${styles.animate}`} src={macMockup}
                />
            </Box>

        </Box>
    );
}
export default MacMockup;