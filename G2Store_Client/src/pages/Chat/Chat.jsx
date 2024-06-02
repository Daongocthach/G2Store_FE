import { useState, useEffect } from 'react'
import {
    Breadcrumbs, Link, Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Container, TextField, Paper, Tooltip, Typography, Popover
} from '@mui/material'
import { Send, AddPhotoAlternate, EmojiEmotions, DeleteForever } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

export default function Chat() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [message, setMessage] = useState('')
    const [nickname, setNickname] = useState('')
    const [stompClient, setStompClient] = useState(null)
    const [selectedChat, setSelectedChat] = useState(messageExamples[0])
    const [inputText, setInputText] = useState('')
    const [messages, setMessages] = useState([])
    let lastSender = null

    useEffect(() => {
        // const connectWebSocket = async () => {
        //     const socket = new SockJS('http://localhost:8080/ws')
        //     const client = Stomp.over(socket)

        //     client.connect({}, () => {
        //         client.subscribe('/topic/messages', (message) => {
        //             const receivedMessage = JSON.parse(message.body)
        //             setMessages((prevMessages) => [...prevMessages, receivedMessage])
        //         })
        //     })
        //     setStompClient(client)
        //     return () => {
        //         client.disconnect()
        //     }
        // }
        // connectWebSocket()
    }, [])

    // const handleNicknameChange = (event) => {
    //     setNickname(event.target.value)
    // }

    // const handleMessageChange = (event) => {
    //     setMessage(event.target.value)
    // }

    // const sendMessage = () => {
    //     if (message.trim()) {
    //         const chatMessage = {
    //             nickname,
    //             avatar: 'https://www.lolsolved.gg/static/wiki/Gwen_0.jpg',
    //             content: message,
    //         }

    //         stompClient.send('/app/chat', {}, JSON.stringify(chatMessage))
    //         setMessage('')
    //     }
    // }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMessageSubmit = () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { text: inputText, sender: 'Bạn' }])
            setInputText('')
        }
    }
    const handleEmojiClick = (event, emojiObject) => {
        handleClose()
    }
    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }
    return (
        <Container >
            <Breadcrumbs sx={{ pt: 1 }}>
                <Link underline="hover" color="inherit" href="/" sx={{ fontSize: 15 }}> Trang chủ</Link>
                <Link underline="hover" color="inherit" sx={{ fontSize: 15 }}>Trò chuyện</Link>
            </Breadcrumbs>
            <Paper elevation={4} sx={{ display: 'flex', mt: 2, height: '80vh' }}>
                <Box sx={{ maxWidth: 350, overflow: 'scroll' }} >
                    <List>
                        {messageExamples.map((message, index) => (
                            <ListItemButton key={index} onClick={() => setSelectedChat(message)}>
                                <ListItemAvatar>
                                    <Avatar alt="Ảnh đại diện" src={message?.image} />
                                </ListItemAvatar>
                                <ListItemText primary={message.name} secondary={message.secondary} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Box sx={{ m: 2, flex: 1, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#2f3640', p: 0.5, mb: 2, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Avatar alt={selectedChat?.name} src={selectedChat?.image} sx={{ height: 50, width: 50 }} />
                        <Typography sx={{ color: 'white' }} variant='h6'>{selectedChat?.name}</Typography>
                    </Box>
                    <Box sx={{ height: '80%', overflow: 'scroll' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 0.5 }}>
                            {Array.isArray(messages) && messages.map((message, index) => {
                                const showAvatar = message.sender !== lastSender
                                lastSender = message.sender
                                return (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: message?.sender !== selectedChat?.sender ? 'flex-end' : 'flex-start' }}>
                                        {showAvatar && message?.sender === selectedChat?.sender && (
                                            <Avatar alt={message.sender} src="/static/images/avatar/1.jpg" />
                                        )}
                                        <Paper elevation={4} sx={{ p: 1, ml: !showAvatar ? 7 : 0 }}>
                                            {message.text}
                                        </Paper>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title='Biểu cảm'><EmojiEmotions sx={{ fontSize: 30, cursor: 'pointer', color: '#1976d2' }} onClick={handleClick} /></Tooltip>
                        <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
                            <Box sx={{ width: 300, height: 300, overflowY: 'scroll' }}>
                                <EmojiPicker open={open} lazyLoadEmojis={true} onEmojiClick={handleEmojiClick} />
                            </Box>
                        </Popover>
                        <Tooltip title='Thêm hình ảnh'><AddPhotoAlternate sx={{ fontSize: 30, cursor: 'pointer', color: '#1976d2' }} /></Tooltip>
                        <Tooltip title='Xóa cuộc trò chuyện'><DeleteForever sx={{ fontSize: 30, cursor: 'pointer', color: 'gray' }} /></Tooltip>
                        <TextField label="Nhập tin nhắn" variant="outlined" sx={{ bgcolor: '#e8f0fe' }} color='primary' size='small' fullWidth value={inputText} onChange={handleInputChange}
                            onKeyPress={(e) => e.key === 'Enter' ? handleMessageSubmit : null} />
                        <Send sx={{ height: 30, width: 25, cursor: 'pointer', color: '#1976d2' }} onClick={handleMessageSubmit} />
                    </Box>
                </Box>
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
