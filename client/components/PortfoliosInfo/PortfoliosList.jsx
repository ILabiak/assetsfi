import React, { useState, useEffect } from 'react';
import styles from './portfoliosinfo.module.css';
import PortfolioRow from './PortfolioRow';
import {
    Typography, Box, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Collapse
} from '@mui/material';


function PortfoliosList({ portfoliosData, handlePortfoliosChange, valuesHidden }) {
    const [open, setOpen] = useState(false);

    const [portfolios, setPortfolios] = useState(portfoliosData)

    return (
        <Box className={styles.portfoliosListContainer}>
            <Typography sx={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                color: '#AEAEAE',
                textDecoration: 'none',
            }}>
                My Portfolios
            </Typography>
            <TableContainer sx={{
                borderRadius: '5px'
            }}>
                <Table stickyHeader sx={{
                    minWidth: 650,
                    borderCollapse: "separate",
                    borderSpacing: "0px 10px",
                }} aria-label="portfolios table">
                    <TableHead sx={{
                        '& th': {
                            borderBottom: 'none',
                        },
                        '& td': {
                            borderBottom: 'none',
                        },
                        "& .MuiTableRow-root th:first-of-type": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root th:last-child": {
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                        },
                    }} >
                        <TableRow sx={{
                            '& th': {
                                color: '#AEAEAE',
                                fontSize: '12px',
                                fontFamily: 'DM Sans',
                                backgroundColor: 'black',
                            },

                        }}>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Total value</TableCell>
                            <TableCell align="right">24H change</TableCell>
                            <TableCell align="right">Total change</TableCell>
                            <TableCell align="right">Total invested</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        borderRadius: '10px',
                        '& th': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
                            flexDirection: 'row',
                        },
                        '& td': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
                            // paddingBottom: '10px'
                        },
                        "& .MuiTableRow-root th:first-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root th:last-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root td:first-child": {
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root td:last-child": {
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                        },
                    }}>
                        {portfolios.map((el) => (
                            <PortfolioRow 
                            key={`${el.uuid}-mainRow`} 
                            portfolioData={el} 
                            handlePortfoliosChange={handlePortfoliosChange}
                            valuesHidden={valuesHidden}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default PortfoliosList;