import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import categoryApi from '../../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'
import Loading from '../../../components/Loading/Loading'
import AddCategory from './FormCategory/AddCategory'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import EmptyData from '../../../components/EmptyData/EmptyData'

function Categories() {
  const [reRender, setReRender] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  useEffect(() => {
    setIsReset(false)
    const fetchData = async () => {
      categoryApi.getCategories()
        .then((response) => {
          setCategories(response)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchData()
  }, [reRender])

  return (
    <Box sx={{ m: 5, minHeight: '100vh', maxHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý danh mục', href: '/admin/manage/categories' }]} />
      <Box className='bg-white shadow-lg mt-2 w-11/12 overflow-x-scroll' >
        <Box className='flex flex-row items-center justify-between p-1 bg-sky-500'>
          <Typography variant='subtitle1' color={'white'} sx={{ fontWeight: 'bold' }} >Danh mục sản phẩm</Typography>
          <AddCategory isParent={true} reRender={reRender} setReRender={setReRender} />
        </Box>
        <MenuCategory categories={categories} reRender={reRender} setReRender={setReRender} isReset={isReset} setIsReset={setIsReset} />
        {Array.isArray(categories) && categories.length < 1 && <EmptyData content={'Bạn chưa có danh mục nào'} />}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Categories