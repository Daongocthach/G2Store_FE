import { Container, Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import Products from './Products/Products'
import Providers from './Providers/Providers'

function GenreDetail() {

  return (
    <Container sx={{ mb: 2, borderRadius: 5, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#E6E6FA') }}>
      <Grid container mt={2} maxWidth='lg' spacing={1}>
        <Grid item xs={12} sm={12} md={2} lg={2} >
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="/genre-detail">
              Sản phẩm
            </Link>
          </Breadcrumbs>
          <Typography variant='subtitle1' fontWeight={'bold'} mt={2}>Loại sản phẩm</Typography>
          <Typography variant='body1' color={'orange'} >Dầu ăn</Typography>
          <Providers/>
          
        </Grid>
        <Grid mt={1} item xs={12} sm={12} md={10} lg={10} >
          <Products/>
        </Grid>
      </Grid>
    </Container >
  )
}

export default GenreDetail