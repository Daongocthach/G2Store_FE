import { Container } from '@mui/material'
import Products from './Products/Products'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

function GenreDetail() {

  return (
    <Container fixed sx={{ mt: 1, mb: 1, minHeight: '100vh', borderRadius: 1, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#e6e6fa') }}>
      <BreadCrumbs links={[{ name: 'Sản phẩm', href: '' }]} />
      <Products />
    </Container >
  )
}

export default GenreDetail