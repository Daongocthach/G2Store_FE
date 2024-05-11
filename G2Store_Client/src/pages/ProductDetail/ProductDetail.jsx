import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Breadcrumbs, Link, Divider, Grid } from '@mui/material'
import reviewApi from '../../apis/reviewApi'
import LeftInformation from './LeftInformation/LeftInformation'
import RightInformation from './RigthInformation/RightInformation'
import Reviews from './Reviews/Reviews'

function ProductDetail() {
  const location1 = useLocation()
  const product = location1.state
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(1)
  const [sortType, setSortType] = useState('')
  useEffect(() => {
    reviewApi.getReviewByProductId(product?.product_id, page - 1, size, sortType)
      .then((response) => { setReviews(response) })
  }, [product, page, size, sortType])
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
      </Container>

    </Box>
  )
}

export default ProductDetail