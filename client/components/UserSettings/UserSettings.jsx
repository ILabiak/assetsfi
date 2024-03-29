import React, { useState, useEffect, use } from 'react';
import styles from './usersettings.module.css';
import { Typography, Box, TextField } from '@mui/material';
import EditUsername from './EditUsername';
import EditName from './EditName';
import ChangePassword from './ChangePassword';
import Image from 'next/image';

import EditIcon from '@mui/icons-material/Edit';

const textFieldStyle = {
    mr: '40px',
    '&:hover fieldset': {
        border: '1px solid',
        borderColor: 'white'
    },
    input: {
        backgroundColor: '#313337',
        borderRadius: '5px',
        color: '#E8E9EB',
        fontSize: '16px',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused:hover fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
    },

}

function UserSettings({ user }) {
    const [userData, setUserData] = useState();
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')

    const fetchUserMetadata = async () => {
        try {
            const response = await fetch(`/api/server/user/metadata`);
            if (response.status === 200) {
                const data = await response.json();
                setUserData(data)
                setName(data?.name)
                setUsername(data?.nickname)
            } else {
                setUserData({})
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting user metadatadata', error);
        }
    }

    useEffect(() => {
        fetchUserMetadata().catch(console.error)
    }, []);

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>
            {
                userData?.name && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Box className={styles.userSettingsContainer}>
                            {/* {user.nickname} */}
                            <Box className={styles.userImageWrap}>
                                <Box className={styles.userImage}>
                                    <Image priority src={userData?.picture} alt='userpicture' width={100} height={100} ></Image>
                                </Box>
                            </Box>

                            <Typography
                                sx={{
                                    marginTop: '10px',
                                    fontSize: '16px'
                                }}>
                                {userData?.name}
                            </Typography>
                        </Box>
                        <Box className={styles.userSettingsContainer}>
                            <Box className={styles.fieldsContainer}>

                                <EditUsername user={userData} setUserData={setUserData} />

                                <EditName user={userData} setUserData={setUserData} />

                            </Box>
                        </Box>

                        <Box className={styles.userSettingsContainer}>
                            <Typography sx={{
                                fontFamily: 'DM Sans',
                                fontSize: '20px',
                                mt: '20px'
                            }}>
                                Change password
                            </Typography>
                            {
                                !user.sub.includes('google-oauth2') ? (
                                    <Box className={styles.fieldsContainer}>
                                        <ChangePassword user={user} setUserData={setUserData} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'DM Sans',
                                            fontSize: '16px',
                                            mt: '20px'
                                        }}>
                                            You can't change password because you're authorised via Google
                                        </Typography>
                                    </Box>
                                )
                            }

                        </Box>
                    </Box>

                )
            }
        </Box >
    );
}
export default UserSettings;