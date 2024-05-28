import { Typography, Box, CardMedia, CardContent, Card } from '@mui/material'
import { Check } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'

function RelativeProduct({ product }) {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 300, cursor: 'pointer' }} >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <CardMedia
          onClick={() => { navigate('/product-detail', { state: product?.product_id }) }}
          sx={{ width: 280, aspectRatio: 1 / 1, objectFit: 'contain', borderRadius: 1, m: 0.5 }}
          image={product?.images[0]?.file_url || null}
          title={product?.name}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', height: 20, width: 60, bgcolor: '#ee4d2d', position: 'absolute', top: 5, left: 0 }}>
          <Check sx={{ textAlign: 'center', fontSize: 13, color: 'white' }} />
          <Typography sx={{ textAlign: 'center', fontSize: 10, color: 'white', fontWeight: 'bold' }}>Yêu thích</Typography>
        </Box>
      </Box>
      <CardContent sx={{ height: 120 }}>
        <Typography variant='subtitle1' color={'#444444'} fontWeight={500}
          sx={{ textOverflow: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }}> {product?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, flexWrap: 'wrap' }}>
          {product?.special_price && <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#cb1c22' }} >{formatCurrency(product?.special_price)}</Typography>}
          <Typography variant={product?.special_price ? 'subtitle2' : 'subtitle1'} fontWeight={product?.special_price ? 500 : 600}
            sx={{ color: product?.special_price ? ' #444444' : '#cb1c22', textDecoration: product?.special_price ? 'line-through' : 'none' }}>
            {product?.special_price ? formatCurrency(product?.price) : formatCurrency(product?.price)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RelativeProduct