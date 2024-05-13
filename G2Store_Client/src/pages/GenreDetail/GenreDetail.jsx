import { Container, Breadcrumbs, Link } from '@mui/material'
import Products from './Products/Products'

function GenreDetail() {

  return (
    <Container fixed sx={{ mt: 1, mb:1, minHeight: '100vh', borderRadius: 1, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#e6e6fa') }}>
      <Breadcrumbs sx={{ pt: 1 }}>
        <Link underline="hover" color="inherit" href="/" sx={{ fontSize: 15 }}>
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/genre-detail" sx={{ fontSize: 15 }}>
          Sản phẩm
        </Link>
      </Breadcrumbs>
      <Products/>
    </Container >
  )
}

export default GenreDetail