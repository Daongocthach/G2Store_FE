import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import authenApi from '../../../apis/authenApi'
import { updateAvatar } from '../../../redux/actions/auth'
import avatarNull from '../../../assets/img/avatar.png'
import Loading from '../../../components/Loading/Loading'

function UpdateAvatar({ reRender, setReRender, setShowAlert, setShowAlertFail }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            handleUpdateAvatar(file)
        }
    }
    const handleUpdateAvatar = async (file) => {
        setLoading(true)
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            authenApi.updateAvatar(formData)
                .then((response) => {
                    dispatch(updateAvatar(response?.avatar))
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
            <Button component="label" htmlFor="upload-image" variant="contained" color="warning" sx={{ fontWeight: 'bold', borderRadius: 2 }} >
                <AddCircle sx={{ mr: 1 }} />
                Ảnh đại diện
                <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </Button>
            <img src={user?.avatar || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
            {loading && <Loading />}
        </Box>
    )
}

export default UpdateAvatar