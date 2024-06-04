import { useState } from 'react'
import { Tooltip, Popover, Box } from '@mui/material'
import { EmojiEmotions } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'

function EmojiChoose() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleEmojiClick = (event, emojiObject) => {
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Biểu cảm'><EmojiEmotions sx={{ fontSize: 30, cursor: 'pointer', color: '#1976d2' }} onClick={handleClick} /></Tooltip>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
                <Box sx={{ width: 300, height: 300, overflowY: 'scroll' }}>
                    <EmojiPicker open={open} lazyLoadEmojis={true} onEmojiClick={handleEmojiClick} />
                </Box>
            </Popover>
        </div>
    )
}

export default EmojiChoose