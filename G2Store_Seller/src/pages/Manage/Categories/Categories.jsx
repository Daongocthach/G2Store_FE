import { Box, Typography, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import categoryApi from '../../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'
import Loading from '../../../components/Loading/Loading'
import AddCategory from './FormCategory/AddCategory'
import emptyImage from '../../../assets/img/empty-order.png'

function Categories() {
  const navigate = useNavigate()
  const shop_id = useSelector(state => state.auth.shop_id)
  const [reRender, setReRender] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      categoryApi.getShopCategories(shop_id)
        .then((response) => {
          setCategories(response)
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'Access Denied') {
            navigate('/seller/access-denied')
          }
          console.log(error)
        })
        .finally(() => setLoading(false))
    }
    if (shop_id)
      fetchData()
  }, [reRender])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="seller/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/seller/manage/categories">
          Quản lý ngành hàng
        </Link>
      </Breadcrumbs>
      <Box sx={{ bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 2 }}>
        <Box sx={{ bgcolor:'#2a99ff', display: 'flex', p: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' color={'white'} sx={{ fontWeight: 'bold' }} >Danh mục sản phẩm</Typography>
          <AddCategory isParent={true} reRender={reRender} setReRender={setReRender} />
        </Box>
        {Array.isArray(categories) && categories.map((category, index) => (
          <MenuCategory key={index} category={category} reRender={reRender} setReRender={setReRender} />
        ))}
        {Array.isArray(categories) && categories.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <img src={emptyImage} />
          <Typography variant='h6' >Bạn chưa có danh mục nào</Typography>
        </Box>}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Categories