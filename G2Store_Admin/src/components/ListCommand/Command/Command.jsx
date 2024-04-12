import { useState } from 'react'
import { ExpandLess, ExpandMore, Category, Filter9Plus, People, Reorder, ThumbsUpDown, Equalizer, AddHomeWork, Money } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, ListItemButton, List, Collapse } from '@mui/material'


function Command({ open, button }) {
    const navigate = useNavigate()
    const [open1, setOpen1] = useState(false)
    const [selectedButton, setSelectedButton] = useState('')
    const iconMap = {
        'Sản phẩm': <Filter9Plus sx={{ color: (open1) ? '#00BFFF' : 'white' }} />,
        'Đơn hàng': <Reorder sx={{ color: (open1) ? '#00BFFF' : 'white' }} />,
        'Tài khoản': <People sx={{ color: (open1) ? '#00BFFF' : 'white' }} />,
        'Trò chuyện': <ThumbsUpDown sx={{ color: (open1) ? '#00BFFF' : 'white' }} />,
        'Thống kê': <Equalizer sx={{ color: (open1) ? '#00BFFF' : 'white' }} />,
        'Danh mục': <Category sx={{ color: (open1) ? '#00BFFF' : 'white' }} />,
        'Tài chính': <Money sx={{ color: (open1) ? '#00BFFF' : 'white' }} />
    }
    const handleClick = () => {
        if (open) {
            setOpen1(!open1)
        }
    }
    const handleButtonClick = (buttonCommand) => {
        setSelectedButton(buttonCommand.name === selectedButton ? '' : buttonCommand.name)
        navigate(buttonCommand.path)
    }
    return (
        <Box>
            <ListItemButton onClick={handleClick} sx={{ p: 1, justifyContent: 'space-between' }} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {iconMap[button.name]}
                    <Typography variant='h6' sx={{ visibility: open ? 'visible' : 'hidden', color: (open1) ? '#00BFFF' : 'white', fontSize: 17 }}>
                        {button?.name}
                    </Typography>
                </Box>
                {open1 ? <ExpandLess sx={{ color: '#00BFFF' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
            {open && <Collapse in={open1} timeout="auto" unmountOnExit>
                <List>
                    {button.commands.map((button, index) => (
                        <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => handleButtonClick(button)}>
                            <Typography variant='subtitle2' sx={{ color: 'white', fontSize: 15 }} >{button.name}</Typography>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>}
        </Box>
    )
}

export default Command

