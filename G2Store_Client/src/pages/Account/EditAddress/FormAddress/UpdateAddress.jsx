import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, TextField, Dialog, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import ghnApi from '../../../../apis/ghnApi'
import addressApi from '../../../../apis/addressApi'
import Loading from '../../../../components/Loading/Loading'
import DialogAction from '../../../../components/Dialog/DialogAction'
import { IOSSwitch } from '../../../../components/Switch/Switch'
import DialogAddress from '../../../../components/Dialog/DialogAddress'

{/**use for Checkout Change address LeftInformation and Account update address */ }
function UpdateAddress({ address, rerender, setRerender }) {
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
    const [receiverName, setReceiverName] = useState('')
    const [orderReceiverAddress, setOrderReceiverAddress] = useState('')
    const [checked, setChecked] = useState(false)
    const [phoneNo, setPhoneNo] = useState('')
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
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data)
            })
            .catch(err => { console.log(err) })
        if (address?.address_id) {
            setReceiverName(address?.receiver_name)
            setPhoneNo(address?.receiver_phone_no)
            setOrderReceiverAddress(address?.order_receive_address)
            setChecked(address?.is_default)
            setProvince({ ProvinceName: address?.province_name, ProvinceID: address?.province_id })
            setDistrict({ DistrictName: address?.district_name, DistrictID: address?.district_id })
            setWard({ WardName: address?.ward_name, WardCode: address?.ward_code })
            ghnApi.getDistricts(address?.province_id)
                .then(response => {
                    setDistricts(response.data.data)
                })
            ghnApi.getWards(address?.district_id)
                .then(response => {
                    setWards(response.data.data)
                })
        }
        setOpen(true)
    }
    const handleFinish = async () => {
        if (ward?.WardCode == '') {
            toast.error('Vui lòng chọn địa chỉ !', { position: 'top-center', autoClose: 2000 })
        }
        else {
            setLoading(true)
            const data = {
                provinceName: province?.ProvinceName,
                order_receive_address: orderReceiverAddress,
                ward_code: ward?.WardCode,
                ward_name: ward?.WardName,
                district_id: district?.DistrictID,
                district_name: district?.DistrictName,
                province_id: province?.ProvinceID,
                receiver_name: receiverName,
                receiver_phone_no: phoneNo,
                is_default: checked
            }
            if (address?.address_id) {
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
            else {
                addressApi.addAddress(data)
                    .then(() => {
                        toast.success('Thêm địa chỉ thành công', { position: 'top-center', autoClose: 2000 })
                        setLoading(false)
                        setRerender(!rerender)
                    })
                    .catch((error) => {
                        toast.error('Thêm địa chỉ thất bại', { position: 'top-center', autoClose: 2000 })
                        console.log(error)
                    })
                    .finally(() => setLoading(false))
            }
        }
        handleClose()
    }
    return (
        <Box>
            {address?.address_id ?
                <Button color='error' sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit' } }} onClick={handleClickOpen}>Sửa</Button> :
                <Button size='small' variant='contained' color='error' className='gap-1' onClick={handleClickOpen}><AddCircle />Thêm</Button>}
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Chỉnh sửa thông tin nhận hàng</DialogTitle>
                <DialogContent >
                    <Box className='flex flex-col gap-2 w-[550px]'>
                        <Typography className=' min-w-fit text-gray-800'>Thông tin người nhận</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label="Nhập họ và tên" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
                            <TextField fullWidth size='small' label="Nhập số điện thoại" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </Box>
                        <Typography minWidth={'100px'} fontWeight={'bold'}>Địa chỉ nhận hàng</Typography>
                        <TextField fullWidth size='small' label='Tỉnh/Thành phố' value={province?.ProvinceName || 'Chọn tỉnh'} onClick={() => setOpenProvince(true)} />
                        <DialogAddress open={openProvince} setOpen={setOpenProvince} datas={provinces} handleClick={handleClickProvince} isProvince={true} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth size='small' label='Quận/Huyện' value={district?.DistrictName || 'Chọn huyện'} onClick={() => setOpenDistrict(true)} />
                            <DialogAddress open={openDistrict} setOpen={setOpenDistrict} datas={districts} handleClick={handleClickDistrict} isDistrict={true} />
                            <TextField fullWidth size='small' label='Phường/Xã' value={ward?.WardName || 'Chọn xã'} onClick={() => setOpenWard(true)} />
                            <DialogAddress open={openWard} setOpen={setOpenWard} datas={wards} handleClick={handleClickWard} isWard={true} />
                        </Box>
                        <TextField fullWidth inputMode='text' size='small' label="Đường/Tòa nhà" value={orderReceiverAddress} onChange={(e) => setOrderReceiverAddress(e.target.value)} />
                        <Box className='flex-row flex items-center justify-between'>
                            <Typography className=' min-w-fit text-gray-800'>Đặt làm địa chỉ mặc định</Typography>
                            <IOSSwitch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleFinish} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default UpdateAddress