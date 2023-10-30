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
import Loader from '../Loader/Loader';



const UpdateGroupChatSidebar = ({ isOpenSidebar, onClose, fetchChatsAgain, setFetchChatsAgain }) => {

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

            const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, config)

            setSearchResult(data);
            console.log("40", searchResult);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load the search results')
            setLoading(true);
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

            const { data } = await axios.put(`http://localhost:8000/api/chat/grouprename`, {
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

            const { data } = await axios.put(`http://localhost:8000/api/chat/groupadd`, {
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

            const { data } = await axios.put(`http://localhost:8000/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: existUser._id
            }, config)


            existUser._id === user.user._id ? setSelectedChat() : setSelectedChat(data)
            setFetchChatsAgain(!fetchChatsAgain)
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
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: { xs: '95%', sm: '350px' }, display: 'flex', flexDirection: 'column', height: '100vh', background: 'white', color: 'black', position: 'absolute', overflowX: 'hidden', overflowY: 'auto', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px', transition: 'all 4s linear', transitionDuration: '0.5s', left: isOpenSidebar ? '0' : '-300px' }}>
                <button onClick={onClose} style={{ width: 'fixed', alignSelf: 'end', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px' }}><RxCross2 size={30} /></button>

                <Typography textAlign='center' fontSize='25px'>{selectedChat.chatName}</Typography>

                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '5px', fontSize: '14px' }}>
                    {selectedChat.users.map((user) => (
                        <UserBadge key={user._id} user={user} handleFunction={() => handleRemoveUser(user)} />
                    ))}
                    {removeUserLoading && <Loader />}
                </Box>

                <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                    <form style={{ display: 'flex', gap: '10px' }}>
                        <input onChange={(e) => setGroupChatName(e.target.value)} type="text" placeholder='Group Chat Name' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '10px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)' }} />

                        <Button onClick={handleRename} variant='contained' color='success' sx={{ marginLeft: 'auto' }}>{renameLoading === true ? (<Loader />) : 'Rename'}</Button>
                    </form>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input onClick={() => setIsOpen(true)} onChange={(e) => handleSearch(e.target.value)} type="text" placeholder='Add Users eg: John Doe, Jane Doe' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '10px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)' }} />
                    </form>

                    {/* render searched user */}
                    {isOpen &&
                        <Box onClick={(e) => e.stopPropagation()} sx={{ position: 'fixed', width: '26%', top: '300px', zIndex: '100', background: 'white', display: 'flex', flexDirection: 'column', borderRadius: '10px', transition: 'all', marginBottom: '4px', maxHeight: '75vh', overflowY: 'auto', overflowX: 'hidden' }}>
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

                    <Button onClick={() => handleRemoveUser(user.user)} varient='danger'>
                        Leave Group
                    </Button>
                </Paper>
            </Box>
        </Box>
    )
}

export default UpdateGroupChatSidebar