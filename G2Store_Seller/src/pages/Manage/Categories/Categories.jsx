import { Box, Typography, FormControl, Select, MenuItem, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import categoryApi from '../../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'
import Loading from '../../../components/Loading/Loading'
import AddCategory from './FormCategory/AddCategory'
import emptyImage from '../../../assets/img/empty-order.png'

function Categories() {
  const shop_id = useSelector(state => state.auth.shop_id)
  const [reRender, setReRender] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [select, setSelect] = useState(1)
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      categoryApi.getShopCategories(shop_id)
        .then((response) => {
            setCategories(response)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
    if (shop_id)
      fetchData()
    else {
      console.log(shop_id
      )
    }
  }, [])

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ bgcolor: 'white', boxShadow: '0px 0px 10px', pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
          <Typography variant='h6' sx={{ ml: 3, fontWeight: 'bold' }} >Danh mục sản phẩm</Typography>
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