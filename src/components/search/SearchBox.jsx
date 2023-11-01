import React, { useState } from 'react'
import { Box, Button, Skeleton, Typography } from '@mui/material'

import { CiSearch } from 'react-icons/ci'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import Loader from '../Loader/Loader';
import ChatLoading from '../loader/ChatLoading';
import { ChatState } from '../../context/ChatProvider';
import SearchUserList from './SearchUserList';

import { RxCross2 } from 'react-icons/rx'
import { HiUsers } from 'react-icons/hi'
import GroupChatSidebar from '../groupchats/GroupChatSidebar';


const SearchBox = ({ isOpenSidebarChat, onCloseChat }) => {

    // for create group chat sidebar
    let [isOpenSidebarGroupChat, setIsOpenSidebarGroupChat] = useState(false)

    const { user, setSelectedChat, chats, setChats } = ChatState();
    // console.log("User Details from mainchats", user)

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    // let [isOpen, setIsOpen] = useState(false)



    // Search user on click
    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     if (!search) {
    //         toast.warn('Write any name or email in search box')
    //     }

    //     try {
    //         setLoading(true);

    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         };

    //         const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, config)

    //         setSearchResult(data);
    //         // console.log("75", searchResult);
    //         setLoading(false);
    //     } catch (error) {
    //         toast.error('Failed to load the search results')
    //     }
    // }


    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, config)

            setSearchResult(data);
            console.log("40", searchResult);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load the search results')
            setLoading(true);
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
            onCloseChat()
        } catch (error) {
            toast.error('Error fetching the chats')
        }
    }



    return (
        <Box onClick={onCloseChat} sx={{ position: 'fixed', inset: '0', transition: 'colors', zIndex: '100', visibility: isOpenSidebarChat ? 'visible' : 'hidden' }}>
            {/*Sidebar */}
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: { xs: '95%', sm: '449px' }, display: 'flex', flexDirection: 'column', height: '100vh', background: 'white', color: 'black', position: 'absolute', overflowX: 'hidden', overflowY: 'auto', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px', transition: 'all 4s linear', transitionDuration: '0.4s', left: isOpenSidebarChat ? '0' : '-450px' }}>
                <button onClick={onCloseChat} style={{ width: 'fixed', alignSelf: 'end', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', marginBottom: '5px' }}><RxCross2 size={30} /></button>

                <Box component='div' paddingTop='2vh' display='flex' flexDirection='column'>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* Input search Box */}
                        {/* <form onSubmit={handleSearch}>
                            <Box sx={{ backgroundColor: '#F0F2F5', borderRadius: '10px', height: '2.5rem', padding: '5px 15px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 30px 5px #0.8' }}>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by name and email' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', height: '100%', fontSize: '1rem', width: '100%' }} />

                                <button type='submit' style={{ border: 'none', outline: 'none', background: 'transparent' }}><CiSearch size={23} color='blue' cursor='pointer' /></button>
                            </Box>
                        </form> */}

                        <Box sx={{ backgroundColor: '#F0F2F5', borderRadius: '10px', height: '2.5rem', padding: '5px 10px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 30px 5px #0.8' }}>
                            <button style={{ border: 'none', outline: 'none', background: 'transparent' }}><CiSearch size={23} color='blue' cursor='pointer' /></button>

                            <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Search by name and email' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', height: '100%', fontSize: '1rem', width: '100%', padding: '2px 10px' }} />
                        </Box>


                        {/* Create group */}
                        <Typography
                            onClick={() => {
                                onCloseChat()
                                setIsOpenSidebarGroupChat(true)
                            }}
                            sx={{display:'flex', alignItems:'center', gap:'15px', cursor:'pointer'}}
                        > <HiUsers size={30} height={50} width={50} color='white' style={{borderRadius:'50%', background:'#00A783', padding:'7px'}} /> <span style={{fontSize:'18px'}}>New Group</span>
                        </Typography>
                        
                        <GroupChatSidebar isOpenSidebarGroupChat={isOpenSidebarGroupChat} onCloseGroupChat={() => setIsOpenSidebarGroupChat(false)} />


                        {/* Search result */}
                        <Box onClick={(e) => e.stopPropagation()} sx={{ width: '100%', background: 'white', display: 'flex', flexDirection: 'column', marginBottom: '4px', overflowY: 'auto', overflowX: 'hidden', height: '80vh' }}>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchBox
