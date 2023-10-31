import React, { useState } from 'react'
import { Box, Button, Skeleton } from '@mui/material'

import { CiSearch } from 'react-icons/ci'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import Loader from '../Loader/Loader';
import ChatLoading from '../loader/ChatLoading';
import { ChatState } from '../../context/ChatProvider';
import SearchUserList from './SearchUserList';


const SearchBox = () => {

    const { user, setSelectedChat, chats, setChats } = ChatState();
    // console.log("User Details from mainchats", user)

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    let [isOpen, setIsOpen] = useState(false)



    // Search user
    const handleSearch = async (e) => {
        e.preventDefault();
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

            setSearchResult(data);
            // console.log("75", searchResult);
            setLoading(false);
        } catch(error) {
            toast.error('Failed to load the search results')
        }
    }


    // after search select a user and Create a chat
    const accessChat = async (userId) => {
        // console.log(userId)
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post(`http://localhost:8000/api/chat`, { userId }, config);

            // if chat already have in db then append it
            if (!chats.find((chat) => chat._id === data._id)) {
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            setLoadingChat(false);
            setIsOpen(false)
        } catch (error) {
            toast.error('Error fetching the chats')
        }
    }



    return (
        <Box component='div' paddingTop='2vh' display='flex' flexDirection='column'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <form onSubmit={handleSearch}>
                    <Box sx={{ backgroundColor: 'white', borderRadius: '10px', height: '2.5rem', padding: '0 15px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 30px 5px #0.8', marginBottom: '4px' }}>
                        <input onClick={() => setIsOpen(true)} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by name and email' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', height: '100%', fontSize: '1rem', width: '100%', marginLeft: '5px' }} />

                        <button type='submit' style={{ border: 'none', outline: 'none', background: 'transparent' }}><CiSearch size={23} color='blue' cursor='pointer' /></button>
                    </Box>
                </form>


                {isOpen &&
                    <Box onClick={(e) => e.stopPropagation()} sx={{ position: 'fixed', width: '25%', top: '135px', zIndex: '100', background: 'white', display: 'flex', flexDirection: 'column', borderRadius: '10px', transition: 'all', marginBottom: '4px', maxHeight: '75vh', overflowY: 'auto', overflowX: 'hidden' }}>
                        {/* <p onClick={() => setIsOpen(false)}>hiii</p> */}

                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult.map((user) => (
                                <SearchUserList
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Loader />}
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default SearchBox
