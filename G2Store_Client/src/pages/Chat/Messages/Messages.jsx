import { Box, Avatar, Paper, Tooltip, Typography, TextField } from '@mui/material'
import { Send, AddPhotoAlternate, DeleteForever } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import EmojiChoose from '../../../components/EmojiChoose/EmojiChoose'
import messageApi from '../../../apis/messageApi'

var stompClient = null

function Messages({ room }) {
    const [inputText, setInputText] = useState('')
    const [messages, setMessages] = useState([])
    const [privateChats, setPrivateChats] = useState(new Map())
    useEffect(() => {
        if (room?.id) {
            messageApi.getMessagesByRoomId(room?.id)
                .then(response => {
                    setMessages(response?.data)
                    connect()
                })
                .catch(error => console.log(error))
        }
    }, [room?.id])
    const handleMessageSubmit = () => {
        if (inputText.trim() !== '' && stompClient) {
            setInputText('')
            if (stompClient) {
                var chatMessage = {
                    avatar: 'https://www.lolsolved.gg/static/wiki/Gwen_0.jpg',
                    senderName: room?.senderName,
                    receiverName: room?.receiverName,
                    message: inputText,
                    status: 'MESSAGE'
                }
                stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
            }
        }
    }
    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }
    const onError = (err) => { console.log(err) }
    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws')
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }
    const onConnected = () => {
        stompClient.subscribe('/user/' + room?.senderName + '/private', onPrivateMessage)
    }
    const onPrivateMessage = (payload) => {
        console.log(payload)
        var payloadData = JSON.parse(payload.body)
        if (privateChats.get(payloadData?.senderName)) {
            privateChats.get(payloadData?.senderName).push(payloadData)
            setPrivateChats(new Map(privateChats))
        } else {
            let list = []
            list.push(payloadData)
            privateChats.set(payloadData?.senderName, list)
            setPrivateChats(new Map(privateChats))
        }
    }
    return (
        <Box sx={{ m: 2, flex: 1, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#2f3640', p: 0.5, mb: 2, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Avatar alt={room?.receiverName} src={'https://www.lolsolved.gg/static/wiki/Gwen_0.jpg'} sx={{ height: 50, width: 50 }} />
                <Typography sx={{ color: 'white' }} variant='h6'>{room?.receiverName}</Typography>
            </Box>
            <Box sx={{ height: '80%', overflow: 'scroll' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 0.5 }}>
                    {Array.isArray(messages) && messages.map((message, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Avatar alt={message?.senderName} src="/static/images/avatar/1.jpg" />
                                <Paper elevation={4}>
                                    {message.text}
                                </Paper>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiChoose />
                <Tooltip title='Thêm hình ảnh'><AddPhotoAlternate sx={{ fontSize: 30, cursor: 'pointer', color: '#1976d2' }} /></Tooltip>
                <Tooltip title='Xóa cuộc trò chuyện'><DeleteForever sx={{ fontSize: 30, cursor: 'pointer', color: 'gray' }} /></Tooltip>
                <TextField label="Nhập tin nhắn" variant="outlined" sx={{ bgcolor: '#e8f0fe' }} color='primary' size='small' fullWidth value={inputText} onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit()} />
                <Send sx={{ height: 30, width: 25, cursor: 'pointer', color: '#1976d2' }} onClick={handleMessageSubmit} />
            </Box>
        </Box>
    )
}

export default Messages