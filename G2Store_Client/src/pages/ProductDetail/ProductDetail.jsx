import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Divider, Grid } from '@mui/material'
import reviewApi from '../../apis/reviewApi'
import LeftInformation from './LeftInformation/LeftInformation'
import RightInformation from './RigthInformation/RightInformation'
import Reviews from './Reviews/Reviews'
import productApi from '../../apis/productApi'
import RelativeProducts from './RelativeProducts/RelativeProducts'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

function ProductDetail() {
  const navigate = useNavigate()
  const location1 = useLocation()
  const product_id = location1.state
  const [product, setProduct] = useState()
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [sortType, setSortType] = useState('')
  useEffect(() => {
    reviewApi.getReviewByProductId(product_id, page - 1, 8, sortType)
      .then((response) => { setReviews(response) })
  }, [product_id, page, sortType])
  useEffect(() => {
    productApi.getProduct(product_id)
      .then((response) => { setProduct(response) })
      .catch(() => { navigate('/product-not-exist') })
  }, [product_id])
  return (
    <Box sx={{ minHeight: '100%' }}>
      <Container fixed>
        <BreadCrumbs links={[{ name: 'Chi tiết sản phẩm', href: '' }]} />
        <Typography variant='h6' color={'#444444'} sx={{ mb: 1 }}>{product?.name}</Typography>
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