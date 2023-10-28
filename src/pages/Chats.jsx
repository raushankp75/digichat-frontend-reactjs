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
    <Box display='flex' justifyContent='space-between' gap='10px'>
      {user && (<MainChats fetchChatsAgain={fetchChatsAgain} />)}
      {user && (<ChatBox fetchChatsAgain={fetchChatsAgain}  setFetchChatsAgain={setFetchChatsAgain} />)}
    </Box>
  )
}

export default Chats