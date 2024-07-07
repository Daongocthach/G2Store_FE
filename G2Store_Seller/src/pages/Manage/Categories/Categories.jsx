import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import categoryApi from '../../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'
import Loading from '../../../components/Loading/Loading'
import AddCategory from './FormCategory/AddCategory'
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'
import EmptyData from '../../../components/EmptyData/EmptyData'

function Categories() {
  const navigate = useNavigate()
  const shop_id = useSelector(state => state.auth.shop_id)
  const [reRender, setReRender] = useState(false)
  const [categories, setCategories] = useState([])
  const [isReset, setIsReset] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setIsReset(false)
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await categoryApi.getShopCategories(shop_id)
        setLoading(false)
        setCategories(response)
      } catch (error) {
        if (error?.response?.data?.message == 'Access Denied') {
          navigate('/seller/access-denied')
        }
        setLoading(false)
        console.log(error)
      }
    }
    fetchData()
  }, [reRender])

  return (
    <Box sx={{ m: 5, minHeight: '100vh' }}>
      <BreadCrumbs links={[{ name: 'Quản lý ngành hàng', href: '' }]} />
      <Box sx={{ bgcolor: 'white', boxShadow: '0px 0px 10px', mt: 2 }}>
        <Box sx={{ bgcolor: '#2a99ff', display: 'flex', p: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle1' fontWeight={'bold'} color={'white'} >Quản lý ngành hàng</Typography>
          <AddCategory isParent={true} reRender={reRender} setReRender={setReRender} />
        </Box>
        {Array.isArray(categories) && categories.length > 0 ? (
          <MenuCategory
            categories={categories}
            reRender={reRender}
            setReRender={setReRender}
            isReset={isReset}
            setIsReset={setIsReset}
          />
        ) : (
          <EmptyData content="Không có danh mục nào được tìm thấy!" />
        )}
      </Box>
      {loading && <Loading />}
    </Box>
  )
}

export default Categories