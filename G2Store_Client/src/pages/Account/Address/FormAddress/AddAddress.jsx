import { useState, useEffect } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, MenuItem, Switch } from '@mui/material'
import ghnApi from '../../../../apis/ghnApi'

function AddAddress() {
    const [provinces, setProvinces] = useState([])
    const [provinceName, setProvinceName] = useState('')
    const [districts, setDistricts] = useState([])
    const [districtName, setDistrictName] = useState('')
    const [wards, setWards] = useState([])
    const [wardName, setWardName] = useState('')
    const [road, setRoad] = useState('')
    const [fullName, setFullName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [open, setOpen] = useState(false)
    const handleProvinceChange = (code) => {
        setProvinceName(code)
        ghnApi.getDistricts(code)
            .then(response => { setDistricts(response.data.data) })
    }
    const handleDistrictChange = (code) => {
        setDistrictName(code)
        ghnApi.getWards(code)
            .then(response => { setWards(response.data.data) })
    }
    const handleWardChange = (code) => {
        setWardName(code)
    }
    const handleClickOpen = () => {
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data)
                console.log(response.data.data)
            })
            .catch(err => { console.log(err) })

        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {

        console.log(provinceName)
        handleClose()
    }
    return (
        <div>
            <Button size={'small'} sx={{ bgcolor: '#CD3333', color: 'white', borderRadius: 10, fontWeight: 'bold', ':hover': { bgcolor: 'red' } }} onClick={handleClickOpen}>Thêm địa chỉ mới</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Thêm địa chỉ mới</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '500px' }}>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Thông tin người nhận</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label="Nhập họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <TextField fullWidth size='small' label="Nhập số điện thoại" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </Box>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Địa chỉ nhận hàng</Typography>
                        {Array.isArray(provinces) && <TextField fullWidth select size='small' label='Tỉnh/Thành phố' value={provinceName} onChange={(e) => handleProvinceChange(e.target.value)}>
                            {provinces.map((province, index) => (
                                <MenuItem key={index} value={province.ProvinceID}>
                                    {province.ProvinceName}
                                </MenuItem>
                            ))}
                        </TextField>}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth select size='small' label="Quận/Huyện" value={districtName} onChange={(e) => handleDistrictChange(e.target.value)}>
                                {Array.isArray(districts) && districts.map((district, index) => (
                                    <MenuItem key={index} value={district.DistrictID}>
                                        {district.DistrictName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select size='small' label="Phường/Xã" value={wardName} onChange={(e) => handleWardChange(e.target.value)}>
                                {Array.isArray(wards) && wards.map((ward, index) => (
                                    <MenuItem key={index} value={ward.WardName}>
                                        {ward.WardName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <TextField fullWidth inputMode='text' size='small' label="Đường/Tòa nhà" value={road} onChange={(e) => setRoad(e.target.value)} />
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                            <Typography variant='h7' fontWeight={'bold'}>Loại địa chỉ</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button size='small' startIcon={<Home />} sx={{ color: 'inherit', ':focus': { bgcolor: '#FCDAD5' } }}>Nhà</Button>
                                <Button size='small' startIcon={<Business />} sx={{ color: 'inherit', ':focus': { bgcolor: '#FCDAD5' } }}>Văn phòng</Button>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                            <Typography variant='h7' fontWeight={'bold'}>Đặt làm địa chỉ mặc định</Typography>
                            <Switch />
                        </Box> */}
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddAddress