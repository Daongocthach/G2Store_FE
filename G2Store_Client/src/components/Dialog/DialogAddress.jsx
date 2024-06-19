import { Box, MenuItem, Dialog } from '@mui/material'

function DialogAddress({ datas, isProvince, isDistrict, isWard, open, setOpen, handleClick }) {
    const handleClickData = (data) => {
        handleClick(data)
        setOpen(false)
    }
    return (
        <Dialog
            id="dialog-address-dialog"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    maxHeight: '400px',
                    width: '400px',
                    overflow: 'auto'
                }
            }}
        >
            <Box>
                {datas.map((data, index) => (
                    <MenuItem key={index} value={data} onClick={() => handleClickData(data)}>
                        {isProvince ? data?.ProvinceName : isDistrict ? data?.DistrictName : isWard ? data?.WardName : 'Chưa có dữ liệu'}
                    </MenuItem>
                ))}
            </Box>
        </Dialog>

    )
}
export default DialogAddress