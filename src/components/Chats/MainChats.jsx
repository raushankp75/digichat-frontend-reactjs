import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import SearchBox from '../search/SearchBox'
import { ChatState } from '../../context/ChatProvider';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getCurrentUserDetails } from '../../auth';


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

      <Box sx={{ display: { xs: selectedChat ? 'none' : 'flex', sm: 'flex' }, width: {xs: '100%', sm:'20%'}, flexDirection: 'column', alignItems: 'center', padding: '5px', background: 'white', borderRadius: '10px', border: '2px solid black', height: '88vh', marginTop:'5px', marginLeft:'5px' }}>
        <SearchBox />

        <Box sx={{ paddingBottom: '4px', paddingX: '4px', fontSize: '18px', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          My Chats

          <Button>New Group Chat</Button>
        </Box>

        {/* <Box>
          hdghsd
        </Box> */}
      </Box>
      {/* </Box> */}
    </>
  )
}

export default MainChats