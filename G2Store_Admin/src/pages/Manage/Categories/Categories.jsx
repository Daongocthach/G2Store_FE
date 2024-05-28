import { Box, Typography, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'
import categoryApi from '../../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'
import Loading from '../../../components/Loading/Loading'
import AddCategory from './FormCategory/AddCategory'
import emptyImage from '../../../assets/img/empty-order.png'

function Categories() {
  const [reRender, setReRender] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  useEffect(() => {
    setIsReset(false)
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await categoryApi.getCategories()
        setLoading(false)
        setCategories(response)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchData()
  }, [reRender])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="admin/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/admin/manage/categories">
          Quản lý danh mục
        </Link>
      </Breadcrumbs>
      <Box sx={{ bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 2 }}>
        <Box sx={{ display: 'flex', p: 1, justifyContent: 'space-between', alignItems: 'center', bgcolor: '#2a99ff' }}>
          <Typography variant='h6' color={'white'} sx={{ fontWeight: 'bold' }} >Danh mục sản phẩm</Typography>
          <AddCategory isParent={true} reRender={reRender} setReRender={setReRender} />
        </Box>
        <MenuCategory categories={categories} reRender={reRender} setReRender={setReRender} isReset={isReset} setIsReset={setIsReset}/>
        {Array.isArray(categories) && categories.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <img src={emptyImage} />
          <Typography variant='h7' >Bạn chưa có danh mục nào</Typography>
        </Box>}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Categories