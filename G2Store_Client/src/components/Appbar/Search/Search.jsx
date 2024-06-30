import SearchIcon from '@mui/icons-material/Search'
import { Paper, Autocomplete, Button, Box, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const handleSearch = async () => {
        navigate('/genre-detail', { state: { name: name } })
    }
    const handleChange = (event, value) => {
        setName(value)
    }
    return (
        <Box className='flex-row md:w-auto w-full'>
            <Paper component="form" className='flex flex-row items-center md:w-96 sm:w-full h-10'>
                <Autocomplete
                    fullWidth
                    freeSolo
                    onChange={(e, value) => handleChange(e, value)}
                    options={!name ? [] : listProductKeyWords}
                    clearIcon={false}
                    popupIcon={false}
                    renderInput={(params) =>
                        <TextField {...params}
                            type='search' variant='outlined' size='small' placeholder="Tìm kiếm trên G2Store"
                            sx={{
                                fontSize: 14, width: '110%',
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: 'transparent' }
                                }
                            }} onChange={(e) => handleChange(e, e?.target?.value)} onFocus={(e) => e.target.select()} />}
                />
                <Button variant='contained' color='warning' onClick={handleSearch} sx={{ borderRadius: 0 }} className='h-full'>
                    <SearchIcon />
                </Button>
            </Paper>
        </Box>
    )
}

export default Search
const listProductKeyWords = [
    'Bánh trung thu',
    'Bánh snack',
    'Bánh bông lan',
    'Bánh mì',
    'Bánh gạo',
    'Điện thoại',
    'Điện thoại thông minh',
    'Điện thoại oppo',
    'Điện thoại xiaomi',
    'Điện thoại samsung',
    'Điện thoại iphone',
    'Điện thoại vivo',
    'Laptop văn phòng',
    'Laptop Dell',
    'Laptop Asus',
    'Laptop Gaming',
    'Laptop Surface',
    'Laptop Apple',
    'Laptop Acer',
    'Laptop iTel',
    'Laptop Lenovo',
    'Gấu bông',
    'Điện thoại Redmi Note',
    'Điện thoại XIAOMI 14',
    'Điện thoại OPPO RENO8',
    'Điện thoại Oppo Reno4',
    'Điện thoại OPPO Reno11',
    'Điện thoại oppo reno 8',
    'Điện thoại Apple Iphone 15',
    'Áo thun nữ',
    'Áo thun nam',
    'Snack Lays',
    'SamSung S23 Ultra',
    'Pepsi',
    'Nước ngọt',
    'Nước khoáng',
    'Nước ngọt Fanta',
    'Máy tính laptop CGO',
    'Gấu bông Doraemon',
    'Coca Cola',
    'Bánh quy',
    'Bánh quy sô cô la',
    'Kẹo dẻo',
    'Kẹo',
    'Kẹo socola',
    'Kẹo cao su',
    'Sữa tươi',
    'Sữa chua',
    'Sữa chua có đường',
    'Sữa chua không đường',
    'Trà sữa',
    'Trà xanh',
    'Trà đen',
    'Cà phê',
    'Cà phê đen',
    'Cà phê sữa',
    'Nước ép trái cây',
    'Nước dừa',
    'Nước khoáng',
    'Nước tinh khiết',
    'Nước tăng lực',
    'Nước giải khát',
    'Máy tính bảng Apple',
    'Máy tính bảng Samsung',
    'Máy tính bảng Lenovo',
    'Máy tính bảng Asus',
    'Máy tính bảng Huawei',
    'Đồng hồ Apple Watch',
    'Đồng hồ Samsung Galaxy',
    'Đồng hồ thông minh',
    'Đồng hồ thể thao',
    'Tai nghe AirPods',
    'Tai nghe Sony',
    'Tai nghe Bluetooth',
    'Loa Bluetooth',
    'Loa JBL',
    'Loa Sony',
    'Máy ảnh Canon',
    'Máy ảnh Nikon',
    'Máy ảnh Sony',
    'Máy quay GoPro',
    'Máy quay phim',
    'Máy tính để bàn',
    'Máy tính all-in-one',
    'Máy in HP',
    'Máy in Canon',
    'Máy in Epson',
    'Máy in Brother',
    'TV Samsung',
    'TV LG',
    'TV Sony',
    'TV Panasonic',
    'TV TCL',
    'Tủ lạnh Toshiba',
    'Tủ lạnh Samsung',
    'Tủ lạnh LG',
    'Tủ lạnh Panasonic',
    'Máy giặt Samsung',
    'Máy giặt LG',
    'Máy giặt Toshiba',
    'Máy giặt Electrolux',
    'Bếp từ',
    'Bếp hồng ngoại',
    'Nồi cơm điện',
    'Nồi áp suất',
    'Quạt điện',
    'Máy lọc không khí',
    'Điều hòa nhiệt độ',
    'Máy hút bụi'
]
