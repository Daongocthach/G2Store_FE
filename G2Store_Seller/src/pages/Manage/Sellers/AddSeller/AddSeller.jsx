import { useState } from 'react'
import { Button, TextField, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import sellerApi from '../../../../apis/sellerApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'
import { validateEmail } from '../../../../utils/email'

const roles = ['SELLER_PROMOTION_ACCESS',
    'SELLER_PRODUCT_ACCESS',
    'JUNIOR_CHAT_AGENT',
    'SELLER_ORDER_MANAGEMENT',
    'SELLER_FULL_ACCESS',
    'SELLER_READ_ONLY']

function AddSeller() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleChangeRole = (event) => {
        setRole(event.target.value)
    }
    const handleClickAdd = () => {
        if (!validateEmail(email) || password !== rePassword || role == '') {
            setShowAlertFail(true)
        }
        else {
            setLoading(true)
            sellerApi.addSeller(email, password, role, 2)
                .then(() => {
                    setShowAlert(true)
                    setTimeout(() => {
                        navigate('/manage/sellers')
                    }, 1000)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thêm người dùng</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Vai trò: </Typography>
                    </Box>
                    <FormControl fullWidth>
                        <Select size='small' value={role} onChange={handleChangeRole}>
                            {roles?.map((role, index) => {
                                return (
                                    <MenuItem key={index} value={index}>{role}</MenuItem>
                                )
                            })}
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

            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Đăng ký thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đăng ký thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default AddSeller