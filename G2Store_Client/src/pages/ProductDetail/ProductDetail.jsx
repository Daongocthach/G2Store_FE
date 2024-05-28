import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Breadcrumbs, Link, Divider, Grid } from '@mui/material'
import reviewApi from '../../apis/reviewApi'
import LeftInformation from './LeftInformation/LeftInformation'
import RightInformation from './RigthInformation/RightInformation'
import Reviews from './Reviews/Reviews'
import productApi from '../../apis/productApi'
import RelativeProducts from './RelativeProducts/RelativeProducts'

function ProductDetail() {
  const navigate = useNavigate()
  const location1 = useLocation()
  const product_id = location1.state
  const [product, setProduct] = useState()
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(8)
  const [sortType, setSortType] = useState('')
  useEffect(() => {
    reviewApi.getReviewByProductId(product_id, page - 1, size, sortType)
      .then((response) => { setReviews(response) })
  }, [product_id, page, size, sortType])
  useEffect(() => {
    productApi.getProduct(product_id)
      .then((response) => { setProduct(response) })
      .catch(() => { navigate('/product-not-exist') })
  }, [product_id])
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
          <Grid item xs={12} sm={12} md={7} lg={7} >
            <LeftInformation product={product} />
          </Grid>
          {/* Product Infomation right*/}
          <Grid item xs={12} sm={12} md={5} lg={5} >
            <RightInformation product={product} reviews={reviews} />
          </Grid>
        </Grid>
        {/* Reviews */}
        <Reviews reviews={reviews} page={page} setPage={setPage} setSortType={setSortType} />
        {product?.category && <RelativeProducts category={product?.category} />}
      </Container>
    </Box>
  )
}

export default ProductDetail