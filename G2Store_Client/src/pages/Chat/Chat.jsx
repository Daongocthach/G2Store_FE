import { useState } from 'react'
import { Breadcrumbs, Link, Container, Paper } from '@mui/material'
import Messages from './Messages/Messages'
import Rooms from './Rooms/Rooms'

export default function Chat() {
    const [room, setRoom] = useState()
    return (
        <Container >
            <Breadcrumbs sx={{ pt: 1 }}>
                <Link underline="hover" color="inherit" href="/" sx={{ fontSize: 15 }}> Trang chủ</Link>
                <Link underline="hover" color="inherit" sx={{ fontSize: 15 }}>Trò chuyện</Link>
            </Breadcrumbs>
            <Paper elevation={4} sx={{ display: 'flex', mt: 2, height: '80vh' }}>
                <Rooms setRoom={setRoom}/>
                <Messages room={room}/>
            </Paper>
        </Container >

    )
}

const messageExamples = [
    {
        name: 'Ashe',
        secondary: 'I\'ll be in the neighbourhood this week. Let\'s grab a bite to eat',
        image: 'https://www.lolsolved.gg/static/wiki/Ashe_0.jpg'
    },
    {
        name: 'Ahri',
        secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
        image: 'https://www.lolsolved.gg/static/wiki/Ahri_0.jpg'
    },
    {
        name: 'Irelia',
        secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
        image: 'https://www.lolsolved.gg/static/wiki/Irelia_0.jpg'
    },
    {
        name: 'Zoe',
        secondary: 'I have the tickets to the ReactConf for this year.',
        image: 'https://www.lolsolved.gg/static/wiki/Zoe_0.jpg'
    },
    {
        name: 'Jinx',
        secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
        image: 'https://www.lolsolved.gg/static/wiki/Jinx_0.jpg'
    },
    {
        name: 'Gwen',
        secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
        image: 'https://www.lolsolved.gg/static/wiki/Gwen_0.jpg'
    },
    {
        name: 'Riven',
        secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
        image: 'https://www.lolsolved.gg/static/wiki/Riven_0.jpg'
    }
]