import React from 'react'
import { Avatar, Box, Button, Modal, Paper, Typography } from '@mui/material'
import { GrFormClose } from 'react-icons/gr'

const ProfileModal = ({ user, setProfilePopupModal }) => {
    return (
        <>
            <Box>
                <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', backgroundColor: 'black', opacity: '0.5', display: 'flex', justifyContent: 'center' }}></Box>

                <Box sx={{ position: 'fixed', width: { xs: '87vw', md: '70vw' }, maxHeight: '70vh', top: '30%', left: { xs: '5%', lg: '15%' }, zIndex: '1000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper sx={{ padding: '20px', width: '35%' }} elevation={20}>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Typography onClick={() => setProfilePopupModal(false)} sx={{ cursor: 'pointer' }}><GrFormClose size={40} /></Typography>
                            {/* <Button onClick={() => navigate(-1)}><GrFormClose size={40} /></Button> */}
                        </Box>

                        <Box display='flex' flexDirection='column' alignItems='center'>
                            <Avatar src={user.pic} alt="Remy Sharp" sx={{ width:'120px', height:'120px' }} />
                            <Typography sx={{ fontSize: '30px' }}>{user.name}</Typography>
                            <Typography sx={{ fontSize: '20px' }}>Email Id: {user.email}</Typography>
                        </Box>
                    </Paper>

                </Box>
            </Box>
        </>
    )
}

export default ProfileModal