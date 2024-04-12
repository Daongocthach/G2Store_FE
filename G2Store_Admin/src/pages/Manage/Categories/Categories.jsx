import { Box, Typography, FormControl, Select, MenuItem, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import categoryApi from '../../../apis/categoryApi'
import { listCategories } from '../../../redux/actions/categories'
import MenuCategory from './MenuCategory/MenuCategory'
import Loading from '../../../components/Loading/Loading'
import AddCategory from './FormCategory/AddCategory'

function Categories() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
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
        dispatch(listCategories(response))
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchData()
  }, [])

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          {/* <SearchCategory setCategories={setCategories} /> */}
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
          <AddCategory isParent={true}/>
        </Box>
        {Array.isArray(categories) && categories.map((category, index) => (
          <MenuCategory key={index} category={category} />
        ))}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Categories