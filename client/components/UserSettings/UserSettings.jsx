import React, { useState, useEffect, use } from 'react';
import styles from './usersettings.module.css';
import { Typography, Box, TextField } from '@mui/material';
import EditUsername from './EditUsername';
import CircularProgress from '@mui/material/CircularProgress';
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
    const [username, setUsername] = useState(user?.nickname)
    const [name, setName] = useState(user?.name)

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>
            {
                user && (
                    <Box sx={{
                        width: '100%',
                        display:'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Box className={styles.userSettingsContainer}>
                            {/* {user.nickname} */}
                            <Box className={styles.userImageWrap}>
                                <Box className={styles.userImage}>
                                    <Image src={user?.picture} width={100} height={100} ></Image>
                                </Box>
                            </Box>

                            <Typography
                                sx={{
                                    marginTop: '10px',
                                    fontSize: '16px'
                                }}>
                                {user?.name}
                            </Typography>
                        </Box>
                        <Box className={styles.userSettingsContainer}>
                            <Box className={styles.fieldsContainer}>

                            <EditUsername user={user}/>

                                <Typography className={styles.textFieldTitle}>Name</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: '20px',
                                }}>
                                    <TextField
                                        required
                                        id="outlined-disabled"
                                        value={name}
                                        // onChange={(e) => {
                                        //     handleApiSecretChange(e.target.value);
                                        // }}
                                        fullWidth
                                        sx={textFieldStyle}
                                    />
                                    <Box className={styles.editButton}>
                                        <EditIcon fontSize='small' /> Edit
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                )
            }
        </Box >
    );
}
export default UserSettings;