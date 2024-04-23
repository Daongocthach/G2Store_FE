import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, Paper } from '@mui/material'
import { AddCircle, NavigateNext } from '@mui/icons-material'
import productApi from '../../../../apis/productApi'
import { addProduct, updateProduct } from '../../../../redux/actions/products'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import MenuCategory from './SetCategory/MenuCategory/MenuCategory'
import categoryApi from '../../../../apis/categoryApi'

function AddProduct() {
    const location = useLocation()
    const product = location.state
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [special_price, setSpecialPrice] = useState(undefined)
    const [quantity, setQuantity] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [length, setLength] = useState(0)
    const [categoryId, setCategoryId] = useState('')
    const [images, setImages] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertWarning, setShowAlertWarning] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const fetchData = async () => {
        if (product) {
            setName(product?.name)
            setPrice(product?.price)
            setDescription(product?.description)
            setSpecialPrice(product?.special_price)
            setQuantity(product?.stock_quantity)
            setWeight(product?.weight)
            setHeight(product?.height)
            setWidth(product?.width)
            setLength(product?.length)
            const deepestCategory = getDeepestCategory(product?.category)
            setCategoryId(deepestCategory?.category_id)
            setSelectedCategories(deepestCategory?.name)
        }
    }
    useEffect(() => {
        if (product) {
            fetchData()
        }
        categoryApi.getCategories()
            .then((response) => { setCategories(response) })
            .catch(err => console.log(err))

    }, [])
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const imageUrl = reader.result
                if (images.includes(imageUrl)) {
                    setShowAlertWarning(true)
                } else {
                    setImages(prevImages => [...prevImages, imageUrl])
                    setShowAlertWarning(false)
                }
            }
            reader.readAsDataURL(file)
        }
    }
    const handleClickAdd = async () => {
        const productData = {
            name,
            description,
            images: 'https://www.bigw.com.au/medias/sys_master/images/images/h27/hda/29143439376414.jpg',
            price: price,
            height: height,
            width: width,
            length: length,
            weight: weight,
            special_price: special_price,
            stock_quantity: quantity,
            category_id: categoryId
        }
        if (product) {
            productApi.updateProduct(product?.product_id, productData)
                .then(() => {
                    setShowAlert(true)
                    setTimeout(() => { navigate('/seller/manage/products') }, 1000)
                })
                .catch(error => {
                    console.log(error)
                    setShowAlertFail(true)
                })
        }
        else {
            productApi.addProduct(productData)
                .then(() => {
                    setShowAlert(true)
                    setTimeout(() => { navigate('/seller/manage/products') }, 1000)
                })
                .catch(error => {
                    console.log(error)
                    setShowAlertFail(true)
                })
        }
    }

    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thông tin cơ bản</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Tên sản phẩm: </Typography>
                    </Box>
                    <TextField fullWidth size='small' placeholder='Ex: Bánh gạo' value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Danh mục sản phẩm: </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Paper sx={{ width: '100%', p: 2 }} elevation={4}>
                            <Paper sx={{ borderWidth: 0.5, borderColor: '#CCCCCC' }} variant='outlined'>
                                <MenuCategory categories={categories} setCategoryId={setCategoryId} setSelectedCategories={setSelectedCategories} />
                            </Paper>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                                <Typography variant='subtitle1'>Đang chọn: </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant='subtitle2' color={'#555555'}>{selectedCategories}</Typography>
                                    <NavigateNext sx={{ color: '#444444', fontSize: 14 }} />
                                </Box>
                                {/* {Array.isArray(selectedCategories) && selectedCategories.map((name, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant='subtitle2' color={'#555555'}>{name}</Typography>
                                        <NavigateNext sx={{ color: '#444444', fontSize: 14 }} />
                                    </Box>

                                ))} */}
                            </Box>
                        </Paper>
                    </Box>
                </Box >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='subtitle2'>Giá: </Typography>
                        </Box>
                        <TextField size='small' type='number' inputProps={{ min: 0 }} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2'>Giá đặc biệt: </Typography>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={special_price} onChange={(e) => setSpecialPrice(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='subtitle2'>Số lượng sản phẩm: </Typography>
                        </Box>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </Box>
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Mô tả: </Typography>
                    </Box>
                    <TextField fullWidth size='medium' multiline rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='subtitle2'>Hình ảnh: </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Button component="label" htmlFor="upload-image" variant="contained" color="primary" sx={{ borderRadius: '10px', height: 70, width: 70 }} >
                            <AddCircle />
                            <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                        </Button>
                        {Array.isArray(images) &&
                            images.map((image, index) => (
                                <img src={image} style={{ height: '70px', width: '70px', borderRadius: 10 }} key={index} />
                            ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Đặc tính sản phẩm</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='subtitle2'>Khối lượng sản phẩm: </Typography>
                        </Box>
                        <TextField size='small' value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='subtitle2'>Chiều dài (cm): </Typography>
                        </Box>
                        <TextField size='small' type='number' inputProps={{ min: 0 }} value={length} onChange={(e) => setLength(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='subtitle2'>Chiều rộng (cm): </Typography>
                        </Box>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={width} onChange={(e) => setWidth(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='subtitle2'>Chiều cao (cm): </Typography>
                        </Box>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={height} onChange={(e) => setHeight(e.target.value)} />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'end', pr: 5 }}>
                <Button onClick={() => { handleClickAdd() }} sx={{ bgcolor: '#1a71ff', color: 'white', fontWeight: '500', ':hover': { bgcolor: '#00B2EE' } }}>Gửi đi</Button>
            </Box>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={product ?'Cập nhật sản phẩm thành công': 'Thêm sản phẩm thành công'} />
            <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Vui lòng không chọn cùng ảnh!'} isWarning={true} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={product ?'Cập nhật sản phẩm thất bại': 'Thêm sản phẩm thất bại'} isFail={true} />
        </Box>
    )
}
export default AddProduct

function getDeepestCategory(category) {
    let deepestCategory = category
    while (!(deepestCategory?.child_categories && deepestCategory.child_categories.length === 0)) {
        deepestCategory = deepestCategory.child_categories[0]
    }

    return deepestCategory
}