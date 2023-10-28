import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import ChatLoading from '../loader/ChatLoading';
import SearchUserList from '../search/SearchUserList'
import UserBadge from '../search/UserBadge';


const GroupChatSidebar = ({ isOpenSidebar, onClose }) => {

    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    let [isOpen, setIsOpen] = useState(false)

    const { user, chats, setChats } = ChatState()

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


    const handleSubmit = async () => {
        console.log(groupChatName, selectedUsers)
        if(!groupChatName || !selectedUsers){
            toast.error('Please fill all the fields')
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post(`http://localhost:8000/api/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((user) => user._id))
            }, config)

            setChats(data, ...chats);
            // console.log(chats)
            onClose()
            toast.error('Group Chat Created')
        } catch (error) {
            toast.error('Failed to Create Group Chat')
        }
    }


    const handleGroup = (newUser) => {
        if (selectedUsers.includes(newUser)) {
            toast.error('User Already Added')
            return
        }

        setSelectedUsers([...selectedUsers, newUser])

        setIsOpen(false)
    }


    const handleDelete = (deletedUser) => {
        setSelectedUsers(selectedUsers.filter((select) => select._id !== deletedUser._id))
    }




    return (
        <>
            <Box onClick={onClose} sx={{ position: 'fixed', inset: '0', transition: 'colors', zIndex: '100', visibility: isOpenSidebar ? 'visible' : 'hidden' }}>
                {/*Sidebar */}
                <Box onClick={(e) => e.stopPropagation()} sx={{ width: { xs: '95%', sm: '300px' }, display: 'flex', flexDirection: 'column', height: '100vh', background: 'white', color: 'black', position: 'absolute', overflowX: 'hidden', overflowY: 'auto', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px', transition: 'all 4s linear', transitionDuration: '0.5s', left: isOpenSidebar ? '0' : '-300px' }}>
                    <button onClick={onClose} style={{ width: 'fixed', alignSelf: 'end', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px' }}><RxCross2 size={30} /></button>

                    <Typography textAlign='center' fontSize='25px'>Create Group Chat</Typography>
                    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input onChange={(e) => setGroupChatName(e.target.value)} type="text" placeholder='Group Chat Name' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '10px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)' }} />

                            <input onClick={() => setIsOpen(true)} onChange={(e) => handleSearch(e.target.value)} type="text" placeholder='Add Users eg: John Doe, Jane Doe' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '10px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)' }} />
                        </form>
                        {/* selected users */}
                        {selectedUsers.map((user) => (
                            <UserBadge key={user._id} user={user} handleFunction={() => handleDelete(user)} />
                        ))}
                        {/* render searched user */}
                        {isOpen &&
                            <Box onClick={(e) => e.stopPropagation()} sx={{ position: 'fixed', width: '26%', top: '200px', zIndex: '100', background: 'white', display: 'flex', flexDirection: 'column', borderRadius: '10px', transition: 'all', marginBottom: '4px', maxHeight: '75vh', overflowY: 'auto', overflowX: 'hidden' }}>
                                {/* <p onClick={() => setIsOpen(false)}>hiii</p> */}

                                {loading ? (
                                    <ChatLoading />
                                ) : (
                                    searchResult?.slice(0, 4).map((user) => (
                                        < SearchUserList
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleGroup(user)}
                                        />
                                    ))
                                )}
                                {/* {loadingChat && <Loader />} */}
                            </Box>
                        }


                        <Button onClick={handleSubmit} variant='contained' color='success' sx={{ marginLeft: 'auto' }}>Create Chat</Button>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default GroupChatSidebar