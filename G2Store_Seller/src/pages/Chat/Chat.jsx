import { useState } from 'react'
import { Container, Paper } from '@mui/material'
import Messages from './Messages/Messages'
import Rooms from './Rooms/Rooms'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

export default function Chat() {
    const [room, setRoom] = useState()
    return (
        <Container className='min-h-screen'>
            <BreadCrumbs links={[{ name: 'Trò chuyện', href: '' }]} />
            <Paper elevation={4} sx={{ display: 'flex', mt: 2, height: '80vh' }}>
                <Rooms setRoom={setRoom} />
                <Messages room={room} />
            </Paper>
        </Container >
    )
}