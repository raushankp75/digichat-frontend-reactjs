import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Box } from '@mui/material'
import SingleChat from './SingleChat'


const ChatBox = ({fetchChatsAgain, setFetchChatsAgain}) => {

  const {selectedChat} = ChatState()


  return (
    <Box sx={{display: { xs: selectedChat ? 'flex' : 'none', sm: 'flex' }, width: { xs: '100%', sm: '70%' }, flexDirection: 'column', alignItems:'center', paddingY: '5px', background: '#222', color:'white', maxWidth: '100%', minHeight: '100vh', maxHeight:'100vh'}}>
       
      <SingleChat fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain} />
    </Box>
  )
}

export default ChatBox