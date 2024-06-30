import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, TextField, Dialog, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import ghnApi from '../../../apis/ghnApi'
import Loading from '../../../components/Loading/Loading'
import shopApi from '../../../apis/shopApi'
import DialogAction from '../../../components/Dialog/DialogAction'
import DialogAddress from '../../../components/Dialog/DialogAddress'

function UpdateShop({ shop, rerender, setRerender }) {
    const [open, setOpen] = useState(false)
    const [openProvince, setOpenProvince] = useState(false)
    const [openDistrict, setOpenDistrict] = useState(false)
    const [openWard, setOpenWard] = useState(false)
    const [loading, setLoading] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState({ ProvinceName: '', ProvinceID: null })
    const [district, setDistrict] = useState({ DistrictName: '', DistrictID: null })
    const [ward, setWard] = useState({ WardName: '', WardCode: '' })
    const [name, setName] = useState(shop?.name)
    const [street, setStreet] = useState(shop?.street)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickProvince = (value) => {
        if (value?.ProvinceID) {
            setProvince({ ProvinceName: value?.ProvinceName, ProvinceID: value?.ProvinceID })
            ghnApi.getDistricts(value?.ProvinceID)
                .then(response => {
                    setDistricts(response.data.data)
                    setDistrict({ DistrictName: '', DistrictID: null })
                    setWard({ WardName: '', WardCode: '' })
                })
        }
    }
    const handleClickDistrict = (value) => {
        if (value?.DistrictID) {
            setDistrict({ DistrictName: value?.DistrictName, DistrictID: value?.DistrictID })
            ghnApi.getWards(value?.DistrictID)
                .then(response => {
                    setWards(response.data.data)
                })
        }
    }
    const handleClickWard = (value) => {
        setWard({ WardName: value?.WardName, WardCode: value?.WardCode })
    }
    const handleClickOpen = async () => {
        setName(shop?.name)
        setStreet(shop?.street)
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data)
            })
            .catch(err => { console.log(err) })
        if (shop?.province_id && shop?.district_id) {
            setProvince({ ProvinceName: shop?.province_name, ProvinceID: shop?.province_id })
            setDistrict({ DistrictName: shop?.district_name, DistrictID: shop?.district_id })
            setWard({ WardName: shop?.ward_name, WardCode: shop?.ward_code })
            ghnApi.getDistricts(shop?.province_id)
                .then(response => {
                    setDistricts(response.data.data)
                })
            ghnApi.getWards(shop?.district_id)
                .then(response => {
                    setWards(response.data.data)
                })
        }
        setOpen(true)
    }
    const handleClickUpdate = async () => {
        if (ward == '') {
            toast.error('Vui lòng chọn địa chỉ !', { position: 'top-center', autoClose: 2000 })
        }
        else {
            setLoading(true)
            const data = {
                name: name,
                street: street,
                province_id: province?.ProvinceID,
                province_name: province?.ProvinceName,
                district_id: district?.DistrictID,
                district_name: district?.DistrictName,
                ward_code: ward?.WardCode,
                ward_name: ward?.WardName
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
                <DialogTitle >Chỉnh sửa thông tin shop</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '550px' }}>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Thông tin shop</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label="Nhập tên shop" value={name} onChange={(e) => setName(e.target.value)} />
                        </Box>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Địa chỉ</Typography>
                        <TextField fullWidth size='small' label='Tỉnh/Thành phố' value={province?.ProvinceName || 'Chọn tỉnh'} onClick={() => setOpenProvince(true)} />
                        <DialogAddress open={openProvince} setOpen={setOpenProvince} datas={provinces} handleClick={handleClickProvince} isProvince={true} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label='Quận/Huyện' value={district?.DistrictName || 'Chọn huyện'} onClick={() => setOpenDistrict(true)} />
                            <DialogAddress open={openDistrict} setOpen={setOpenDistrict} datas={districts} handleClick={handleClickDistrict} isDistrict={true} />
                            <TextField fullWidth size='small' label='Phường/Xã' value={ward?.WardName || 'Chọn xã'} onClick={() => setOpenWard(true)} />
                            <DialogAddress open={openWard} setOpen={setOpenWard} datas={wards} handleClick={handleClickWard} isWard={true} />
                        </Box>
                        <TextField fullWidth inputMode='text' size='small' label="Đường/Tòa nhà" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </Box>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickUpdate} />
            </Dialog>
            {loading && <Loading />}
        </div>
    )
}
export default UpdateShop
