import { useState } from 'react'
import { toast } from 'react-toastify'
import { AddCircle } from '@mui/icons-material'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, MenuItem } from '@mui/material'
import ghnApi from '../../../apis/ghnApi'
import Loading from '../../../components/Loading/Loading'
import avatarNull from '../../../assets/img/avatar.png'
import shopApi from '../../../apis/shopApi'

function UpdateShop({ shop, rerender, setRerender }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [name, setName] = useState(shop?.receiver_name)
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [district_id, setDistrictId] = useState(shop?.district_id)
    const [ward, setWard] = useState('')
    const [street, setStreet] = useState(shop?.street)
    const [imageShop, setImageShop] = useState(shop?.image)

    const handleImageShopChange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            setImageShop(reader.result)
          }
          reader.readAsDataURL(file)
        }
      }

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
        setProvince(shop?.province)
        setDistrict(shop?.district)
        setWard(shop?.ward)
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data)
                const province_id = response.data.data.find(item => item.ProvinceName === shop?.province)?.ProvinceID
                if (province_id) {
                    ghnApi.getDistricts(province_id)
                        .then(response => {
                            setDistricts(response.data.data)
                            const district_id = response.data.data.find(item => item.DistrictName === shop?.district)?.DistrictID
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
                image: 'https://cdn.oneesports.vn/cdn-data/wp-content/uploads/sites/4/2019/10/skt-logo-moi-1024x636.jpg',
                name: name,
                province: province,
                district: district,
                ward: ward,
                street: street,
                shop_id: shop?.shopId,
                district_id: district_id
            }
            shopApi.updateShop(data)
                .then(() => {
                    toast.success('Cập nhật thông tin shop thành công', { position: 'top-center', autoClose: 2000 })
                    setLoading(false)
                    setRerender(!rerender)
                })
                .catch((error) => {
                    toast.error('Cập nhật thông tin shop thất bại', { position: 'top-center', autoClose: 2000 })
                    console.log(error)
                })
                .finally(() => setLoading(false))
        }
        handleClose()
    }
    return (
        <div>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2 }}
                variant="contained" color="success" onClick={handleClickOpen}>Cập nhật thông tin shop</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Chỉnh sửa thông tin nhận hàng</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '550px' }}>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Thông tin shop</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label="Nhập tên shop" value={name} onChange={(e) => setName(e.target.value)} />
                        </Box>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Địa chỉ</Typography>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1 }}>
                            <Button component="label" htmlFor="upload-image" variant="contained" color="warning" sx={useStyles.button} >
                                <AddCircle sx={{ mr: 1 }} />
                                Ảnh của shop
                                <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageShopChange} />
                            </Button>
                            <img src={imageShop || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickUpdate} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Cập nhật</Button>
                </DialogActions>
            </Dialog>
            {loading && <Loading />}
        </div>
    )
}
export default UpdateShop

const useStyles = {
    button: {
      color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2
    }
  }