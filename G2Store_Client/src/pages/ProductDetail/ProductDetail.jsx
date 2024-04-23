import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Rating, Box, Typography, Button, Avatar, Container, Breadcrumbs, Link, Divider, Grid, Popover, ToggleButton } from '@mui/material'
import { Storefront, NavigateNext, AddShoppingCart, CheckCircleOutline, Remove, Add } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'
import cartItemApi from '../../apis/cartItemApi'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import { addToCart } from '../../redux/actions/cart'
import reviewApi from '../../apis/reviewApi'
import { mockData } from '../../apis/mockdata'

function ProductDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state
  const user = useSelector(state => state.auth)
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState([])
  const [imageZoom, setImageZoom] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [showMore, setShowMore] = useState(3)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleSetImageZoom = (index) => {
    if (imageZoom == index)
      setImageZoom()
    else {
      setImageZoom(index)
    }
  }

  function handleShowMoreClick() {
    setShowMore(showMore + 3)
  }
  function handleClickAddToCart() {
    if (!user?.atk) {
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này!', { autoClose: 2000 })
      navigate('/login')
    }
    else {
      cartItemApi.addToCart({ quantity: quantity, product_id: product?.product_id })
        .then((response) => {
          if (response?.quantity == quantity)
            dispatch(addToCart(response))
          setShowAlert(true)
        })
        .catch((error) => {
          console.log(error)
          setShowAlertFail(true)
        })
    }
  }
  useEffect(() => {
    reviewApi.getReviewByProductId(product?.product_id)
      .then((response) => { setReviews(response) })
  }, [product])
  return (
    <Box sx={{ minHeight: '100%' }}>
      <Container fixed>
        <Breadcrumbs sx={{ mt: 2 }}>
          <Link underline="hover" color="inherit" href="/" variant='subtitle1'>
            Trang chủ
          </Link>
          <Link underline="hover" color="inherit" variant='subtitle1' >
            Chi tiết sản phẩm
          </Link>
        </Breadcrumbs>
        <Typography variant='h5' fontWeight={'bold'} color={'#444444'} sx={{ mb: 1 }}>{product?.name}</Typography>
        <Divider />
        <Grid container spacing={1} mt={3}>
          {/* Product Infomation left */}
          <Grid item xs={12} sm={12} md={8} lg={8} >
            <Box >
              <img src={product?.images} style={{ objectFit: 'contain', borderRadius: '15px', width: '100%', height: '350px' }} />
              <Typography variant='h5' fontWeight={'bold'} color={'#444444'}>Thông tin sản phẩm</Typography>
              <Typography variant='subtitle1' color={'#444444'} > {product?.description}</Typography>
            </Box>
          </Grid>
          {/* Product Infomation right*/}
          <Grid item xs={12} sm={12} md={4} lg={4} >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
                {product?.special_price && <Typography variant='h5' fontWeight={'bold'} sx={{ color: '#cb1c22' }} >{formatCurrency(product?.special_price)}</Typography>}
                <Typography variant={product?.special_price ? 'h6' : 'h5'} fontWeight={product?.special_price ? 500 : 600}
                  sx={{ color: product?.special_price ? ' #444444' : '#cb1c22', textDecoration: product?.special_price ? 'line-through' : 'none' }}>
                  {product?.special_price ? formatCurrency(product?.price) : formatCurrency(product?.price)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle2' color={'#016afa'}>{(reviews?.length || 0) + ' Đánh giá'}</Typography>
                <Rating name="size-medium" size='large' value={5} precision={0.1} readOnly />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} >Danh mục:</Typography>
                <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                  onClick={() => { navigate('/shop-page', { state: product?.shop?.shop_id }) }}>
                  <Typography variant='subtitle1' color={'#444444'}>{product?.category?.name}</Typography>
                  <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'}>Gian hàng:</Typography>
                <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                  onClick={() => { navigate('/shop-page', { state: product?.shop?.shop_id }) }}>
                  <Storefront sx={{ fontSize: 25, color: '#444444' }} />
                  <Typography variant='subtitle1' sx={{ color: '#444444' }}>{product?.shop?.name}</Typography>
                  <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'}>Số lượng:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                  <ToggleButton value="left" key="left" sx={{ width: 50, height: 40 }} onClick={handleDecrease}>
                    <Remove sx={{ fontSize: 15 }} />
                  </ToggleButton>
                  <input value={quantity} type='number' min={0} max={1000} onFocus={(e) => e.target.select()} onChange={(e) => setQuantity(parseInt(e.target.value), 10)}
                    style={{ border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2, width: 60, height: 40, textAlign: 'center' }} />
                  <ToggleButton value="right" key="right" sx={{ width: 50, height: 40 }} onClick={handleIncrease}>
                    <Add sx={{ fontSize: 15 }} />
                  </ToggleButton>
                </Box>
              </Box>
              {/* Promotions*/}
              <Button variant="contained" startIcon={<CheckCircleOutline />} endIcon={<NavigateNext />} onClick={handleClick} color='success'
                sx={{ ':hover': { bgcolor: 'green' } }}> Xem các khuyến mãi đặc biệt</Button>
              <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
                {mockData.promotions.map((promotion, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 300, p: 1 }}>
                    <Box>
                      <Typography color={'#cb1c22'} variant='subtitle1' fontWeight={'bold'} >{formatCurrency(promotion?.discount_type == 'PERCENTAGE' ? promotion?.reduce_percent : promotion?.reduce_price)}</Typography>
                      <Typography color={'#cb1c22'} variant='subtitle2' sx={{}}>Đơn tối thiểu: {formatCurrency(promotion?.min_spend)}</Typography>
                      <Typography sx={{}}>{promotion?.start_date} - {promotion?.end_date}</Typography>
                    </Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'orange'} >{promotion?.name}</Typography>
                  </Box>
                ))}
              </Popover>
              {/* Quantity */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                <Button variant='contained' fullWidth color='error' onClick={handleClickAddToCart}>Mua Ngay</Button>
                <Button variant='contained' fullWidth startIcon={<AddShoppingCart />} color='info' onClick={handleClickAddToCart}>Thêm vào giỏ</Button>

              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* Reviews */}
        {Array.isArray(reviews) && reviews.length > 0 &&
          <Box sx={{ mb: 2, mt: 5 }}>
            <Typography variant='h5' fontWeight={'bold'} color={'#444444'}>Đánh giá sản phẩm</Typography>
            {reviews?.slice(0, showMore).map((review, index) =>
              <Box key={index}>
                <Box sx={{ display: 'flex', borderRadius: 3, width: '100%', gap: 2, alignItems: 'center', mt: 3 }}>
                  <Avatar sx={{ height: 50, width: 50 }}>{review?.review_id}</Avatar>
                  <Box >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'}>Khách hàng {review?.customer_name || 'ẩn danh'}</Typography>
                      <Rating size='small' value={4} readOnly />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Typography variant='subtitle1' color={'#444444'}>{review?.content}</Typography>
                      <img src={review?.images} alt={'Đánh giá'} onClick={() => handleSetImageZoom(index)}
                        style={{ objectFit: 'cover', borderRadius: '10px', width: '50px', height: '50px' }} />
                    </Box>
                  </Box>
                </Box>
                {imageZoom == index && <img src={review?.images} alt={'Đánh giá'}
                  style={{ objectFit: 'cover', borderRadius: '5px', marginTop: 2, cursor: 'pointer', width: '300px', height: '200px' }} />}
              </Box>
            )}
            {reviews.length > showMore && (
              <Button onClick={handleShowMoreClick}>Hiện thêm</Button>
            )}
          </Box>}

      </Container>
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Thêm sản phẩm vào giỏ thành công'} />
      <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Thêm sản phẩm vào giỏ thất bại'} isFail={true} />
    </Box>
  )
}

export default ProductDetail