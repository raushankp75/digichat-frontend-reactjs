import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Badge, Menu, MenuItem, TextField } from '@mui/material';
import { IoIosNotifications } from 'react-icons/io'
// import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {

    const [profileOpen, setProfileOpen] = React.useState(null)
    const [notificationOpen, setNotificationOpen] = React.useState(null)


    // for open profile
    const handleProfileOpen = (e) => setProfileOpen(e.currentTarget);
    const handleProfileClose = () => setProfileOpen(false)

    // for open profile
    const handleNotificationOpen = (e) => setNotificationOpen(e.currentTarget);
    const handleNotificationClose = () => setNotificationOpen(false)


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={0} position="static" sx={{
                background: '#D3D2C7',
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
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleNotificationOpen}
                        >
                            <Badge badgeContent={17} color="error">
                                <IoIosNotifications />
                            </Badge>
                        </IconButton>
                        <Menu open={Boolean(notificationOpen)} onClose={handleNotificationClose} anchorEl={notificationOpen}>
                            <MenuItem onClick={handleNotificationClose}>First</MenuItem>
                        </Menu>


                        <Button color="inherit" onClick={handleProfileOpen}>Raushan</Button>
                        <Menu open={Boolean(profileOpen)} onClose={handleProfileClose} anchorEl={profileOpen}>
                            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
