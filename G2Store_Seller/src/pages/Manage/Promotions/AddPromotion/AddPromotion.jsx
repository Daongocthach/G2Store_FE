import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, FormControlLabel, RadioGroup, Radio, InputAdornment, OutlinedInput, FormHelperText } from '@mui/material'
import promotionApi from '../../../../apis/promotionApi'
import { addPromotion } from '../../../../redux/actions/promotions'
import { formatDate } from '../../../../utils/date'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'

function AddPromotion() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState(formatDate(new Date()))
    const [endDate, setEndDate] = useState(formatDate(new Date()))
    const [promotionType, setPromotionType] = useState('SHOP_DISCOUNT')
    const [minSpend, setMinSpend] = useState(8000)
    const [percentDiscount, setPercentDiscount] = useState(10)
    const [priceDiscount, setPriceDiscount] = useState(2000)
    const [quantity, setQuantity] = useState(10)
    const [maxUsePerCus, setMaxUsePerCus] = useState(1)
    const [select, setSelect] = useState(1)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertWarning, setShowAlertWarning] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const checkOverMinSpend = () => {
        if (select == 1) {
            return (priceDiscount / minSpend) > 0.3
        }
        return (percentDiscount / 100) > 0.3
    }
    const handleClickAdd = () => {
        if (name && startDate && endDate && minSpend && quantity && maxUsePerCus) {
            const promotionData = {
                name,
                startDate,
                endDate,
                promotionType,
                minSpend,
                percentDiscount,
                priceDiscount,
                quantity,
                maxUsePerCus,
                suspended: false,
                shopId: 1
            }
            promotionApi.addPromotion(promotionData)
                .then((response) => {
                    setShowAlert(true)
                    dispatch(addPromotion(response.data))
                    setTimeout(() => {
                        navigate('/manage/promotions')
                      }, 1000)
                })
                .catch(error => {
                    console.log(error)
                    setShowAlertFail(true)
                })
        }
        else {
            setShowAlertWarning(true)
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
                    <TextField onFocus={(e) => e.target.select()} fullWidth size='small' placeholder='Ex: Mã cho người mới' value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Ngày bắt đầu: </Typography>
                    </Box>
                    <TextField fullWidth size='small' type='datetime-local' placeholder={'ss'} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
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
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Mã giảm được áp dụng cho: </Typography>
                    </Box>
                    <RadioGroup row onChange={(e) => setPromotionType(e.target.value)} value={promotionType}>
                        <FormControlLabel value={'SHOP_DISCOUNT'} control={<Radio />} label='Toàn gian hàng' />
                        <FormControlLabel value={'FREE_SHIP'} control={<Radio />} label='Phí vận chuyển' />
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
                    <RadioGroup row onChange={(e) => setSelect(e.target.value)} value={select}>
                        <FormControlLabel value={1} control={<Radio />} label='Giảm giá theo tiền' />
                        <FormControlLabel value={2} control={<Radio />} label='Giảm giá theo phần trăm' />
                    </RadioGroup>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Giá trị đơn hàng tối thiểu: </Typography>
                        </Box>
                        <Box>
                            <OutlinedInput size='small' type='number' endAdornment={<InputAdornment position='end'>đ</InputAdornment>} onFocus={(e) => e.target.select()}
                                inputProps={{ min: 0 }} sx={{ width: 200 }} error={!minSpend} value={minSpend} onChange={(e) => setMinSpend(e.target.value)} />
                            <FormHelperText error sx={{ visibility: !minSpend ? 'visible' : 'hidden' }}>Không được để trống</FormHelperText>
                        </Box>

                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Giảm giá: </Typography>
                        </Box>
                        {select == 1 ?
                            <Box>
                                <OutlinedInput size='small' sx={{ width: 200 }} type='number' endAdornment={<InputAdornment position='end'>đ</InputAdornment>} onFocus={(e) => e.target.select()}
                                    inputProps={{ min: 0, inputMode: 'numeric' }} error={checkOverMinSpend()} value={priceDiscount} onChange={(e) => setPriceDiscount(e.target.value)} />
                                <FormHelperText sx={{ color: 'orange', visibility: checkOverMinSpend() ? 'visible' : 'hidden' }}> Giảm giá vượt quá 30%</FormHelperText>
                            </Box>
                            :
                            <Box>
                                <OutlinedInput size='small' sx={{ width: 200 }} type='number' endAdornment={<InputAdornment position='end'>%</InputAdornment>} onFocus={(e) => e.target.select()}
                                    inputProps={{ min: 0, max: 100 }} error={checkOverMinSpend()} value={percentDiscount} onChange={(e) => setPercentDiscount(e.target.value)} />
                                <FormHelperText sx={{ color: 'orange', visibility: checkOverMinSpend() ? 'visible' : 'hidden' }}> Giảm giá vượt quá 30%</FormHelperText>
                            </Box>
                        }
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Số lượng mã giảm giá: </Typography>
                        </Box>
                        <Box>
                            <OutlinedInput size='small' type='number' endAdornment={<InputAdornment position='end'>đ</InputAdornment>} onFocus={(e) => e.target.select()}
                                inputProps={{ min: 0 }} sx={{ width: 200 }} error={!quantity} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            <FormHelperText error sx={{ visibility: !quantity ? 'visible' : 'hidden' }}>Không được để trống</FormHelperText>
                        </Box>
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Số lượng cho mỗi khách hàng: </Typography>
                        </Box>
                        <Box>
                            <OutlinedInput size='small' type='number' endAdornment={<InputAdornment position='end'>đ</InputAdornment>} onFocus={(e) => e.target.select()}
                                inputProps={{ min: 0 }} sx={{ width: 200 }} error={!maxUsePerCus} value={maxUsePerCus} onChange={(e) => setMaxUsePerCus(e.target.value)} />
                            <FormHelperText error sx={{ visibility: !maxUsePerCus ? 'visible' : 'hidden' }}>Không được để trống</FormHelperText>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'end', pr: 5 }}>
                <Button onClick={() => { handleClickAdd() }} sx={{ bgcolor: '#1a71ff', color: 'white', fontWeight: '500', ':hover': { bgcolor: '#00B2EE' } }}>Gửi</Button>
            </Box>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Thêm thành công'} />
            <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Vui lòng kiểm tra lại thông tin'} isWarning={true} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Thêm thất bại'} isFail={true} />
        </Box>
    )
}
export default AddPromotion