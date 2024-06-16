import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import Loading from '../../../../components/Loading/Loading'
import ghnApi from '../../../../apis/ghnApi'
import orderApi from '../../../../apis/orderApi'
import authenApi from '../../../../apis/authenApi'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function CreateOrderGhn() {
    const triggerAlert = useAlert()
    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state
    const [seller, setSeller] = useState()
    const [requiredNote, setRequiredNote] = useState('KHONGCHOXEMHANG')
    const [content, setContent] = useState('')
    const [pickShipId, setPickShipId] = useState()
    const [pickShips, setPickShips] = useState([])
    const [loading, setLoading] = useState(false)
    const handleClickAdd = async () => {
        if (!requiredNote || !content || !pickShipId) {
            triggerAlert('Vui lòng điền đủ thông tin!', false, true)
        }
        else {
            setLoading(true)
            ghnApi.createOrder(
                {
                    payment_type_id: 2,
                    required_note: requiredNote,
                    from_name: seller?.name,
                    from_phone: seller?.phone_no,
                    from_address: '72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam' || seller?.shop?.street,
                    from_ward_name: 'Phường 1' || seller?.shop?.ward,
                    from_district_name: 'Quận 10' || seller?.shop?.district,
                    from_province_name: 'HCM' || seller?.shop?.province,
                    to_name: order?.address?.receiver_name,
                    to_phone: '0373060206' || order?.address?.receiver_phone_no,
                    to_address: order?.address?.order_receive_address,
                    to_ward_code: '20308',
                    to_district_id: 1444,
                    cod_amount: order?.total,
                    content: content,
                    weight: 200,
                    length: 15,
                    width: 5,
                    height: 1,
                    pick_station_id: 1444,
                    service_id: 53320,
                    service_type_id: 2,
                    pick_shift: [pickShipId],
                    items: order?.items
                })
                .then((response) => {
                    console.log(response?.data?.data?.order_code)
                    orderApi.updateOrder(order?.order_id, 'PACKED')
                        .then(() => {
                            triggerAlert('Tạo đơn thành công', false, false)
                            navigate('/seller/manage/orders')
                        })
                        .catch(error => {
                            console.log(error)
                            triggerAlert('Tạo đơn thất bại!', true, false)
                        })
                })
                .catch(error => {
                    console.log(error)
                    triggerAlert('Tạo đơn thất bại!', true, false)
                })
                .finally(setLoading(false))
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            authenApi.me()
                .then((response) => {
                    setSeller(response)
                })
                .catch((error) => console.log(error))
            ghnApi.getPickShips()
                .then((response) => {
                    setPickShips(response?.data?.data)
                })
                .catch((error) => console.log(error))
                .finally(setLoading(false))
        }
        fetchData()
    }, [])
    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thông tin đơn hàng</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Ghi chú: </Typography>
                    </Box>
                    <TextField fullWidth size='small' placeholder='KHONGCHOXEMHANG' value={requiredNote} onChange={(e) => setRequiredNote(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Nội dung: </Typography>
                    </Box>
                    <TextField fullWidth size='medium' multiline rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
                </Box>
            </Box>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Chọn gói dịch vụ</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Ca lấy hàng: </Typography>
                    </Box>
                    {Array.isArray(pickShips) && <FormControl fullWidth>
                        <Select size='small' variant={'standard'} color='primary' value={pickShipId}
                            onChange={(event) => setPickShipId(event.target.value)}>
                            {pickShips.map((pickShip, index) => (
                                <MenuItem key={index} value={pickShip?.id}>{pickShip?.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>}
                </Box>
            </Box>
            <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'end', pr: 5 }}>
                <Button onClick={() => { handleClickAdd() }} variant='contained' sx={{ ':hover': { bgcolor: '#00B2EE' } }}>Tạo đơn hàng</Button>
            </Box>
            {loading && <Loading />}
        </Box>
    )
}
export default CreateOrderGhn
