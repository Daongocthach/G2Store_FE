import { useState, useEffect } from 'react'
import {
    Typography, Grid, Box, Menu, Chip, Avatar, CircularProgress, Input, Rating, Pagination,
    FormControl, MenuItem, Select, Tooltip, Tabs, Tab
} from '@mui/material'
import { ChatBubbleOutline, AddBusiness, Dehaze, KeyboardArrowDown, RestartAlt } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import imageShop from '../../assets/img/shopDesign.png'
import MenuCategory from '../../components/MenuCategory/MenuCategory'
import shopApi from '../../apis/shopApi'
import Loading from '../../components/Loading/Loading'
import avatarNull from '../../assets/img/avatar.png'
import CardProduct from '../../components/Product/CardProduct'
import productApi from '../../apis/productApi'

const sortList = [
    { value: 'DEFAULT', lable: 'Mặc định' },
    { value: 'TOP_SELLER', lable: 'Bán chạy nhất' },
    { value: 'NEWEST', lable: 'Mới nhất' },
    { value: 'PRICE_ASC', lable: 'Giá tăng dần' },
    { value: 'PRICE_DESC', lable: 'Giá giảm dần' }
]

function ShopPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const shop_id = location.state
    const [page, setPage] = useState(1)
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([])
    const [sort, setSort] = useState('DEFAULT')
    const [top5products, setTop5Products] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleChangePage = (event, value) => {
        setPage(value)
    }
    const handelReset = () => {
        setCategory(null)
        setSort('DEFAULT')
    }
    const handleClickChat = () => {
        navigate('/chat', {})
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            shopApi.getShopById(shop_id)
                .then((response) => {
                    setShop(response)
                })
                .catch((error) => console.log(error))
            productApi?.getTop5ShopProducts(shop_id)
                .then((response) => setTop5Products(response))
                .catch((error) => console.log(error))

            shopApi.getShopCategories(shop_id)
                .then((response) => setCategories(response))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        if (shop_id)
            fetchData()
    }, [shop_id])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (category?.shop_cate_id) {
                setTab(1)
                productApi.getProductsByShopCategoryId(category?.shop_cate_id, page - 1, 12)
                    .then((response) => setProducts(response))
                    .catch((error) => console.log(error))
            }
            else {
                productApi.getShopProducts(shop_id, page - 1, 12, sort)
                    .then((response) => {
                        setProducts(response)
                    })
                    .catch((error) => console.log(error))
            }
            setLoading(false)
        }
        if (shop_id)
            fetchData()
    }, [page, category, sort, shop_id])
    return (
        <Box className="min-h-screen p-2">
            <Box className="flex items-center justify-start bg-orange-500 h-30 relative">
                <img src={imageShop} className="object-cover h-40 w-full" />
                <Box className="absolute flex items-center bg-white h-22 ml-2 p-5 gap-3 rounded-lg flex-wrap">
                    <Avatar className="w-12 h-12">
                        <img src={shop?.image || avatarNull} className="object-contain w-full h-full" />
                    </Avatar>
                    <Box className='w-40'>
                        <Typography variant="h6" className='text-gray-600'>{shop?.name}</Typography>
                        <Typography variant="subtitle2" className='text-gray-600'>Vi phạm: {shop?.violation_point}</Typography>
                    </Box>
                    <Box className="flex flex-col items-center justify-center cursor-pointer">
                        <ChatBubbleOutline className="text-[#193744]" onClick={handleClickChat} />
                        <Typography variant="subtitle2" className='text-gray-600'>Chat</Typography>
                    </Box>
                    <Box className="flex flex-col items-center justify-center cursor-pointer">
                        <AddBusiness className="text-[#193744]" />
                        <Typography variant="subtitle2" className='text-gray-600'>Theo dõi</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="flex items-center">
                <Chip icon={<Dehaze sx={{ fontSize: 20 }} />} clickable label="Danh mục ngành hàng"
                    sx={{
                        color: '#444444', bgcolor: 'transparent', paddingX: '5px', borderRadius: 4, fontSize: 15,
                        '& .MuiSvgIcon-root': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444') },
                        '&:hover': { bgcolor: 'primary.50' }
                    }}
                    onClick={handleClick} onDelete={handleClick} deleteIcon={<KeyboardArrowDown />}
                />
                <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                    <Tab label="Hồ sơ" />
                    <Tab label="Sản phẩm" />
                </Tabs>
            </Box>
            <Box display={tab === 0 ? 'inherit' : 'none'} className='ml-3'>
                <Box className="flex flex-col md:flex-row gap-1 mt-1 mb-1">
                    <Typography variant="subtitle2" className='min-w-[90px] text-[#4F4F4F]'>Tên shop:</Typography>
                    <Input placeholder="Tên shop" className='min-w-[200px] md:min-w-[500px] text-base bg-[#e8f0fe]' readOnly value={shop?.name} />
                </Box>
                <Box className="flex flex-col md:flex-row gap-1 mt-1 mb-1">
                    <Typography variant="subtitle2" className='min-w-[90px] text-[#4F4F4F]'>Địa chỉ:</Typography>
                    <Input
                        readOnly
                        placeholder="Địa chỉ"
                        className='min-w-[200px] md:min-w-[500px] text-base bg-[#e8f0fe]'
                        value={shop?.province_name ? `${shop?.street}, ${shop?.ward_name}, ${shop?.district_name}, ${shop?.province_name}` : ''}
                    />
                </Box>
                <Box className="flex flex-col md:flex-row gap-1 mt-1 mb-1">
                    <Typography variant="subtitle2" className='min-w-[90px] text-[#4F4F4F]'>Số lượt bán:</Typography>
                    <Input placeholder="Tên shop" className='min-w-[200px] md:min-w-[500px] text-base bg-[#e8f0fe]' readOnly value="5 Sản phẩm" />
                </Box>
                <Box className="flex items-center w-full gap-1 mt-2">
                    <Typography variant="body1" className="w-1 bg-[#007fff] text-[#007fff]">|</Typography>
                    <Typography variant="h6" color="#444444">Sản phẩm nổi bật</Typography>
                </Box>
                <Box className="flex items-center">
                    {loading && <CircularProgress />}
                    {!loading && (
                        <Grid container spacing={1} maxWidth="lg">
                            {Array.isArray(top5products) && top5products.map((product, index) => (
                                <Grid key={index} item xs={6} sm={6} md={3} lg={2}>
                                    <CardProduct product={product} isShort />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
            <Box display={tab === 1 ? 'inherit' : 'none'}>
                <Box className="flex ml-3">
                    <Box className='flex flex-row items-center'>
                        <Typography variant='body1' color={'#444444'}>Sắp xếp theo</Typography>
                        <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
                            <Select value={sort} onChange={(e) => setSort(e.target.value)} >
                                {sortList.map((sort, index) => (
                                    <MenuItem key={index} color='#444444' value={sort?.value}>{sort?.lable}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className="flex items-center gap-1">
                        <Tooltip title="Đặt lại">
                            <RestartAlt className="text-3xl text-[#193744] cursor-pointer" onClick={handelReset} />
                        </Tooltip>
                    </Box>
                </Box>
                <Box className="bg-[#E6E6FA] flex flex-col items-center justify-center">
                    {loading && <CircularProgress />}
                    {!loading && (
                        <Grid container spacing={1} p={1}>
                            {Array.isArray(products?.content) && products?.content.map((product, index) => (
                                <Grid key={index} item xs={3} sm={3} md={3} lg={2}>
                                    <CardProduct product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <Box className="flex flex-row items-center justify-center mt-2 mb-2">
                        <Pagination
                            count={products?.totalPages}
                            variant="outlined"
                            color="primary"
                            page={page}
                            onChange={handleChangePage}
                        />
                    </Box>
                </Box>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                {(Array.isArray(categories) && categories.length > 0) ?
                    <MenuCategory categories={categories} setCategory={setCategory} isShopPage />
                    :
                    <Box className='p-3'>
                        Không có dữ liệu
                    </Box>
                }
            </Menu>
            {loading && <Loading />}
        </Box>

    )
}
export default ShopPage
