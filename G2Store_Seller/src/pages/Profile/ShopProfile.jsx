import { useState, useEffect } from 'react'
import { Typography, Box, Input, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import authenApi from '../../apis/authenApi'
import Loading from '../../components/Loading/Loading'
import UpdateShop from './UpdateShop/UpdateShop'
import UpdateImageShop from './UpdateShop/UpdateImageShop'

function ShopProfile() {
    const navigate = useNavigate()
    const [reRender, setReRender] = useState(false)
    const [shopReRender, setShopReRender] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shop, setShop] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            authenApi.me()
                .then(async (response) => {
                    setShop({
                        image: response?.shop?.image,
                        name: response?.shop?.name,
                        province_name: response?.shop?.province_name,
                        province_id: response?.shop?.province_id,
                        district_name: response?.shop?.district_name,
                        district_id: response?.shop?.district_id,
                        ward_code: response?.shop?.ward_code,
                        ward_name: response?.shop?.ward_name,
                        street: response?.shop?.street,
                        violation_point: response?.shop?.violation_point,
                        is_allowed_to_sell: response?.shop?.is_allowed_to_sell
                    })
                })
                .catch((error) => {
                    if (error?.response?.data?.message == 'Access Denied') {
                        navigate('/seller/access-denied')
                    }
                    console.log(error)
                })
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [reRender])

    return (
        <Paper sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', m: 2, p: 2, minHeight: '100vh' }}
            variant='outlined' >
            <Box sx={{ mb: 2 }}>
                <Typography variant='h6' sx={useStyles.inputTitle}>Thông tin shop</Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Tên shop:</Typography>
                    <Input readOnly placeholder='Tên shop' sx={{ ...useStyles.input, color: 'gray' }} value={shop?.name} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Trạng thái:</Typography>
                    <Input sx={{ ...useStyles.input, color: 'gray' }} value={shop?.is_allowed_to_sell ? 'Bình thường' : 'Cấm bán hàng'}
                        readOnly />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Vi phạm:</Typography>
                    <Input sx={{ ...useStyles.input, color: 'gray' }} value={shop?.violation_point} readOnly />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Địa chỉ:</Typography>
                    <Input readOnly placeholder='Địa chỉ' sx={{ ...useStyles.input, color: 'gray' }}
                        value={shop?.province_name ? `${shop?.street}, ${shop?.ward_name}, ${shop?.district_name}, ${shop?.province_name}` : ''} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                    <UpdateShop rerender={reRender} setRerender={setReRender} shop={shop} />
                    {/*Image Shop */}
                    <UpdateImageShop image={shop?.image} reRender={shopReRender} setReRender={setShopReRender} />
                </Box>
            </Box>
            {loading && <Loading />}
        </Paper>
    )
}

export default ShopProfile

const useStyles = {
    inputTitle: {
        fontWeight: 'bold', minWidth: '90px', color: '#4F4F4F'
    },
    input: {
        minWidth: { xs: 200, md: 500 },
        fontSize: 15,
        bgcolor: '#e8f0fe'
    },
    button: {
        color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2
    }
}