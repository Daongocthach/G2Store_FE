import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, FormControlLabel, RadioGroup, Radio, InputAdornment, OutlinedInput, FormHelperText } from '@mui/material'
import { format, addDays } from 'date-fns'
import voucherApi from '../../../../apis/voucherApi'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function AddVoucher() {
    const triggerAlert = useAlert()
    const navigate = useNavigate()
    const location = useLocation()
    const voucher = location.state
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [endDate, setEndDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'))
    const [voucherType, setVoucherType] = useState('SHOP_VOUCHER')
    const [minSpend, setMinSpend] = useState(8000)
    const [percentReduce, setPercentReduce] = useState(1)
    const [priceReduce, setPriceReduce] = useState(1000)
    const [quantity, setQuantity] = useState(100)
    const [discoutType, setDiscoutType] = useState('PRICE')
    useEffect(() => {
        if (voucher) {
            setName(voucher?.name)
            setStartDate(format(new Date(voucher?.start_date), 'yyyy-MM-dd'))
            setEndDate(format(new Date(voucher?.end_date), 'yyyy-MM-dd'))
            setVoucherType(voucher?.voucher_type)
            setMinSpend(voucher?.min_spend)
            setPercentReduce(voucher?.reduce_percent)
            setPriceReduce(voucher?.reduce_price)
            setDiscoutType(voucher?.discount_type)
        }
    }, [])
    const checkOverMinSpend = () => {
        if (discoutType == 'PRICE') {
            return (priceReduce / minSpend) > 0.3
        }
        return (percentReduce / 100) > 0.3
    }
    const handleClickAdd = async () => {
        if (!name || !startDate || !endDate || !minSpend || !quantity) {
            triggerAlert('Vui lòng kiểm tra lại thông tin!', false, true)
        }
        else if (minSpend < 0 || (discoutType === 'PRICE' && priceReduce < 0) ||
            (discoutType === 'PERCENTAGE' && (percentReduce < 0 || percentReduce > 100))) {
            triggerAlert('Thông tin không đúng! vui lòng đặt lại các giá trị!', false, true)
        }
        else {
            const voucherData = {
                name: name,
                quantity: quantity,
                start_date: startDate,
                end_date: endDate,
                discount_type: discoutType,
                voucher_type: voucherType,
                min_spend: minSpend,
                reduce_price: discoutType == 'PRICE' ? priceReduce : null,
                reduce_percent: discoutType == 'PERCENTAGE' ? percentReduce : null
            }
            voucherApi.addVoucher(voucherData)
                .then(() => {
                    triggerAlert('Thêm thành công!', false, false)
                    setTimeout(() => {
                        navigate('/seller/manage/vouchers')
                    }, 1000)
                })
                .catch(error => {
                    console.log(error)
                    triggerAlert('Thêm thất bại!', true, false)
                })
        }
    }
    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8', minHeight: '100%' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Tạo mã giảm giá</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Tên mã giảm giá: </Typography>
                    </Box>
                    <TextField onFocus={(e) => e.target.select()} fullWidth size='small' placeholder='Ex: Mã cho người mới' value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Ngày bắt đầu: </Typography>
                    </Box>
                    <TextField fullWidth size='small' type='datetime-local' value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Ngày kết thúc: </Typography>
                    </Box>
                    <TextField fullWidth size='small' error={startDate > endDate} type='datetime-local' value={endDate}
                        helperText={startDate > endDate ? 'Ngày kết thúc phải lớn hơn ngày bắt đầu' : ''}
                        onChange={(e) => setEndDate(e.target.value)} />
                </Box>
                <Box >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Mã giảm được áp dụng cho: </Typography>
                    </Box>
                    <RadioGroup row onChange={(e) => setVoucherType(e.target.value)} value={voucherType}>
                        <FormControlLabel value={'SHOP_VOUCHER'} control={<Radio />} label='Toàn gian hàng' />
                        <FormControlLabel value={'FREE_SHIP_VOUCHER'} control={<Radio />} label='Phí vận chuyển' />
                    </RadioGroup>
                </Box>
            </Box>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thiết lập khuyến mãi</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Loại mã giảm giá: </Typography>
                    </Box>
                    <RadioGroup row onChange={(e) => setDiscoutType(e.target.value)} value={discoutType}>
                        <FormControlLabel value={'PRICE'} control={<Radio />} label='Giảm giá theo tiền' />
                        <FormControlLabel value={'PERCENTAGE'} control={<Radio />} label='Giảm giá theo phần trăm' />
                    </RadioGroup>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Giá trị đơn hàng tối thiểu: </Typography>
                        </Box>
                        <Box>
                            <OutlinedInput size='small' type='number'
                                endAdornment={<InputAdornment position='end'>đ</InputAdornment>} onFocus={(e) => e.target.select()}
                                inputProps={{ min: 0 }} sx={{ width: 200 }} error={!minSpend} value={minSpend}
                                onChange={(e) => setMinSpend(e.target.value)} />
                            <FormHelperText error sx={{ visibility: !minSpend ? 'visible' : 'hidden' }}>Không được để trống</FormHelperText>
                        </Box>

                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Giảm giá: </Typography>
                        </Box>
                        {discoutType == 'PRICE' ?
                            <Box>
                                <OutlinedInput size='small' sx={{ width: 200 }} type='number'
                                    endAdornment={<InputAdornment position='end'>đ</InputAdornment>} onFocus={(e) => e.target.select()}
                                    inputProps={{ min: 1000, inputMode: 'numeric' }}
                                    error={checkOverMinSpend()}
                                    value={priceReduce} onChange={(e) => setPriceReduce(e.target.value)} />
                                <FormHelperText sx={{ color: 'orange', visibility: checkOverMinSpend() ? 'visible' : 'hidden' }}>
                                    Giảm giá vượt quá 30%
                                </FormHelperText>
                            </Box>
                            :
                            <Box>
                                <OutlinedInput size='small' sx={{ width: 200 }} type='number'
                                    endAdornment={<InputAdornment position='end'>%</InputAdornment>} onFocus={(e) => e.target.select()}
                                    inputProps={{ min: 0, max: 100 }} error={checkOverMinSpend()} value={percentReduce}
                                    onChange={(e) => setPercentReduce(e.target.value)} />
                                <FormHelperText sx={{ color: 'orange', visibility: checkOverMinSpend() ? 'visible' : 'hidden' }}>
                                    Giảm giá vượt quá 30%
                                </FormHelperText>
                            </Box>
                        }
                    </Box>
                    <Box className='items-center gap-1' sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Số lượng mã giảm giá: </Typography>
                        </Box>
                        <Box>
                            <OutlinedInput size='small' type='number' onFocus={(e) => e.target.select()}
                                inputProps={{ min: 0 }} sx={{ width: 200 }} error={!quantity} value={quantity}
                                onChange={(e) => setQuantity(e.target.value)} />
                            <FormHelperText error sx={{ visibility: !quantity ? 'visible' : 'hidden' }}>
                                Không được để trống
                            </FormHelperText>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className='flex flex-row items-end justify-end pr-5'>
                <Button onClick={() => { handleClickAdd() }}
                    sx={{ bgcolor: '#1a71ff', color: 'white', fontWeight: '500', ':hover': { bgcolor: '#00B2EE' } }}>Gửi</Button>
            </Box>
        </Box>
    )
}
export default AddVoucher