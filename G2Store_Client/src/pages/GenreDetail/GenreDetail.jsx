import { Container } from '@mui/material'
import Products from './Products/Products'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

function GenreDetail() {

  return (
    <Container fixed className='mt-1 mb-1 h-screen rounded-sm' >
      <BreadCrumbs links={[{ name: 'Sản phẩm', href: '' }]} />
      <Products />
    </Container >
  )
}

export default GenreDetail