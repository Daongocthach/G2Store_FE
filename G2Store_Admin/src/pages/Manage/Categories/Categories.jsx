import { Box, Typography, FormControl, Select, MenuItem, Breadcrumbs, Link } from '@mui/material'
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
  const [select, setSelect] = useState(1)
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  useEffect(() => {
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
        <Box sx={{ display: 'flex', p: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' color={'#444444'} sx={{ fontWeight: 'bold' }} >Danh mục sản phẩm</Typography>
          <AddCategory isParent={true} reRender={reRender} setReRender={setReRender}/>
        </Box>
        {Array.isArray(categories) && categories.map((category, index) => (
          <MenuCategory key={index} category={category} reRender={reRender} setReRender={setReRender}/>
        ))}
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