import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Box, Typography, FormControl, Select, MenuItem, Alert, Snackbar } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import productApi from '../../../../apis/productApi'
import { addProduct } from '../../../../redux/actions/products'

function AddProduct({ setUpdate }) {
    const dispatch = useDispatch()
    const subCategories = useSelector(state => state.subCategories.subCategories)
    const providers = useSelector(state => state.providers.providers)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [discount, setDiscount] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [length, setLength] = useState(0)
    const [subCategory, setSubCategory] = useState(subCategories[0]?.id)
    const [provider, setProvider] = useState(providers[0]?.id)
    const [image, setImage] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value)
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleClickAdd = () => {
        productApi.addProduct(name, price, description, discount, subCategory, provider, image)
            .then((response) => {
                setShowAlert(true)
                dispatch(addProduct(response.data))
                setUpdate(response.data.id + 1)
            })
            .catch(error => {
                console.log(error)
                setShowAlertFail(true)
            })
    }
    return (
        <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', p: 1, bgcolor: '#E8E8E8' }}>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Thông tin cơ bản</Typography>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Tên sản phẩm: </Typography>
                    </Box>
                    <TextField fullWidth size='small' placeholder='Ex: Bánh gạo' value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Danh mục sản phẩm: </Typography>
                    </Box>
                    <FormControl size={'small'} fullWidth>
                        <Select value={subCategory} onChange={handleChangeSubCategory} >
                            {Array.isArray(subCategories) && subCategories?.map((subCategory, index) => {
                                return (
                                    <MenuItem key={index} value={subCategory?.id}>{subCategory?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Giá: </Typography>
                        </Box>
                        <TextField size='small' type='number' inputProps={{ min: 0 }} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Typography >Giá đặc biệt: </Typography>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={discount} onChange={(e) => setDiscount(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Số lượng sản phẩm: </Typography>
                        </Box>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </Box>
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Mô tả: </Typography>
                    </Box>
                    <TextField fullWidth size='medium' multiline rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Typography variant='body1'>Hình ảnh: </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField size='small' type={'file'} onChange={handleImageChange} />
                        {image && <img src={image} style={{ height: '50px', width: '50px' }} />}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ flexDirection: 'column', gap: 2, display: 'flex', bgcolor: 'white', p: 1, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Đặc tính sản phẩm</Typography>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Khối lượng sản phẩm: </Typography>
                    </Box>
                    <TextField size='small' value={weight} onChange={(e) => setWeight(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Chiều dài (cm): </Typography>
                        </Box>
                        <TextField size='small' type='number' inputProps={{ min: 0 }} value={length} onChange={(e) => setLength(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Chiều rộng (cm): </Typography>
                        </Box>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={width} onChange={(e) => setWidth(e.target.value)} />
                    </Box>
                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                            <Typography variant='body1'>Chiều cao (cm): </Typography>
                        </Box>
                        <TextField fullWidth size='small' type='number' inputProps={{ min: 0 }} value={height} onChange={(e) => setHeight(e.target.value)} />
                    </Box>
                </Box>
                <Box sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' sx={{ color: 'red' }}>*</Typography>
                        <Typography variant='body1'>Thương hiệu sản phẩm: </Typography>
                    </Box>
                    <FormControl size={'small'} fullWidth>
                        <Select value={subCategory} onChange={handleChangeSubCategory} >
                            {Array.isArray(subCategories) && subCategories?.map((subCategory, index) => {
                                return (
                                    <MenuItem key={index} value={subCategory?.id}>{subCategory?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'end', pr: 5 }}>
                <Button onClick={() => { handleClickAdd() }} sx={{ bgcolor: '#1a71ff', color: 'white', fontWeight: '500', ':hover': { bgcolor: '#00B2EE' } }}>Gửi đi</Button>
            </Box>


        </Box>
    )
}
export default AddProduct