import { useState } from 'react'
import { Avatar, TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Box } from '@mui/material'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [prevSender, setPrevSender] = useState('')

  const handleMessageSubmit = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, sender: 'You' }])
      setInputText('')
    }
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <h1>Chat</h1>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={message.sender} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={message.sender}
                secondary={
                  <Paper elevation={2} style={{ padding: '10px' }}>
                    {message.text}
                  </Paper>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <TextField
        label="Type a message"
        variant="outlined"
        value={inputText}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" onClick={handleMessageSubmit}>Send</Button>
    </Box>
  )
}

export default Chat
