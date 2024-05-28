import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, Paper } from '@mui/material'
import { AddCircle, NavigateNext, Clear } from '@mui/icons-material'
import { NumericFormat } from 'react-number-format'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import MenuCategory from './MenuCategory/MenuCategory'
import categoryApi from '../../../../apis/categoryApi'
import Loading from '../../../../components/Loading/Loading'

function Shipping() {
    const location = useLocation()
    const order = location.state
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertWarning, setShowAlertWarning] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleClickAdd = () => {

    }
    const fetchData = async () => {
        if (order) {
            return
        }
    }
    useEffect(() => {

    }, [])

    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thông tin cơ bản</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Tên sản phẩm: </Typography>
                    </Box>
                </Box>
                
              
            </Box>
          
            <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'end', pr: 5 }}>
                <Button onClick={() => { handleClickAdd() }} sx={{ bgcolor: '#1a71ff', color: 'white', fontWeight: '500', ':hover': { bgcolor: '#00B2EE' } }}>Gửi đi</Button>
            </Box>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Thêm sản phẩm thành công'} />
            <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Vui lòng không chọn cùng ảnh!'} isWarning={true} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Thêm sản phẩm thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default Shipping
