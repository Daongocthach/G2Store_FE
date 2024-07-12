import { useState } from 'react'
import { Button, TextField, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import sellerApi from '../../../../apis/sellerApi'
import Loading from '../../../../components/Loading/Loading'
import { validateEmail } from '../../../../utils/email'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function AddSeller() {
    const triggerAlert = useAlert()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [role, setRole] = useState(3)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const handleChangeRole = (event) => {
        setRole(event.target.value)
    }
    const handleClickAdd = () => {
        if (!validateEmail(email) || password !== rePassword || !role) {
            triggerAlert('Vui lòng kiểm tra lại thông tin!', false, true)
        }
        else {
            setLoading(true)
            sellerApi.addShopSeller(email, password, role)
                .then(() => {
                    triggerAlert('Đăng ký thành công!', false, false)
                    navigate('/seller/manage/sellers')
                })
                .catch(error => {
                    triggerAlert('Đăng ký thất bại!', true, false)
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8', minHeight: '100vh' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thêm người bán</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Vai trò: </Typography>
                    </Box>
                    <FormControl fullWidth>
                        <Select size='small' color='primary' value={role}
                            onChange={(event) => handleChangeRole(event)}>
                            <MenuItem value={3}>Quản lý khuyến mãi</MenuItem>
                            <MenuItem value={4}>Toàn quyền</MenuItem>
                            <MenuItem value={5}>Quản lý sản phẩm shop</MenuItem>
                            <MenuItem value={6}>Quản lý đơn hàng</MenuItem>
                            <MenuItem value={7}>Chỉ xem</MenuItem>
                            <MenuItem value={8}>Tương tác khách hàng</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Email: </Typography>
                    </Box>
                    <TextField
                        size="small"
                        placeholder='Email'
                        fullWidth
                        sx={{ bgcolor: 'white', borderRadius: 3 }}
                        onChange={e => setEmail(e.target.value)}
                        error={!validateEmail(email)}
                        helperText={validateEmail(email) ? '' : 'Email không đúng định dạng'}
                    />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Mật khẩu: </Typography>
                    </Box>
                    <TextField fullWidth size='small' type='password' placeholder='Mật khẩu' onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Xác nhận mật khẩu: </Typography>
                    </Box>
                    <TextField
                        placeholder="Nhập lại mật khẩu"
                        size="small"
                        type='password'
                        fullWidth
                        sx={{ bgcolor: 'white', borderRadius: 3 }}
                        onChange={e => setRePassword(e.target.value)}
                        error={password !== rePassword}
                        helperText={password !== rePassword ? 'Password không trùng khớp' : ''}
                    />
                </Box>
            </Box>
            <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'end', pr: 5 }}>
                <Button onClick={() => { handleClickAdd() }} sx={{ bgcolor: '#1a71ff', color: 'white', fontWeight: '500', ':hover': { bgcolor: '#00B2EE' } }}>Đăng ký</Button>
            </Box>
            {loading && <Loading />}
        </Box>
    )
}
export default AddSeller