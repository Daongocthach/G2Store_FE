import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import shopApi from '../../../apis/shopApi'
import avatarNull from '../../../assets/img/avatar.png'
import Loading from '../../../components/Loading/Loading'

function UpdateImageShop({ image, reRender, setReRender, setShowAlert, setShowAlertFail }) {
    const [imageShop, setImageShop] = useState(image)
    const [loading, setLoading] = useState(false)
    const handleImageChange = async (e) => {
        const image = e.target.files[0]
        if (image) {
            handleUpdateImage(image)
        }
    }
    const handleUpdateImage = async (file) => {
        setLoading(true)
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            shopApi.updateImageShop(formData)
                .then(() => {
                    const reader = new FileReader()
                    reader.onload = () => {
                      setImageShop(reader.result)
                    }
                    reader.readAsDataURL(file)
                    setShowAlert(true)
                    setReRender(!reRender)
                })
                .catch((error) => {
                    console.log(error)
                    setShowAlertFail(true)
                })
                .finally(() => setLoading(false))
        }
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1 }}>
            <Button component="label" htmlFor="upload-image-shop" variant="contained" color="warning" sx={{ fontWeight: 'bold', borderRadius: 2 }} >
                <AddCircle sx={{ mr: 1 }} />
                Ảnh đại điện
                <input id="upload-image-shop" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            </Button>
            <img src={imageShop || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
            {loading && <Loading />}
        </Box>
    )
}

export default UpdateImageShop
