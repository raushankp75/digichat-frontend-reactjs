import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Box } from '@mui/material'
import SingleChat from './SingleChat'


const ChatBox = ({ fetchChatsAgain, setFetchChatsAgain }) => {

  const { selectedChat } = ChatState()


  return (
    <Box sx={{display: { xs: selectedChat ? 'flex' : 'none', sm: 'flex' }, width: { xs: '100%', sm: '70%' }, flexDirection:'column'}}>
      <SingleChat fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain} />
    </Box>
  )
}

export default ChatBox