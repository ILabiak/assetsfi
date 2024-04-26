import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'black',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                },
            },
        },
        MuiLink: {
            variants: [
                {
                    props: { variant: 'logo' },
                    style: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        textAlign: 'center',
                        marginLeft: '30px',
                        height: '100px',
                        textDecoration: 'none'
                    },
                },
                {
                    props: { variant: 'default' },
                    style: {
                        textDecoration: 'none',
                        display: 'flex',
                        width: '100%'
                    },
                },
            ]
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    alignSelf: 'center',
                    backgroundColor: '#AEAEAE',
                    width: '80%'
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    "&.Mui-selected": {
                        backgroundColor: "#0328EE"
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#010D50"
                    },
                    "&.Mui-focusVisible": {
                        backgroundColor: "#010D50"
                    },
                    "&:hover": {
                        backgroundColor: "#010D50",
                        "& svg": {
                            color: "white"
                        },
                        "& p": {
                            color: "white"
                        }
                    }
                },
            },
        },
    },
    typography: {
        'logo1': {
            mr: 2,
            fontFamily: 'DM Sans',
            fontWeight: 1000,
            fontSize: '16px',
            letterSpacing: '.3rem',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
            marginLeft: '10px',
            display: { xs: 'none', md: 'flex' }
        },
    }
});

export default theme;
