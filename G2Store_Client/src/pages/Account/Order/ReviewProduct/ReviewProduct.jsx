import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Rating } from '@mui/material'
import { AddCircle, Clear } from '@mui/icons-material'
import reviewApi from '../../../../apis/reviewApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function ReviewProduct({ orderItem, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')
    const [rate, setRate] = useState(5)
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertWarning, setShowAlertWarning] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
        setImages([])
        setFiles([])
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFiles(prevFiles => [...prevFiles, file])
            const reader = new FileReader()
            reader.onload = () => {
                const fileUrl = reader.result
                if (file.type.includes('image') || file.type.includes('video/mp4')) {
                    if (images.some(image => image.file === file)) {
                        setShowAlertWarning(true)
                    } else {
                        setImages(prevImages => [...prevImages, { file, fileUrl }])
                        setShowAlertWarning(false)
                    }
                } else {
                    console.log('Unsupported file type.')
                }
            }
            reader.readAsDataURL(file)
        }
    }
    const deleteImage = (imageData) => {
        const newImages = images.filter(image => image.fileUrl !== imageData.fileUrl)
        setImages(newImages)
        const newFiles = files.filter(file => file !== imageData.file)
        setFiles(newFiles)
    }
    const handleClickAdd = () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('content', content)
        formData.append('rate', rate)
        formData.append('orderItemId', orderItem?.item_id)
        files.forEach((file) => {
            formData.append('files', file)
        })
        reviewApi.addReview(formData)
            .then(() => {
                setShowAlert(true)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                setShowAlertFail(true)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box>
            <Button variant="contained" color='success' size='small' sx={{ borderRadius: 10 }} onClick={handleClickOpen}>
                Đánh giá
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ color: '#444444', textAlign: 'center' }}>Đánh giá sản phẩm</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <img src={orderItem?.image} alt='ProductImage' style={{ height: 50, width: 50, borderRadius: '10px' }} />
                        <Typography sx={{ color: '#444444' }} variant='subtitle1' fontWeight={'bold'} >{orderItem?.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
                        <TextField fullWidth size='medium' sx={{ mt: 2 }} rows={4} multiline label="Nhập nội dung" onChange={(e) => setContent(e.target.value)} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography minWidth={'100px'}>Đánh giá: </Typography>
                            <Rating size='large' value={rate} onChange={(event, newValue) => { setRate(newValue) }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Button component="label" htmlFor="upload-image" variant="contained" color="primary" sx={{ borderRadius: '10px', height: 70, width: 70 }} >
                                <AddCircle />
                                <input id="upload-image" type="file" accept="image/*,video/mp4" style={{ display: 'none' }} onChange={handleImageChange} />
                            </Button>
                            {Array.isArray(images) &&
                                images.map((image, index) => (
                                    <Box key={index} sx={{ position: 'relative', height: 70, width: 70, bgcolor: 'black', borderRadius: '10px' }}>
                                        {image?.file?.type.startsWith('video/') ?
                                            <video style={{ height: '100%', width: '100%', borderRadius: '10px' }}>
                                                <source src={image?.fileUrl} type={image?.file?.type} />
                                            </video>
                                            : <img src={image?.fileUrl} style={{ height: '100%', width: '100%', opacity: 0.5, borderRadius: '10px' }} />
                                        }
                                        <Clear sx={{ position: 'absolute', top: '5px', right: '5px', color: 'white', cursor: 'pointer', fontSize: 15 }}
                                            onClick={() => deleteImage(image)} />
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ ':hover': { bgcolor: 'inherit' } }}>Hủy</Button>
                    <Button onClick={handleClickAdd} sx={{ ':hover': { bgcolor: 'inherit' } }}>Gửi đi</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content='Đánh giá thành công' />
            <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Vui lòng không chọn cùng ảnh/video!'} isWarning={true} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đánh giá thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default ReviewProduct