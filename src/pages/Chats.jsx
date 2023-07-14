import React from 'react'
import { ChatState } from '../context/ChatProvider'
import MainChats from '../components/Chats/MainChats';
import ChatBox from '../components/Chats/ChatBox';
import { Box } from '@mui/material';
import Header from '../components/header/Header';

const Chats = () => {

  const { user } = ChatState();
  console.log("User Details", user)

  return (
    <Box>
      <Header />
      
      <Box display='flex' justifyContent='space-between'>
        {user && <MainChats />}
        {user && <ChatBox />}
      </Box>
    </Box>
  )
}

export default Chats