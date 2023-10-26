import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
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
      <Box display='flex' flexDirection='column' gap='20px'>
        {/* <input type='text' placeholder='Search by name and email' style={{ padding:'10px 10px' }} /> */}
            
        <SearchBox />
      </Box>
    </>
  )
}

export default MainChats