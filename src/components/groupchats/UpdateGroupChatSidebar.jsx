import React, { useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { RxCross2 } from 'react-icons/rx'
import { ChatState } from '../../context/ChatProvider'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserBadge from '../search/UserBadge';
import axios from 'axios';
import ChatLoading from '../loader/ChatLoading';
import SearchUserList from '../search/SearchUserList'
import Loader from '../loader/Loader';
import { baseUrl } from '../../auth/baseUrl';



const UpdateGroupChatSidebar = ({ isOpenSidebar, onClose, fetchChatsAgain, setFetchChatsAgain, fetchAllMessages }) => {

    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    const [removeUserLoading, setRemoveUserLoading] = useState(false)

    let [isOpen, setIsOpen] = useState(false)

    const { user, selectedChat, setSelectedChat } = ChatState()

    // console.log(user, 28)



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

            const { data } = await axios.get(`${baseUrl}/api/user?search=${search}`, config)

            setSearchResult(data);
            console.log("40", searchResult);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load the search results')
        }
    }



    const handleRename = async () => {
        if (!groupChatName) {
            return
        }

        try {
            setRenameLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put(`${baseUrl}/api/chat/grouprename`, {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, config)

            setSelectedChat(data);
            setFetchChatsAgain(!fetchChatsAgain)
            setRenameLoading(false)
            toast.success('Group Name Updated')
            setGroupChatName('')
        } catch (error) {
            toast.error('Failed to rename group')
            setRenameLoading(false)
        }
    }


    const handleAddUser = async (existUser) => {
        // console.log(selectedChat.groupAdmin._id)
        // console.log(user._id)
        if (selectedChat.users.find((user) => user._id === existUser._id)) {
            toast.error('User already in the group')
            return
        }

        if (selectedChat.groupAdmin._id !== user.user._id) {
            toast.error('Only Admin can add someone')
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put(`${baseUrl}/api/chat/groupadd`, {
                chatId: selectedChat._id,
                userId: existUser._id
            }, config)

            setSelectedChat(data);
            setFetchChatsAgain(!fetchChatsAgain)
            setLoading(false)
            toast.success('Group Users Updated')
            setIsOpen(false)
        } catch (error) {
            toast.error('Failed to update user')
            setLoading(false)
        }


    }



    const handleRemoveUser = async (existUser) => {
        if (selectedChat.groupAdmin._id !== user.user._id && existUser._id !== user.user._id) {
            toast.error('Only Admin can remove someone')
            return
        }

        try {
            setRemoveUserLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put(`${baseUrl}/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: existUser._id
            }, config)


            existUser._id === user.user._id ? setSelectedChat() : setSelectedChat(data)
            setFetchChatsAgain(!fetchChatsAgain)
            // refresh all messages again
            fetchAllMessages()
            setRemoveUserLoading(false)
            // onClose()
            // toast.error('User Updated')
        } catch (error) {
            toast.error(error.response.data)
            setRemoveUserLoading(false)
        }
    }





    return (
        <Box onClick={onClose} sx={{ position: 'fixed', inset: '0', transition: 'colors', zIndex: '100', visibility: isOpenSidebar ? 'visible' : 'hidden' }}>
            {/*Sidebar */}
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: { xs: '95%', sm: '449px' }, display: 'flex', flexDirection: 'column', gap: '10px', height: '100vh', background: 'white', color: 'black', position: 'absolute', overflowX: 'hidden', overflowY: 'auto', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px', transition: 'all 4s linear', transitionDuration: '0.5s', left: isOpenSidebar ? '0' : '-449px' }}>
                <button onClick={onClose} style={{ width: 'fixed', alignSelf: 'end', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px' }}><RxCross2 size={30} /></button>

                <Typography fontSize='30px' marginBottom='20px'>{selectedChat.chatName}</Typography>

                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '5px', fontSize: '14px', marginBottom:'10px' }}>
                    {selectedChat.users.map((user) => (
                        <UserBadge key={user._id} user={user} handleFunction={() => handleRemoveUser(user)} />
                    ))}
                    {removeUserLoading && <Loader />}
                </Box>

                <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                    <form style={{ display: 'flex', gap: '10px' }}>
                        <input onChange={(e) => setGroupChatName(e.target.value)} type="text" placeholder='Group Chat Name' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '15px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)', width:'100%' }} />

                        <Button onClick={handleRename} variant='contained' color='success' sx={{ marginLeft: 'auto', paddingX: '25px'}}>{renameLoading === true ? (<Loader />) : 'Rename'}</Button>
                    </form>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input onClick={() => setIsOpen(true)} onChange={(e) => handleSearch(e.target.value)} type="text" placeholder='Add Users eg: John Doe, Jane Doe' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '15px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)' }} />
                    </form>

                    {/* render searched user */}
                    {isOpen &&
                        <Box onClick={(e) => e.stopPropagation()} sx={{ width: '100%', background: 'white', display: 'flex', flexDirection: 'column', marginBottom: '4px', overflowY: 'auto', overflowX: 'hidden', height: '30vh' }}>
                            {/* <p onClick={() => setIsOpen(false)}>hiii</p> */}

                            {loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.slice(0, 4).map((user) => (
                                    < SearchUserList
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleAddUser(user)}
                                    />
                                ))
                            )}
                        </Box>
                    }

                </Paper>
                    <Button onClick={() => handleRemoveUser(user.user)} variant='contained' color='error' sx={{ marginLeft: 'auto' }}>
                        Leave Group
                    </Button>
            </Box>
        </Box>
    )
}

export default UpdateGroupChatSidebar