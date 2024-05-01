import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, MenuItem, Switch, styled } from '@mui/material'
import ghnApi from '../../../../apis/ghnApi'
import addressApi from '../../../../apis/addressApi'
import Loading from '../../../../components/Loading/Loading'

function UpdateAddress({ address, rerender, setRerender }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [fullName, setFullName] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [district_id, setDistrictId] = useState()
    const [ward, setWard] = useState('')
    const [street, setStreet] = useState('')
    const [checked, setChecked] = useState(false)
    const [phoneNo, setPhoneNo] = useState('')

    const handleClose = () => {
        setDistricts([])
        setWards([])
        setOpen(false)
    }
    const handleProvinceChange = (event) => {
        setProvince(event)
        const province_id = provinces.find(item => item.ProvinceName === event)?.ProvinceID
        if (province_id) {
            ghnApi.getDistricts(province_id)
                .then(response => { setDistricts(response.data.data), setDistrict(response.data.data[0]?.DistrictName) })
        }
    }
    const handleDistrictChange = (event) => {
        setDistrict(event)
        const district_id = districts.find(item => item.DistrictName === event)?.DistrictID
        if (district_id) {
            setDistrictId(district_id)
            ghnApi.getWards(district_id)
                .then(response => { setWards(response.data.data), setWard(response.data.data[0]?.WardName) })
        }
    }
    const handleWardChange = (event) => {
        setWard(event)
    }
    const handleClickOpen = async () => {
        setFullName(address?.receiver_name)
        setPhoneNo(address?.receiver_phone_no)
        setStreet(address?.order_receive_address)
        setDistrictId(address?.district_id)
        setChecked(address?.is_default)
        setProvince(address?.province)
        setDistrict(address?.district)
        setWard(address?.ward)
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data)
                const province_id = response.data.data.find(item => item.ProvinceName === address?.province)?.ProvinceID
                if (province_id) {
                    ghnApi.getDistricts(province_id)
                        .then(response => {
                            setDistricts(response.data.data)
                            const district_id = response.data.data.find(item => item.DistrictName === address?.district)?.DistrictID
                            if (district_id) {
                                ghnApi.getWards(district_id)
                                    .then(response => {
                                        setWards(response.data.data)
                                    })
                            }
                        })
                }
            })
            .catch(err => { console.log(err) })
        setOpen(true)
    }
    const handleClickUpdate = async () => {
        if (ward == '') {
            toast.error('Vui lòng chọn địa chỉ !', { position: 'top-center', autoClose: 2000 })
        }
        else {
            setLoading(true)
            const data = {
                ward: ward,
                district: district,
                province: province,
                order_receive_address: street,
                district_id: district_id,
                receiver_name: fullName,
                receiver_phone_no: phoneNo,
                is_default: checked
            }
            addressApi.updateAddress(address?.address_id, data)
                .then(() => {
                    toast.success('Cập nhật địa chỉ thành công', { position: 'top-center', autoClose: 2000 })
                    setLoading(false)
                    setRerender(!rerender)
                })
                .catch((error) => {
                    toast.error('Cập nhật địa chỉ thất bại', { position: 'top-center', autoClose: 2000 })
                    console.log(error)
                })
                .finally(() => setLoading(false))
        }
        handleClose()
    }
    return (
        <Box>
            <Button color='error' sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit' } }} onClick={handleClickOpen}>Sửa</Button>
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
                                <MenuItem key={index} value={province?.ProvinceName}>
                                    {province.ProvinceName}
                                </MenuItem>
                            ))}
                        </TextField>}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {Array.isArray(districts) && <TextField fullWidth select size='small' label="Quận/Huyện" value={district} onChange={(e) => handleDistrictChange(e.target.value)}>
                                {districts.map((district, index) => (
                                    <MenuItem key={index} value={district?.DistrictName}>
                                        {district.DistrictName}
                                    </MenuItem>
                                ))}
                            </TextField>}
                            {Array.isArray(wards) && <TextField fullWidth select size='small' label="Phường/Xã" value={ward} onChange={(e) => handleWardChange(e.target.value)}>
                                {wards.map((ward, index) => (
                                    <MenuItem key={index} value={ward?.WardName}>
                                        {ward.WardName}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        </Box>
                        <TextField fullWidth inputMode='text' size='small' label="Đường/Tòa nhà" value={street} onChange={(e) => setStreet(e.target.value)} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography minWidth={'100px'} variant='subtitle1' color={'#444444'}>Đặt làm địa chỉ mặc định</Typography>
                            <IOSSwitch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickUpdate} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Cập nhật</Button>
                </DialogActions>
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default UpdateAddress
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#CD2626',
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}))