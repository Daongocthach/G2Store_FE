import SearchIcon from '@mui/icons-material/Search'
import { Paper, Button, Box, TextField, CircularProgress } from '@mui/material'
import { useState } from 'react'
import productApi from '../../apis/productApi'
import orderApi from '../../apis/orderApi'
import voucherApi from '../../apis/voucherApi'
import ShowAlert from '../ShowAlert/ShowAlert'

function SearchById({ setDatas, isProductId, setTab, isVoucherId, isVoucherName, reRender, setReRender, setVoucherName }) {
    const [data_id, setDataId] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleChange = (value) => {
        if (isVoucherName) {
            setVoucherName('')
        }
        if (!value) {
            setReRender(!reRender)
        }
        setDataId(value)
    }
    const handleSearch = async () => {
        setLoading(true)
        if (isProductId) {
            productApi.getProduct(parseInt(data_id))
                .then(response => { setDatas([response]) })
                .catch(() => { setShowAlertFail(true) })
                .finally(() => setLoading(false))
        }
        if (isVoucherId) {
            voucherApi.getVoucherById(data_id)
                .then(response => { setDatas([response]) })
                .catch(() => { setShowAlertFail(true) })
                .finally(() => setLoading(false))
        }
        if (isVoucherName) {
            setVoucherName(data_id)
            setLoading(false)
        }
        else {
            orderApi.getOrder(parseInt(data_id))
                .then(response => { setDatas([response]), setTab('') })
                .catch(() => { setShowAlertFail(true) })
                .finally(() => setLoading(false))
        }
    }
    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <TextField type='search' size='small'
                    placeholder={isProductId ? 'Nhập mã sản phẩm' : isVoucherId ? 'Nhập mã giảm giá' : isVoucherName ? 'Nhập tên mã' : 'Nhập mã đơn hàng'}
                    sx={{
                        flex: 1, height: 40, fontSize: 14,
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'transparent' }
                        }
                    }} onChange={(e) => handleChange(e.target.value)} onFocus={(e) => e.target.select()} />
                <Button type="button" onClick={handleSearch} sx={{ height: 40, bgcolor: '#EE7942', color: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                    <SearchIcon />
                </Button>
            </Paper>
            {loading && <CircularProgress />}
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Id không được tìm thấy!'} isFail={true} />
        </Box>
    )
}

export default SearchById