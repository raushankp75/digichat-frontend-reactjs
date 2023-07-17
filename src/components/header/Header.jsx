import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Avatar, Badge, Menu, MenuItem, Skeleton, TextField } from '@mui/material';
import { IoIosNotifications } from 'react-icons/io'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../ProfileModal';
import { doLogout, isAuthenticated } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci'
// import MenuIcon from '@mui/icons-material/Menu';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../loader/Loader';
import ChatLoading from '../loader/ChatLoading';



export default function Header() {

    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loadingChat, setLoadingChat] = React.useState();

    const navigate = useNavigate()

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



    // Search user
    const handleSearch = async () => {
        if (!search) {
            toast.warn('Write any name or email in search box')
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${isAuthenticated().token}`
                }
            };

            const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, config)

            setLoading(false);
            setSearchResult(data);
        } catch {
            toast.warn('Write any name or email in search box')
        }
    }



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



                    {/* Search component */}
                    <Box>
                        <Box sx={{ backgroundColor: 'white', borderRadius: '10px', height: '2.5rem', padding: '0 15px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 8px #ddd' }}>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by name and email' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', height: '100%', fontSize: '1rem', width: '100%', marginLeft: '5px' }} />

                            <Button onClick={handleSearch}> <CiSearch size={23} color='blue' /></Button>
                        </Box>

                        {loading ? (
                            <Skeleton />
                        ) : (
                            <span>Result</span>
                        )}
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
                        <Button color="inherit" onClick={handleProfileOpen}><Avatar src='' alt="Remy Sharp" /></Button>
                        <Menu open={Boolean(profileOpen)} onClose={handleProfileClose} anchorEl={profileOpen}>
                            <MenuItem onClick={() => {
                                handleProfilePopupModalOpen()
                                handleProfileClose()
                            }}>Profile
                            </MenuItem>
                            <MenuItem onClick={() => {
                                doLogout(navigate('/'));
                                handleProfileClose();
                            }}>Logout
                            </MenuItem>
                        </Menu>

                        {/* profile modal */}
                        {profilePopupModal && <ProfileModal user={user} setProfilePopupModal={setProfilePopupModal} />}
                    </Box>




                </Toolbar>
            </AppBar>
        </Box>
    );
}
