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
            <Link to={'/manage/orders'}><Chip icon={<Reorder />} label={'Quản lý đơn hàng'} clickable sx={useStyles.chip} ></Chip></Link>
            <Link to={'/manage/categories'}><Chip icon={<Category />} label={'Danh mục sản phẩm'} clickable sx={useStyles.chip} ></Chip></Link>
            <Link to={'/manage/subCategories'}><Chip icon={<Category />} label={'Danh mục con'} clickable sx={useStyles.chip} ></Chip></Link>
            <Link to={'/manage/users'}><Chip icon={<People />} label={'Quản lý tài khoản khách hàng'} clickable sx={useStyles.chip} ></Chip></Link>
            <Link to={'/manage/providers'}><Chip icon={<AddHomeWork />} label={'Quản lý nhà cung cấp'} clickable sx={useStyles.chip} ></Chip></Link>
            <Link to={'/manage/products'}><Chip icon={<Filter9Plus />} label={'Quản lý sản phẩm'} clickable sx={useStyles.chip} ></Chip></Link>
            <Link to={'/manage/promotions'}><Chip icon={<MoneyOff />} label={'Khuyến mãi'} clickable sx={useStyles.chip} ></Chip></Link>
        </Box>
    )
}

export default BoardBar