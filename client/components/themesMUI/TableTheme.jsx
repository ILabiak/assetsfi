import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTableHead: {
            variants: [
                {
                    props: { variant: 'portfolios' },
                    style: {
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
                    },
                },
                {
                    props: { variant: 'donations' },
                    style: {
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
                    },
                },
            ],
        },
        MuiTableRow: {
            variants: [
                {
                    props: { variant: 'portfoliosHead' },
                    style: {
                        '& th': {
                            color: '#AEAEAE',
                            fontSize: '12px',
                            fontFamily: 'DM Sans',
                            backgroundColor: 'black',
                        },
                    },
                },
                {
                    props: { variant: 'portfoliosItem' },
                    style: {
                        '&:last-child td, &:last-child th': { border: 0 },
                        '& th': { color: 'white', fontFamily: 'DM Sans' },
                        '& td': { color: 'white', fontFamily: 'DM Sans' },
                    },
                },
                {
                    props: { variant: 'donationsItem' },
                    style: {
                        '&:last-child td, &:last-child th': { border: 0 },
                        '& th': { color: 'white', fontFamily: 'DM Sans' },
                        '& td': { color: 'white', fontFamily: 'DM Sans' },
                    },
                },
            ],
        },
        MuiTableBody: {
            variants: [
                {
                    props: { variant: 'portfolios' },
                    style: {
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
                    },
                },
                {
                    props: { variant: 'donations' },
                    style: {
                        borderRadius: '10px',
                        '& th': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
                            flexDirection: 'row',
                        },
                        '& td': {
                            borderBottom: 'none',
                            backgroundColor: 'black',
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
                    },
                },
            ],
        },
        MuiMenu: {
            variants: [
                {
                    props: { variant: 'portfoliosMenu' },
                    style: {
                        '& .MuiPaper-root': {
                            backgroundColor: '#000000',
                            border: '1px solid white',
                            borderRadius: '10px',
                            color: 'white',
                            padding: '0px',
                        },
                        '& .MuiMenuItem-root': {
                            '&:hover': {
                                backgroundColor: "#34B17F",
                                borderRadius: '5px',
                            },
                        },
                    },
                },
                {
                    props: { variant: 'donationsMenu' },
                    style: {
                        '& .MuiPaper-root': {
                            backgroundColor: '#000000',
                            border: '1px solid white',
                            borderRadius: '10px',
                            color: 'white',
                            padding: '0px',
                        },
                        '& .MuiMenuItem-root': {
                            '&:hover': {
                                backgroundColor: "#34B17F",
                                borderRadius: '5px',
                            },
                        },
                    },
                },
            ],
        },
        MuiTablePagination: {
            variants: [
                {
                    props: { variant: 'donations' },
                    style: {
                        width: '100%',
                        borderBottom: 'none',
                        '.MuiTablePagination-toolbar': {
                            backgroundColor: 'black',
                            paddingRight: '30px',
                            paddingLeft: '30px',
                            color: 'white',
                            borderRadius: '10px',
                        },
                        "& .MuiTablePagination-spacer": {
                            display: "inline",
                            color: 'white',
                        },
                    },
                },
            ]
        }
    },
});

export default theme;
