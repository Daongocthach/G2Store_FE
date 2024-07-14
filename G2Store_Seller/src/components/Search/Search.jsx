import SearchIcon from '@mui/icons-material/Search'
import { Paper, Button, Box, TextField } from '@mui/material'
import { useState } from 'react'
import productApi from '../../apis/productApi'
import orderApi from '../../apis/orderApi'

function Search({ setDatas, isProductId, setTab, isVoucherId, isVoucherName, isOrder, reRender, setReRender, setVoucherName, setVoucherId, fetchData }) {
    const [data_id, setDataId] = useState('')
    const handleChange = (value) => {
        if (isVoucherName) {
            setVoucherName(value)
        } else if (isVoucherId) {
            setVoucherId(value)
        }
        if (!value) {
            setReRender(!reRender)
        }
        if (isOrder || isProductId)
        setDataId(value)
    }
    const handleSearch = async () => {
        if (isProductId) {
            productApi.getProduct(parseInt(data_id))
                .then(response => { setDatas([response]) })
        }
        if (isVoucherId) {
            fetchData()
        }
        if (isVoucherName) {
            fetchData()
        }
        if (isOrder) {
            orderApi.getOrder(parseInt(data_id))
                .then(response => { setDatas([response]), setTab('') })
        }
    }
    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <TextField type='search' size='small'
                    placeholder={isVoucherName ? 'Nhập tên' : 'Nhập mã'}
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
        </Box>
    )
}

export default Search