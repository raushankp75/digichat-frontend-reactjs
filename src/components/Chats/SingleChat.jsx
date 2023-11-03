import { Avatar, Box, Button, CardMedia, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { BsArrowLeftShort } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { getSenderEmail, getSenderName, getSenderPic } from '../../config/chatLogics'
import ProfileSidebar from '../ProfileSidebar'

import { CgProfile } from 'react-icons/cg'
import UpdateGroupChatSidebar from '../groupchats/UpdateGroupChatSidebar'
import Loader from '../Loader/Loader'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import AllMessagesList from './messages/AllMessagesList'

import Lottie from 'lottie-react'
import TypingAnimation from '../typingAnimation.json'

import ChatWallpaper from '../../assets/chatWallpaper.png'
import { baseUrl } from '../../auth/baseUrl'


import { io } from 'socket.io-client'


// for socket.io
const ENDPOINT = baseUrl;
var socket, selectedChatCompare;




const SingleChat = ({ fetchChatsAgain, setFetchChatsAgain }) => {

    // for message conversation
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    // for socket.io
    const [socketConnected, setSocketConnected] = useState(false)

    // for typing indicator
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    // for profile sidebar
    let [profileSidebar, setProfileSidebar] = useState(false)

    // for update group sidebar
    let [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState()

    // console.log(selectedChat._id, 32)


    const typingChangeHandle = (e) => {
        setNewMessage(e.target.value)

        // typing indicator
        if (!socketConnected) {
            return
        }

        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id)
        }

        // here write debouncing function to decide when we stop typing 
        let lastTypingTime = new Date().getTime()
        var timerLength = 3000
        console.log('here')
        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDifference = timeNow - lastTypingTime

            if (timeDifference >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id)
                setTyping(false)
            }
        }, timerLength)

    }


    const fetchAllMessages = async () => {
        if (!selectedChat) {
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`${baseUrl}/api/message/${selectedChat._id}`, config)

            setMessages(data)
            setLoading(false)

            // for socket.io
            socket.emit('join chat', selectedChat._id)
        } catch (error) {
            console.log(error)
            toast.error('Error While Fetching Messages')
            setLoading(false)
        }
    }

    // for socket.io
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', user.user)
        socket.on('connected', () => {
            setSocketConnected(true)
        })
        socket.on('typing', () => {
            setIsTyping(true)
        })
        socket.on('stop typing', () => {
            setIsTyping(false)
        })
    }, [])


    useEffect(() => {
        fetchAllMessages()

        // for socket.io
        selectedChatCompare = selectedChat;
    }, [selectedChat])


    // for socket.io
    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // notification
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification])
                    setFetchChatsAgain(!fetchChatsAgain)
                }
            } else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

    console.log(notification, 151)




    const SendMessage = async (e) => {
        e.preventDefault()
        // if (e.key === "Enter" && newMessage) {

        // for socket.io
        socket.emit('stop typing', selectedChat._id)
        try {
            setNewMessage("")
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post(`${baseUrl}/api/message`, {
                content: newMessage,
                chatId: selectedChat._id
            }, config)

            // for socket.io
            socket.emit('new message', data)
            setMessages([...messages, data])
            console.log(messages)
            // toast.success('Send Message')
        } catch (error) {
            console.log(error)
            toast.error('Error While Sending Message')
        }
        // }
    }





    return (
        <>
            {selectedChat ? (
                <>
                    <Box sx={{
                        fontSize: { xs: '22px', sm: '30px' }, background: { xs: '#00A783', sm: '#F0F2F5' },
                        color: { xs: 'white', sm: '#222' }, paddingX: '5px', paddingY: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D9E4EC', paddingLeft: { xs: '0', sm: '15px' }
                    }}>
                        {!selectedChat.isGroupChat ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => setSelectedChat('')}><BsArrowLeftShort size={30} /></Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <Avatar src={getSenderPic(user, selectedChat.users)} alt="Remy Sharp" />
                                        <Typography sx={{ fontSize: { xs: '18px', sm: '20px' }, textTransform: 'capitalize' }}>{getSenderName(user, selectedChat.users)}</Typography>
                                    </Box>
                                </Box>


                                {/* Profile Modal */}
                                <Button onClick={() => setProfileSidebar(true)}><CgProfile size={30} /></Button>

                                <ProfileSidebar profileSidebar={profileSidebar} onClose={() => setProfileSidebar(false)}>
                                    <Box sx={{ textAlign: 'center', width: '256px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                        <CardMedia
                                            component='img'
                                            image={getSenderPic(user, selectedChat.users)}
                                            alt={getSenderName(user, selectedChat.users)}
                                            sx={{ height: '70px', width: '80px', objectFit: 'fill', border: '1px solid white', outline: 'none' }}
                                        />
                                        <p>{getSenderName(user, selectedChat.users)}</p>
                                        <p>{getSenderEmail(user, selectedChat.users)}</p>
                                    </Box>
                                </ProfileSidebar>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => setSelectedChat('')}><BsArrowLeftShort size={30} /></Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <Avatar src="" alt="Remy Sharp" />
                                        <Typography sx={{ fontSize: { xs: '18px', sm: '20px' }, textTransform: 'capitalize' }}>{selectedChat.chatName}</Typography>
                                    </Box>
                                </Box>


                                {/* Update Group Chat Sidebar */}
                                <Button onClick={() => setIsOpenSidebar(true)}><CgProfile size={30} /></Button>

                                <UpdateGroupChatSidebar isOpenSidebar={isOpenSidebar} onClose={() => setIsOpenSidebar(false)} fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain} fetchAllMessages={fetchAllMessages} />
                            </>

                        )}
                    </Box>

                    {/* chat screen */}
                    {/* background:'#E8E8E8' */}
                    <Box style={{ backgroundImage: `url(${ChatWallpaper})` }} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingX: {xs:'10px', sm: '60px'}, overflowY: 'hidden', height: '100%', marginBottom:'10px' }}>
                        {/* // Messages List */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'none' }}>
                                    <AllMessagesList messages={messages} />
                                </Box>
                            </>
                        )}

                        {isTyping ? (
                            <Box>
                                <Lottie
                                    loop={true}
                                    autoPlay={true}
                                    animationData={TypingAnimation}
                                    rendererSettings={SVGAnimatedPreserveAspectRatio}
                                    style={{ width: '80px' }} />
                            </Box>
                        ) : (<></>)}
                    </Box>

                    {/* chat box */}
                    <form onSubmit={SendMessage} style={{ display: 'flex', gap: '10px', background: '#F0F2F5', padding: '15px 25px' }}>
                        <input type="text" value={newMessage} onChange={typingChangeHandle} required placeholder='Write something here... ' style={{ backgroundColor: 'white', borderRadius: '10px', border: 'none', outline: 'none', fontSize: '1rem', padding: '15px 15px', boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)', width: '100%' }} />

                        <Button type='submit' variant='outlined' sx={{ marginLeft: 'auto', borderRadius: '50%', height: '50px', width: '50px' }}><IoSend size={25} /></Button>
                    </form>
                </>
            ) : (
                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: { xs: '16px', sm: '28px', background: '#F0F2F5' } }}>Clik on a user to start chatting</Typography>
            )}
        </>
    )
}

export default SingleChat