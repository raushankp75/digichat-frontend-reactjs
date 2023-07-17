import { Box, Button, Skeleton } from '@mui/material'
import React from 'react'
import SearchBar from '../SearchBar'
import { CiSearch } from 'react-icons/ci'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../loader/Loader';
import ChatLoading from '../loader/ChatLoading';
import { ChatState } from '../../context/ChatProvider';
import UserList from '../userlist/UserList';



const MainChats = () => {

  const { user } = ChatState();
  console.log("User Details from mainchats", user)

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingChat, setLoadingChat] = React.useState();


  // const { user, setSelectedChat } = ChatState();



  // Search user
  const handleSearch = async () => {
    if (!search) {
      toast.warn('Write any name or email in search box')
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, config)

      setLoading(false);
      setSearchResult(data);
    } catch {
      toast.error('Failed to load the search results')
    }
  }


  // after search select a chat and show it
  const accessChat = async (userId) => {
    try {
      loadingChat(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post(`http://localhost:8000/api/chat`, { userId }, config);
      
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {

    }

  }

  return (
    <>
      <Box display='flex' flexDirection='column' gap='20px'>
        {/* <input type='text' placeholder='Search by name and email' style={{ padding:'10px 10px' }} /> */}

        {/* // Search component */}
        <Box component='div' paddingTop='2vh' display='flex' flexDirection='column'>
          {/* <SearchBar /> */}
          {/* Search component */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Box sx={{ backgroundColor: 'white', borderRadius: '10px', height: '2.5rem', padding: '0 15px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 8px #ddd' }}>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by name and email' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', height: '100%', fontSize: '1rem', width: '100%', marginLeft: '5px' }} />

              <CiSearch size={23} color='blue' cursor='pointer' onClick={handleSearch} />
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '80vh', overflowX: 'hidden' }}>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>





        MainChats
      </Box>
    </>
  )
}

export default MainChats