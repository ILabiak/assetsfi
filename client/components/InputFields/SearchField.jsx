import React, { useState, useRef } from 'react';
import Image from 'next/image'
import styles from './searchfield.module.css';
import { Typography, Box, TextField, List, ListItem } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';


function SearchField({ searchQuery, setSearchQuery, dataFiltered, setAsset }) {
    const [assetsSearchOpen, setAssetsSearchOpen] = useState(false);
    const searchResultsRef = useRef(null);

    const handleChooseCoin = async (asset) => {
        setSearchQuery(asset.name)
        setAsset(asset)
    }

    const handleBlur = () => {
        setTimeout(() => {
            setAssetsSearchOpen(false)
        }, 200)
    }

    return (
        <Box>
            <TextField
                required
                label="Asset"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
                onFocus={() => setAssetsSearchOpen(true)}
                onBlur={handleBlur}
                autoComplete='off'
                type="search"
                placeholder='Search asset'
                fullWidth
                sx={inputStyles.searchInput}
            />

            {assetsSearchOpen &&
                <Box
                    ref={searchResultsRef}
                    sx={{
                        position: 'relative'
                    }}
                >
                    <Box style=
                        {{
                            padding: 0,
                            backgroundColor: '#313337',
                            borderRadius: '5px',
                            border: '1px solid',
                            position: 'absolute',
                            left: '0',
                            right: '0',
                            zIndex: '22'
                        }}
                    >
                        {!dataFiltered ? (
                            <Box className={styles.searchResult}>
                                <Typography sx={{
                                    marginLeft: '10px'
                                }}>
                                    No results
                                </Typography>

                            </Box>
                        ) : (
                            <List
                                sx={{
                                    maxHeight: '190px',
                                    position: 'relative',
                                    overflow: 'auto',
                                }}
                                subheader={<li />}
                                disablePadding={true}
                            >
                                {
                                    dataFiltered.map((asset) => (
                                        <ListItem
                                            onClick={() => handleChooseCoin(asset)}
                                            key={asset.id}
                                            disablePadding={true}
                                            sx={{
                                                display: 'inline',
                                            }}
                                        >
                                            <Box className={styles.searchResult}>
                                                <Image
                                                    alt='assetImg'
                                                    width={30} height={30}
                                                    src={asset?.image}
                                                    className={styles.searchImg}
                                                />
                                                <Typography
                                                    sx={{
                                                        marginLeft: '10px'
                                                    }}>
                                                    {asset.name}
                                                </Typography>
                                            </Box>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        )}
                    </Box>
                </Box>
            }
        </Box>
    );
}
export default SearchField;