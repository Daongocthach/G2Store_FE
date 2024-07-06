import { Container } from '@mui/material'
import Products from './Products/Products'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

function GenreDetail() {

  return (
    <Container fixed className='mt-1 mb-2 min-h-screen rounded-sm' >
      <BreadCrumbs links={[{ name: 'Sản phẩm', href: '' }]} />
      <Products />
    </Container >
  )
}

export default GenreDetail