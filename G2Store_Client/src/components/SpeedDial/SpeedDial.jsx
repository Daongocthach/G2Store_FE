import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { Forum, AccountCircle, Reorder, EditLocationAlt } from '@mui/icons-material'

const actions = [
    { icon: <Forum />, name: 'Chat', path: '/chat' },
    { icon: <EditLocationAlt />, name: 'Địa chỉ', path: '/profile', state: 2 },
    { icon: <Reorder />, name: 'Đơn hàng', path: '/profile', state: 0 },
    { icon: <AccountCircle />, name: 'Tài khoản', path: '/profile', state: 1 }
]

export default function SpeedDialTooltipOpen() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => navigate(action.path, { state: action?.state })}
                />
            ))}
        </SpeedDial>
    )
}
