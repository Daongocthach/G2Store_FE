import React, { useState } from 'react'
import { Box, Avatar, Typography, Rating, Dialog } from '@mui/material'
import emptyImage from '../../../assets/img/empty-order.png'

function CommentSection({ review }) {
    const [open, setOpen] = useState(false)
    const [imageZoom, setImageZoom] = useState(null)
    const [videoZoom, setVideoZoom] = useState(null)
    const [file_type, setFileType] = useState('image/jpeg')

    const handleClickZoom = async (file_url, file_type) => {
        setFileType(file_type)
        if (file_type == 'image/jpeg')
            setImageZoom(file_url)
        else {
            setVideoZoom(file_url)
        }
        handleClickOpen()
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Box>
            <Box sx={{ display: 'flex', borderRadius: 3, width: '100%', gap: 2, alignItems: 'center', mt: 3 }}>
                <Avatar sx={{ height: 50, width: 50, bgcolor: 'red' }}>{review?.review_id}</Avatar>
                <Box >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'}>{review?.customer_name || 'ẩn danh'}</Typography>
                        <Rating size='small' value={review?.rate} readOnly />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                        <Typography variant='subtitle1' color={'#444444'}>{review?.content}</Typography>
                        {Array.isArray(review?.files) && review?.files.length > 0 && review?.files.map((file, index) => (
                            <React.Fragment key={index}>
                                {file.file_type.startsWith('video/') ? (
                                    <video style={{ objectFit: 'cover', borderRadius: '10px', width: '50px', height: '50px' }}
                                        onClick={() => handleClickZoom(file.file_url, file.file_type)}>
                                        <source src={file.file_url} type={file.file_type} />
                                    </video>
                                ) : (
                                    <img src={file.file_url} alt={'ImageReview'} onClick={() => handleClickZoom(file.file_url, file.file_type)}
                                        style={{ objectFit: 'cover', borderRadius: '10px', width: '50px', height: '50px' }} />
                                )}
                            </React.Fragment>
                        ))}

                    </Box>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                {file_type == 'image/jpeg' ?
                    <img src={imageZoom || emptyImage} alt={'ZoomImage'}
                        style={{ objectFit: 'contain', cursor: 'pointer', width: '300px', height: '300px' }} /> :
                    <video controls width="100%" height='100%'>
                        <source src={videoZoom} type="video/mp4" />
                    </video>
                }

            </Dialog>

        </Box>
    )
}

export default CommentSection
