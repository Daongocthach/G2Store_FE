import { Chip, Box } from '@mui/material'
import { People, Category, Inventory,Reorder, MoneyOff, ReceiptLong, Filter9Plus, AddHomeWork } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const useStyles = {
    container: {
        width: '100%',
        height: (theme) => theme.webCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2,
        paddingX: 2,
        overflow: 'auto',
        borderTop: '1px solid #D3D3D3',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : 'white')
    },
    chip: {
        color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
        bgcolor: 'transparent',
        border: '1 ',
        paddingX: '5px',
        borderRadius: '4px',
        '& .MuiSvgIcon-root': {
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
        },
        '&:hover': {
            bgcolor: 'primary.50'
        }
    }
}
function BoardBar() {
    return (
        <Box sx={useStyles.container}>
           
        </Box>
    )
}

export default BoardBar