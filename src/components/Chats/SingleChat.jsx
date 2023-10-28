import { Avatar, Box, Button, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { BsArrowLeftShort } from 'react-icons/bs'
import { getSenderEmail, getSenderName, getSenderPic } from '../../config/chatLogics'
import ProfileModal from '../ProfileModal'

import { CgProfile } from 'react-icons/cg'


const SingleChat = ({ fetchChatsAgain, setFetchChatsAgain }) => {

    // for profile modal
    let [profilePopupModal, setProfilePopupModal] = useState(false)
    
    const { user, selectedChat, setSelectedChat } = ChatState()


    return (
        <>
            {selectedChat ? (
                <>
                    <Box sx={{ fontSize: { xs: '22px', sm: '30px' }, paddingX: '5px', paddingY: '8px', width: '100%', display: 'flex', justifyContent: { xs: 'space-between' }, alignItems: 'center', borderBottom: '2px solid #555' }}>
                        <Typography sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => setSelectedChat('')}><BsArrowLeftShort color='white' size={30} /></Typography>

                        {!selectedChat.isGroupChat ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <Avatar src={getSenderPic(user, selectedChat.users)} alt="Remy Sharp" />
                                    <Typography>{getSenderName(user, selectedChat.users)}</Typography>
                                </Box>

                                {/* <ProfileModal user={getSenderAllDetails(user, selectedChat.users)} /> */}
                                <Button onClick={() => setProfilePopupModal(true)}><CgProfile size={30} /></Button>

                                <ProfileModal profilePopupModal={profilePopupModal} onClose={() => setProfilePopupModal(false)}>
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
                                </ProfileModal>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Avatar src="" alt="Remy Sharp" />
                                <Typography>{selectedChat.chatName.toUpperCase()}</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            ) : (
                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: { xs: '16px', sm: '28px' } }}>Clik on a user to start chatting</Typography>
            )}
        </>
    )
}

export default SingleChat