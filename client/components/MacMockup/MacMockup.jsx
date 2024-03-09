import * as React from 'react';
import styles from './macmockup.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import macMockup from '@/public/macbookMock.svg';
import macMockupMini from '@/public/macbookMockMini.svg';
import Typography from '@mui/material/Typography';

function MacMockup({ user, error, isLoading }) {


    return (
        <Box className={styles.main} sx={{
            display: { xs: 'flex', md: 'flex' },
            marginTop: { xs: '100px', md: '100px' },
            flexDirection: { xs: 'column', md: 'row' }
        }}>
            <Box className={styles.mockupInfoWrap} sx={{
                width: { xs: '90%', md: '50%' },
                height: { xs: '200px', md: '500px' },
            }}>
                <Box className={styles.mockupInfo} sx={{
                    paddingLeft: { xs: '0px', md: '100px' }
                }}>
                    <Typography className={styles.mainText} sx={{
                        fontFamily: 'DM Sans',
                        fontWeight: 'bold',
                        fontSize: { xs: '28px', md: '60px' },
                        marginBottom: { xs: '15px', md: '0px' }
                    }}>
                        Controlling your finances is finally effortless
                    </Typography>
                    <Typography className={styles.additionalText} sx={{
                        fontFamily: 'DM Sans',
                        fontSize: { xs: '16px', md: '18px' },
                    }}>
                        Manage your fiat and cryptocurrency holdings easily, all in one place.
                    </Typography>
                    <Box className={styles.buttonsWrap} sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                    }}>
                        <Button className={styles.loginButton}
                            href={user ? '/dashboard' : '/api/auth/login'} sx={{
                                backgroundColor: '#0328EE',
                                color: 'white',
                                fontFamily: 'DM Sans',
                                fontSize: '16px',
                                borderRadius: '80px',
                                marginRight: { xs: '0px', md: '20px' },
                                marginBottom: { xs: '15px', md: '0px' },
                                width: { xs: '100%', md: '160px' },
                            }} >
                            {user ? 'My Porfolios' : 'Login'}
                        </Button>
                        {!user && (
                            <Button className={styles.signupButton}
                                href='/api/auth/signup' sx={{
                                    backgroundColor: '#323232',
                                    color: 'white',
                                    fontFamily: 'DM Sans',
                                    fontSize: '16px',
                                    borderRadius: '80px',
                                    width: { xs: '100%', md: '180px' },
                                    // display: { xs: 'none', md: 'flex' }
                                }}>
                                SIGN UP
                            </Button>
                        )}


                    </Box>
                </Box>
            </Box>

            <Box className={styles.laptopWrap} sx={{
                display: { xs: 'none', md: 'flex' },
            }}>
                <Image className={`${styles.laptop} ${styles.animate}`} src={macMockup}
                />
            </Box>


            <Box className={styles.laptopMiniWrap} sx={{
                display: { xs: 'flex', md: 'none' },
            }}>
                <Image className={`${styles.laptopMini}`} src={macMockupMini}
                />
            </Box>

        </Box >
    );
}
export default MacMockup;