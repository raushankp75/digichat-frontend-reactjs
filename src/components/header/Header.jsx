import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Avatar, Badge, Menu, MenuItem, TextField } from '@mui/material';
import { IoIosNotifications } from 'react-icons/io'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../ProfileModal';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {

    const [profileOpen, setProfileOpen] = React.useState(null)
    const [notificationOpen, setNotificationOpen] = React.useState(null)

    // for profile modal
    const [profilePopupModal, setProfilePopupModal] = React.useState(false)


    // for open profile
    const handleProfileOpen = (e) => setProfileOpen(e.currentTarget);
    const handleProfileClose = () => setProfileOpen(false)

    // for open profile
    const handleNotificationOpen = (e) => setNotificationOpen(e.currentTarget);
    const handleNotificationClose = () => setNotificationOpen(false)

    // for profile modal popupclose
    const handleProfilePopupModalOpen = () => setProfilePopupModal(true);
    // const handleProfilePopupModalClose = () => setProfilePopupModal(false);


    // user details
    const { user } = ChatState()



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={0} position="static" sx={{
                background: '#808080',
                padding: {
                    xs: '0px 5px', // 0 above
                    sm: '0px 5px', // 600 above
                    md: '0px 5px', // 900 above
                    lg: '0px 100px', // 1200 above
                    xl: '0px 100px' // 1536 above
                }
            }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        size="large"
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

                    <Box>
                        <TextField placeholder='Search...' />
                    </Box>

                    {/* dropdown */}
                    <Box>
                        {/* notification */}
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleNotificationOpen}
                        >
                            <Badge badgeContent={12} color="error">
                                <IoIosNotifications />
                            </Badge>
                        </IconButton>
                        <Menu open={Boolean(notificationOpen)} onClose={handleNotificationClose} anchorEl={notificationOpen}>
                            <MenuItem onClick={handleNotificationClose}>First</MenuItem>
                        </Menu>

                        {/* profile and logout menu */}
                        <Button color="inherit" onClick={handleProfileOpen}><Avatar src={user.pic} alt="Remy Sharp" /></Button>
                        <Menu open={Boolean(profileOpen)} onClose={handleProfileClose} anchorEl={profileOpen}>
                            <MenuItem onClick={() => {
                                handleProfilePopupModalOpen()
                                handleProfileClose()
                            }}>Profile
                            </MenuItem>
                            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
                        </Menu>

                        {/* profile modal */}
                        {profilePopupModal && <ProfileModal user={user} setProfilePopupModal={setProfilePopupModal} />}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
