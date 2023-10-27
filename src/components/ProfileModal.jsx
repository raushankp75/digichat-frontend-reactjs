import React from 'react'
import { Avatar, Box, Button, Modal, Paper, Typography } from '@mui/material'
import { GrFormClose } from 'react-icons/gr'

import { RxCross2 } from 'react-icons/rx'


const ProfileModal = ({ profilePopupModal, onClose, children }) => {
    return (
        <>
            <Box onClick={onClose} sx={{ position: 'fixed', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'colors', zIndex: '100', visibility: profilePopupModal ? 'visible' : 'hidden' }}>
                {/* modal */}
                <Box onClick={(e) => e.stopPropagation()} sx={{ background: 'white', display:'flex', flexDirection:'column', borderRadius: '10px', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px', transition: 'all' }}>
                    <button onClick={onClose} style={{width:'fixed', alignSelf:'end', background:'transparent', outline:'none', border:'none', cursor:'pointer'}}><RxCross2 size={30} /></button>
                    {children}
                </Box>
            </Box>

        </>
    )
}

export default ProfileModal