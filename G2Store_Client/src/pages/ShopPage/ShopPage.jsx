import { useState, useEffect } from 'react'
import { Box, CircularProgress, Tabs, Tab, Container } from '@mui/material'
import { useLocation } from 'react-router-dom'
import shopApi from '../../apis/shopApi'
import productApi from '../../apis/productApi'
import Header from './Header/Header'
import ShopInfo from './ShopInfo/ShopInfo'
import ShopProducts from './ShopProducts/ShopProducts'

function ShopPage() {
    const location = useLocation()
    const shop_id = location.state
    const [shop, setShop] = useState({})
    const [top5products, setTop5Products] = useState([])
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            shopApi.getShopById(shop_id)
                .then((response) => { setShop(response) })
                .catch((error) => console.log(error))
            productApi?.getTop5ShopProducts(shop_id)
                .then((response) => setTop5Products(response))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        if (shop_id)
            fetchData()
    }, [shop_id])
    return (
        <Container className="min-h-screen p-2">
            <Header shop={shop} />
            <Box className="flex items-center">
                <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                    <Tab label="Hồ sơ" />
                    <Tab label="Sản phẩm" />
                </Tabs>
            </Box>
            <Box display={tab === 0 ? 'inherit' : 'none'} className='ml-3'>
                {loading && <CircularProgress />}
                {!loading && (
                    <ShopInfo shop={shop} top5products={top5products} />
                )}
            </Box>
            <Box display={tab === 1 ? 'inherit' : 'none'}>
                <ShopProducts shop_id={shop_id} setTab={setTab} />
            </Box>
        </Container>

    )
}
export default ShopPage
