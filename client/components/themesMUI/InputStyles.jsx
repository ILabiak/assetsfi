const baseStyle = {
    '&:hover fieldset': {
        border: '1px solid',
        borderColor: 'white'
    },
    '& label': {
        color: '#AEAEAE',
    },
    '& label.Mui-focused': {
        color: '#AEAEAE',
    },
}

const outlinedWhiteStyle = {
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            color: 'white',
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
    },
}

const outlinedWhiteHoverStyle = {
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

const outlinedZeroBorderStyle = {
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: '0',
        },
        '&.Mui-focused:hover fieldset': {
            border: '0',
        },
        '&:hover fieldset': {
            border: '0',
        },
    },
}

const secondBaseStyle = {
    marginBottom: '20px',
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


const inputStyles = {

    currencyInput: {
        ...baseStyle,
        ...outlinedWhiteStyle,
        '.MuiInputBase-input': { color: '#E8E9EB', backgroundColor: '#313337' },
        '.MuiFormHelperText-root': {
            color: '#AEAEAE'
        }
    },

    assetInput: {
        ...baseStyle,
        ...outlinedZeroBorderStyle,
        marginBottom: '20px',
        input: {
            backgroundColor: '#313337',
            borderRadius: '5px',
            color: '#E8E9EB',
            fontSize: '16px',
        },
        "& .MuiInputBase-input": {
            WebkitTextFillColor: "#AEAEAE",
        },
    },

    amountInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    dateInput: {
        ...outlinedWhiteHoverStyle,
        backgroundColor: '#313337',
        width: '100%',
        borderRadius: '5px',
        color: '#E8E9EB',
        fontSize: '16px',
        '& label': {
            color: '#AEAEAE',
        },
        '& label.Mui-focused': {
            color: '#AEAEAE',
        },
    },

    disabledInput: {
        ...baseStyle,
        ...outlinedZeroBorderStyle,
        marginBottom: '20px',
        input: {
            backgroundColor: '#313337',
            borderRadius: '5px',
            color: '#E8E9EB',
            fontSize: '16px',
        },

    },

    nameInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    feesInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    noteInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    priceInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    quantityInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    textInput: {
        ...baseStyle,
        ...secondBaseStyle,
    },

    searchInput: {
        ...baseStyle,
        ...outlinedWhiteHoverStyle,
        marginBottom: '5px',
        input: {
            backgroundColor: '#313337',
            borderRadius: '5px',
            color: '#E8E9EB',
            fontSize: '16px',
        },
    },

    selectorInput: {
        ...outlinedWhiteStyle,
        mb: '10px',
        '&:hover fieldset': {
            border: '1px solid',
            borderColor: 'white'
        },
        '& label': {
            display: 'none',
        },
        '& label.Mui-focused': {
            display: 'inline',
            color: '#AEAEAE',
        },
        '.MuiInputBase-input': { color: '#E8E9EB', backgroundColor: '#313337' },
        '.MuiFormHelperText-root': {
            color: '#AEAEAE'
        }
    },

    totalPriceInput: {
        ...baseStyle,
        ...outlinedZeroBorderStyle,
        marginBottom: '20px',
        input: {
            backgroundColor: '#313337',
            borderRadius: '5px',
            color: '#E8E9EB',
            fontSize: '16px',
        },
        "& .MuiInputBase-input": {
            WebkitTextFillColor: "#AEAEAE",
        },
    }
}

export default inputStyles;
