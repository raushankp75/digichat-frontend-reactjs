import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Avatar, Badge, CardMedia, Menu, MenuItem, Skeleton, TextField } from '@mui/material';
import { IoIosNotifications } from 'react-icons/io'
import { ChatState } from '../../context/ChatProvider';
import { doLogout } from '../../auth';
import { getSenderName } from '../../config/chatLogics';
import { useState } from 'react';

import { FaAddressCard } from 'react-icons/fa'
import SearchBox from '../search/SearchBox';
import ProfileSidebar from '../ProfileSidebar';




export default function Header() {

    // for create chat sidebar
    let [isOpenSidebarChat, setIsOpenSidebarChat] = useState(false)

    const [profileOpen, setProfileOpen] = useState(null)
    const [notificationOpen, setNotificationOpen] = useState(null)

 // for profile sidebar
 let [profileSidebar, setProfileSidebar] = useState(false)


    // for open profile
    const handleProfileOpen = (e) => setProfileOpen(e.currentTarget);
    const handleProfileClose = () => setProfileOpen(false)

    // for open notification
    const handleNotificationOpen = (e) => setNotificationOpen(e.currentTarget);
    const handleNotificationClose = (noti) => {
        setSelectedChat(noti.chat)
        setNotification(notification.filter((n) => n !== noti))
        setNotificationOpen(false)
    }


    // user details
    const { user, notification, setNotification, setSelectedChat } = ChatState()
    // console.log(user, 43)







    return (
        <AppBar elevation={0} position="static" sx={{
            background: { xs: '#00A783', sm: '#F0F2F5' },
            color: { xs: 'white', sm: '#54656F' },
            height: { xs: '15%', sm: '10%' },
            borderRight: '1px solid #D9E4EC',
            borderBottom: '1px solid #D9E4EC'
            // padding: {
            //     xs: '0px 5px', // 0 above
            //     sm: '0px 5px', // 600 above
            //     md: '0px 5px', // 900 above
            //     lg: '0px 100px', // 1200 above
            //     xl: '0px 100px' // 1536 above
            // }
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    DigiChat
                </IconButton>
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography> */}




                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* create chat or group chat sidebar */}
                    <FaAddressCard size={28} onClick={() => setIsOpenSidebarChat(true)} cursor='pointer' />
                    <SearchBox isOpenSidebarChat={isOpenSidebarChat} onCloseChat={() => setIsOpenSidebarChat(false)} />


                    {/* notification */}
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={handleNotificationOpen}
                    >
                        <Badge badgeContent={notification.length} color="primary">
                            <IoIosNotifications />
                        </Badge>
                    </IconButton>
                    <Menu open={Boolean(notificationOpen)} onClose={handleNotificationClose} anchorEl={notificationOpen}>


                        {!notification.length ? (
                            <MenuItem onClick={handleNotificationClose}>
                                <Typography>No New Messages</Typography>
                            </MenuItem>
                        ) : (
                            notification.map((noti) => (
                                <MenuItem key={noti._id} onClick={() => handleNotificationClose(noti)}>
                                    {noti.chat.isGroupChat ?
                                        <Typography>New Message in <span style={{ fontWeight: '600', color: 'blue' }}>{noti.chat.chatName}</span></Typography>
                                        :
                                        <Typography>New Message from <span style={{ fontWeight: '600', color: 'blue' }}>{getSenderName(user, noti.chat.users)}</span></Typography>
                                    }
                                </MenuItem>
                            ))
                        )
                        }

                    </Menu>

                    {/* profile and logout menu */}
                    <Button color="inherit" onClick={handleProfileOpen}><Avatar src='' alt="Remy Sharp" /></Button>
                    <Menu open={Boolean(profileOpen)} onClose={handleProfileClose} anchorEl={profileOpen}>
                        <MenuItem onClick={() => {
                            setProfileSidebar(true)
                            handleProfileClose()
                        }}>Profile
                        </MenuItem>
                        <MenuItem onClick={() => {
                            doLogout();
                            // handleProfileClose();
                        }}>Logout
                        </MenuItem>
                    </Menu>

                    {/* profile modal */}
                    {/* {profilePopupModal && <ProfileModal user={user} setProfilePopupModal={setProfilePopupModal} />} */}
                    <ProfileSidebar profileSidebar={profileSidebar} onClose={() => setProfileSidebar(false)}>
                        <Box sx={{ textAlign: 'center', width: '256px', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <CardMedia
                                component='img'
                                image={user?.user?.pic}
                                alt={user?.user?.name}
                                sx={{ height: '70px', width: '80px', objectFit: 'fill', border: '1px solid white', outline: 'none' }}
                            />
                            <p>{user?.user?.name}</p>
                            <p>{user?.user?.email}</p>
                        </Box>
                    </ProfileSidebar>
                </Box>
            </Toolbar>

            {/* <Box sx={{width:{xs:'25%', sm:'30%'}, position:{xs:'relative', sm:'static'}, top:'10px'}}>
        <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, paddingLeft: '30px', marginX: '10px', borderBottom: {xs:'4px solid #FFFFFF', sm:'4px solid green'}, color:{xs:'white', sm:'green'} }}>Chats</Typography>
      </Box> */}
        </AppBar>
    );
}
