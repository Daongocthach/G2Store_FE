import { useState, useEffect } from 'react'
import { Typography, Button, Tabs, Tab, Grid, Box, Breadcrumbs, Link, Menu, Chip, Avatar, CircularProgress, Input, Rating, Pagination, Tooltip } from '@mui/material'
import { ChatBubbleOutline, AddBusiness, Dehaze, KeyboardArrowDown, RestartAlt } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import imageShop from '../../assets/img/shopDesign.png'
import MenuCategory from './MenuCategory/MenuCategory'
import shopApi from '../../apis/shopApi'
import Loading from '../../components/Loading/Loading'
import avatarNull from '../../assets/img/avatar.png'
import CardProduct from '../../components/Product/CardProduct'
import productApi from '../../apis/productApi'


function ShopPage() {
    const location = useLocation()
    const shop_id = location.state
    const [page, setPage] = useState(1)
    const [shop, setShop] = useState()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangePage = (event, value) => {
        setPage(value)
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            shopApi.getShopById(shop_id)
                .then((response) => {
                    setShop(response)
                })
                .catch((error) => console.log(error))
            if (category?.shop_cate_id) {
                productApi.getProductsByShopCategoryId(category?.shop_cate_id, page - 1, 16)
                    .then((response) => setProducts(response))
                    .catch((error) => console.log(error))
            }
            else {
                productApi.getShopProducts(shop_id, page - 1, 16)
                    .then((response) => {
                        setProducts(response)
                    })
                    .catch((error) => console.log(error))
            }
            shopApi.getShopCategories(shop_id)
                .then((response) => setCategories(response))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [page, shop_id, category])
    return (
        <Box sx={{ minHeight: '100vh', p: 2 }} >
            <Breadcrumbs>
                <Link underline="hover" color="inherit" href="/" > Trang chủ </Link>
                <Link underline="hover" color="inherit" > Gian hàng </Link>
            </Breadcrumbs>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', bgcolor: 'orange', height: 120, position: 'relative', }}>
                <img src={imageShop} style={{ objectFit: 'cover', height: 120, width: '100%' }} />
                <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', bgcolor: 'white', height: 90, ml: 2, paddingX: 2, gap: 3, borderRadius: 2 }}>
                    <Avatar sx={{ width: 50, height: 50 }}>
                        <img src={shop?.image || avatarNull} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                    </Avatar>
                    <Box >
                        <Typography variant="h6" noWrap color={'#555555'}>
                            {shop?.name}
                        </Typography>
                        <Typography variant="subtitle2" noWrap color={'#555555'}>
                            Theo dõi: 10
                        </Typography>
                        <Typography variant="subtitle2" noWrap color={'#555555'}>
                            Đánh giá tích cực: 90%
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button color="inherit" aria-label="Chat Now">
                            <ChatBubbleOutline sx={{ fontSize: 30, color: '#193744' }} />
                        </Button>
                        <Typography variant="subtitle2" noWrap color={'#555555'}>
                            Chat
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button color="inherit" aria-label="Follow">
                            <AddBusiness sx={{ fontSize: 30, color: '#193744' }} />
                        </Button>
                        <Typography variant="subtitle2" noWrap color={'#555555'}>
                            Theo dõi
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip icon={<Dehaze />} clickable sx={useStyles.chip} label="Danh mục ngành hàng" onClick={handleClick}
                    onDelete={handleClick} deleteIcon={<KeyboardArrowDown />} />
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Trang chủ" {...a11yProps(0)} />
                    <Tab label="Hồ sơ" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    Tất cả sản phẩm
                    <Tooltip title="Đặt lại">
                        <RestartAlt sx={{ fontSize: 30, color: '#193744', cursor: 'pointer' }} onClick={() => setCategory(null)} />
                    </Tooltip>
                </Box>
                <Box sx={{ bgcolor: '#E6E6FA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {loading && <CircularProgress />}
                    {!loading && <Grid container spacing={1} maxWidth='xl' p={1}>
                        {Array.isArray(products?.content) && products?.content.map((product, index) => (
                            <Grid key={index} item xs={3} sm={3} md={2} lg={2} >
                                <CardProduct product={product} />
                            </Grid>
                        ))}
                    </Grid>}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2 }}>
                        <Pagination count={products?.totalPages} variant="outlined" color="primary" page={page} onChange={handleChangePage} />
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Thông tin shop
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Tên shop:</Typography>
                    <Input placeholder='Tên shop' sx={useStyles.input} readOnly value={shop?.name} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Địa chỉ:</Typography>
                    <Input readOnly placeholder='Địa chỉ' sx={useStyles.input} value={shop?.province ? (shop?.street + ', ' + shop?.ward + ', ' + shop?.district + ', ' + shop?.province) : ''} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Số lượt bán:</Typography>
                    <Input placeholder='Tên shop' sx={useStyles.input} readOnly value={5 + ' Sản phẩm'} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
                    <Typography variant='subtitle1' sx={useStyles.inputTitle}>Đánh giá (9):</Typography>
                    <Rating value={5} />
                </Box>
            </TabPanel>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} >
                <MenuCategory categories={categories} setCategory={setCategory} />
            </Menu>
            {loading && <Loading />}
        </Box>
    )
}
export default ShopPage

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}
function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}


const useStyles = {
    chip: {
        color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444'),
        bgcolor: 'transparent',
        border: '1 ',
        paddingX: '5px',
        borderRadius: '4px',
        fontSize: 16,
        '& .MuiSvgIcon-root': {
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444')
        },
        '&:hover': {
            bgcolor: 'primary.50'
        }
    },
    inputTitle: {
        fontWeight: 'bold', minWidth: '90px', color: '#4F4F4F'
    },
    input: {
        minWidth: { xs: 200, md: 500 },
        fontSize: 15,
        bgcolor: '#e8f0fe'
    }
}