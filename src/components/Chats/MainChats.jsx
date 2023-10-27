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
import { getSender, getSenderPic } from '../../config/chatLogics';


const MainChats = () => {

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

      const { data } = await axios.get(`http://localhost:8000/api/chat`, config);

      console.log(data, 32)
      setChats(data);
    } catch (error) {
      toast.error('Failed to load the chats')
    }
  }


  useEffect(() => {
    setLoggedUser(getCurrentUserDetails());
    fetchChats();
  }, []);





  return (
    <>
      {/* <Box display='flex' flexDirection='column' gap='20px'> */}

      <Box sx={{ display: { xs: selectedChat ? 'none' : 'flex', sm: 'flex' }, width: { xs: '100%', sm: '25%' }, flexDirection: 'column', paddingX: '14px', paddingY: '5px', background: '#555', borderRadius: '10px', height: '88vh', marginTop: '5px', marginLeft: '5px' }}>
        <SearchBox />

        <Box sx={{ color: 'white', paddingBottom: '4px', paddingX: '4px', fontSize: '18px', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: { xs: '20px', sm: '24px' } }}>My Chats</Typography>

          {/* <Button sx={{background:'gray', color:'white'}}>New Group Chat</Button> */}
        </Box>



        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', overflowY: 'auto', overflowX: 'hidden', height: '73vh' }}>
          {
            chats.map((chat) => (
              <Paper onClick={() => setSelectedChat(chat)} key={chat._id} sx={{ background: selectedChat === chat ? 'gray' : 'transparent', color: selectedChat === chat ? '#222' : 'white', paddingX: '10px', paddingY: '5px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', }} elevation={2}>

                <Avatar src={!chat.isGroupChat ? getSenderPic(loggedUser, chat.users) : ''} alt="Remy Sharp" />

                <Box>
                  {/* <Typography sx={{ fontSize: '15px' }}>{chat.chatName}</Typography>
                  <Typography sx={{ fontSize: '15px' }}>hhgh</Typography> */}
                  <Typography>
                    {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                    {/* {console.log(getSender(loggedUser, chat.users))} */}
                  </Typography>
                </Box>
              </Paper>
            ))
          }
        </Box>
      </Box>
      {/* </Box> */}
    </>
  )
}

export default MainChats