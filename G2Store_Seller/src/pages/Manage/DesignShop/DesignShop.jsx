import { useState, useEffect } from 'react'
import { Typography, IconButton, Tabs, Tab, Grid, Box, Breadcrumbs, Link, Menu, Chip } from '@mui/material'
import { ChatBubbleOutline, AddBusiness, Store, Dehaze, KeyboardArrowDown } from '@mui/icons-material'
import authenApi from '../../../apis/authenApi'
import imageShop from '../../../assets/img/shopDesign.png'
import categoryApi from '../../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'

function DesignShop() {
    const [seller, setSeller] = useState()
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState(0)
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
    useEffect(() => {
        authenApi.me()
            .then((response) => {
                setSeller(response)
                console.log(response?.shop?.shopId)
                categoryApi.getShopCategories(response?.shop?.shopId)
                    .then((response) => setCategories(response))
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))

    }, [])
    return (
        <Box sx={{ minHeight: '100vh', p: 2 }} >
            <Breadcrumbs>
                <Link underline="hover" color="inherit" href="seller/dashboard" variant='h6'>
                    Trang chủ
                </Link>
                <Link underline="hover" color="inherit" href="/seller/manage/design-shop" variant='h6'>
                    Thiết kế gian hàng
                </Link>
            </Breadcrumbs>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', bgcolor: 'orange', height: 120, position: 'relative', }}>
                <img src={imageShop} style={{ objectFit: 'cover', height: 120, width: '100%' }} />
                <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', bgcolor: 'white', height: 90, ml: 2, paddingX: 2, gap: 3, borderRadius: 2 }}>
                    <Store sx={{ fontSize: 40, color: '#193744' }} />
                    <Box >
                        <Typography variant="h6" noWrap component="div" color={'#555555'}>
                            {seller?.shop?.name}
                        </Typography>
                        <Typography variant="subtitle2" noWrap component="div" color={'#555555'}>
                            Theo dõi: 10
                        </Typography>
                        <Typography variant="subtitle2" noWrap component="div" color={'#555555'}>
                            Đánh giá tích cực: 90%
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton color="inherit" aria-label="Chat Now">
                            <ChatBubbleOutline sx={{ fontSize: 30, color: '#193744' }} />
                        </IconButton>
                        <Typography variant="subtitle2" noWrap component="div" color={'#555555'}>
                            Chat
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton color="inherit" aria-label="Follow">
                            <AddBusiness sx={{ fontSize: 30, color: '#193744' }} />
                        </IconButton>
                        <Typography variant="subtitle2" noWrap component="div" color={'#555555'}>
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
                    <Tab label="Tất cả sản phẩm" {...a11yProps(1)} />
                    <Tab label="Hồ sơ" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Grid container maxWidth='lg' spacing={1}>
                    <Typography variant='h5' fontWeight={500} mb={2} color={'#444444'}>Sản phẩm nổi bật</Typography>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={1}>
                    <Typography variant='h5' fontWeight={500} mb={2} color={'#444444'}>Tất cả sản phẩm</Typography>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Typography variant='h5' fontWeight={500} mb={2} color={'#444444'}>Hồ sơ</Typography>
                    </Grid>
                </Grid>
            </TabPanel>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {Array.isArray(categories) && categories?.map((category, index) => (
                    <MenuCategory key={index} category={category} />
                ))}
            </Menu>
        </Box>

    )
}
export default DesignShop

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
        '& .MuiSvgIcon-root': {
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444')
        },
        '&:hover': {
            bgcolor: 'primary.50'
        }
    }
}