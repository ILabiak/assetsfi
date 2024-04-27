import { createTheme } from '@mui/material/styles';

const tableHeadBaseStyle = {
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
}

const rowItemBaseStyle = {
    '&:last-child td, &:last-child th': { border: 0 },
    '& th': { color: 'white', fontFamily: 'DM Sans' },
    '& td': { color: 'white', fontFamily: 'DM Sans' },
}

const headRowBaseStyle = {
    '& th': {
        color: '#AEAEAE',
        fontSize: '12px',
        fontFamily: 'DM Sans',
        backgroundColor: 'black',
    },
}

const tableBodyBaseStyle = {
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
}

const menuBaseStyle = {
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
}

const tablePaginationBaseStyle = {
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
}

const theme = createTheme({
    components: {
        MuiTableHead: {
            variants: [
                {
                    props: { variant: 'default' },
                    style: {
                        ...tableHeadBaseStyle,
                    },
                }
            ],
        },
        MuiTableRow: {
            variants: [
                {
                    props: { variant: 'defaultHead' },
                    style: {
                        ...headRowBaseStyle,
                    },
                },
                {
                    props: { variant: 'defaultItem' },
                    style: {
                        ...rowItemBaseStyle,
                    },
                },
                {
                    props: { variant: 'ordersItem' },
                    style: {
                        maxHeight: '30px',
                        '&:last-child td, &:last-child th': { border: 0, maxHeight: '30px', },
                        '& th': { color: 'white', fontFamily: 'DM Sans', maxHeight: '30px', },
                        '& td': { color: 'white', fontFamily: 'DM Sans', maxHeight: '30px', },
                    },
                },
            ],
        },
        MuiTableBody: {
            variants: [
                {
                    props: { variant: 'default' },
                    style: {
                        ...tableBodyBaseStyle,
                    },
                },
            ],
        },
        MuiMenu: {
            variants: [
                {
                    props: { variant: 'defaultMenu' },
                    style: {
                        ...menuBaseStyle,
                    },
                },
            ],
        },
        MuiTablePagination: {
            variants: [
                {
                    props: { variant: 'default' },
                    style: {
                        ...tablePaginationBaseStyle,
                    },
                },
            ]
        }
    },
});

export default theme;
