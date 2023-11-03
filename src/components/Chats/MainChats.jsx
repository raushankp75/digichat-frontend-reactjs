import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import SearchBox from '../search/SearchBox'
import { ChatState } from '../../context/ChatProvider';

import ChatLoading from '../loader/ChatLoading'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getCurrentUserDetails } from '../../auth';
import { Grid } from 'react-loader-spinner';
import { getSenderName, getSenderPic } from '../../config/chatLogics';
import GroupChatSidebar from '../groupchats/GroupChatSidebar';
import Header from '../header/Header';
import { baseUrl } from '../../auth/baseUrl';


const MainChats = ({ fetchChatsAgain }) => {

  const [loggedUser, setLoggedUser] = useState();

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();


  // fetch chats by id
  const fetchChats = async () => {
    try {
      // loadingChat(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(`${baseUrl}/api/chat`, config);

      // console.log(data, 32)
      setChats(data);
    } catch (error) {
      toast.error('Failed to load the chats')
    }
  }


  useEffect(() => {
    // setLoggedUser(getCurrentUserDetails());
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInData")));
    fetchChats();
  }, [fetchChatsAgain]);

  // console.log(loggedUser.user._id)





  return (
    <Box sx={{ display: { xs: selectedChat ? 'none' : 'flex', sm: 'flex' }, width: { xs: '100%', sm: '30%' }, flexDirection: 'column', background: '#FFFFFF' }}>
      <Header />
      <SearchBox />

      <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', paddingX: '12px', paddingY: '8px' }}>
        {
          chats.map((chat) => (
            <Box onClick={() => setSelectedChat(chat)} key={chat._id} sx={{ background: selectedChat === chat ? '#C1E1C1' : 'transparent', color: '#111B21', paddingX: '15px', paddingY: '10px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', borderBottom: '2px solid #EEEDE7' }}>
              <Avatar src={!chat.isGroupChat ? getSenderPic(loggedUser, chat.users) : ''} alt="Remy Sharp" />
              <Box>
                <Typography sx={{ fontSize: { xs: '16px', sm: '18px', fontWeight: '500' } }}>
                  {!chat.isGroupChat ? getSenderName(loggedUser, chat.users) : chat.chatName}
                </Typography>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default MainChats