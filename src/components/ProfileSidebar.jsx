import React from 'react'
import { Avatar, Box, Button, Modal, Paper, Typography } from '@mui/material'
import { GrFormClose } from 'react-icons/gr'

import { RxCross2 } from 'react-icons/rx'


const ProfileSidebar = ({ profileSidebar, onClose, children }) => {
    return (
        <>
            <Box onClick={onClose} sx={{ position: 'fixed', inset: '0', transition: 'colors', zIndex: '100', visibility: profileSidebar ? 'visible' : 'hidden' }}>
                {/*Sidebar */}
                <Box onClick={(e) => e.stopPropagation()} sx={{ width: { xs: '95%', sm: '350px' }, display: 'flex', flexDirection: 'column', height: '100vh', background: 'white', color: 'black', position: 'absolute', overflowX: 'hidden', overflowY: 'auto', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px', transition: 'all 4s linear', transitionDuration: '0.4s', right: profileSidebar ? '0' : '-449px' }}>
                    <button onClick={onClose} style={{ width: 'fixed', alignSelf: 'end', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px' }}><RxCross2 size={30} /></button>

                    {children}
                </Box>
            </Box>
        </>
    )
}

export default ProfileSidebar