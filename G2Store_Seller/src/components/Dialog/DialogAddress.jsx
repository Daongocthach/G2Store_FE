import { Box, MenuItem, Menu } from '@mui/material'

function DialogAddress({ datas, isProvince, isDistrict, isWard, open, setOpen, handleClick }) {
    const handleClickData = (data) => {
        handleClick(data)
        setOpen(false)
    }
    return (
        <Menu
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={null}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
        >
            <Box className='overflow-auto w-[400px]'>
                {datas.map((data, index) => (
                    <MenuItem key={index} value={data} onClick={() => handleClickData(data)}>
                        {isProvince ? data?.ProvinceName : isDistrict ? data?.DistrictName : isWard ? data?.WardName : 'Chưa có dữ liệu'}
                    </MenuItem>
                ))}
            </Box>
        </Menu>

    )
}
export default DialogAddress