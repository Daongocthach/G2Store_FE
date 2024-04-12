import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, MenuItem, Select, FormControl } from '@mui/material'
import ghnApi from '../../../../apis/ghnApi'
import authenApi from '../../../../apis/authenApi'
import { login } from '../../../../redux/actions/auth'

function UpdateAddress({ user }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [fullName, setFullName] = useState(user?.fullName)
    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [address, setAddress] = useState('')
    const [phoneNo, setPhoneNo] = useState(user?.phoneNo)

    const handleClose = () => {
        setDistricts([])
        setWards([])
        setOpen(false)
    }
    const handleProvinceChange = (event) => {
        setProvince(event)
        ghnApi.getDistricts(event?.ProvinceID)
            .then(response => { setDistricts(response.data.data) })
    }
    const handleDistrictChange = (event) => {
        setDistrict(event)
        ghnApi.getWards(event?.DistrictID)
            .then(response => { setWards(response.data.data) })
    }
    const handleWardChange = (event) => {
        setWard(event)
    }
    const handleClickOpen = () => {
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data)
            })
            .catch(err => { console.log(err) })

        setOpen(true)
    }
    const handleClickUpdate = () => {
        if (ward == '') {
            alert('Bạn chưa nhập địa chỉ mới!')
        }
        else {
            authenApi.updateProfile(user?.id, fullName, phoneNo, user?.avatar, province.ProvinceName, district.DistrictName, district.DistrictID, ward.WardName, address)
            .then((response) => {
                alert('Cập nhật thông tin nhận hàng thành công')
                dispatch(login(response.data))
            })
            .catch(() => {alert('Cập nhật thông tin thất bại')})
        }
        handleClose()
    }
    return (
        <div>
            <Button sx={{ color: 'red', fontWeight: 'bold' }} onClick={handleClickOpen}>Sửa</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Chỉnh sửa thông tin nhận hàng</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '550px' }}>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Thông tin người nhận</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label="Nhập họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <TextField fullWidth size='small' label="Nhập số điện thoại" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </Box>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Địa chỉ nhận hàng</Typography>
                        {Array.isArray(provinces) && <TextField fullWidth select size='small' label='Tỉnh/Thành phố' value={province} onChange={(e) => handleProvinceChange(e.target.value)}>
                            {provinces.map((province, index) => (
                                <MenuItem key={index} value={province}>
                                    {province.ProvinceName}
                                </MenuItem>
                            ))}
                        </TextField>}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth select size='small' label="Quận/Huyện" value={district} onChange={(e) => handleDistrictChange(e.target.value)}>
                                {Array.isArray(districts) && districts.map((district, index) => (
                                    <MenuItem key={index} value={district}>
                                        {district.DistrictName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select size='small' label="Phường/Xã" value={ward} onChange={(e) => handleWardChange(e.target.value)}>
                                {Array.isArray(wards) && wards.map((ward, index) => (
                                    <MenuItem key={index} value={ward}>
                                        {ward.WardName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <TextField fullWidth inputMode='text' size='small' label="Đường/Tòa nhà" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default UpdateAddress