import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import MainChats from '../components/Chats/MainChats';
import ChatBox from '../components/Chats/ChatBox';
import { Box } from '@mui/material';
import Header from '../components/header/Header';

const Chats = () => {

  const { user } = ChatState();
  // console.log("User Details", user)
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false)

  return (
    <Box sx={{ background: '#DDDEDC', height: '100vh' }}>
      <Box sx={{background:'#00A783', height:'20vh'}}>
        <Box sx={{ display: 'flex', height: { xs: '100vh', sm: '94vh' }, width: { xs: '100%', sm: '97%' }, padding: { xs: '0', sm: '20px' } }}>
          {user && (<MainChats fetchChatsAgain={fetchChatsAgain} />)}
          {user && (<ChatBox fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain} />)}
        </Box>
      </Box>
    </Box>
  )
}

export default Chats