import React from 'react'
import { Box, Typography } from '@mui/material'
import { RxCross2 } from 'react-icons/rx'


const UserBadge = ({ user, handleFunction }) => {
    return (
        <Box sx={{ fontSize: '14px', background: '#2da7e4', color: 'white', paddingX: '8px', paddingY: '5px', display: 'flex' }}>
            <Typography sx={{display:'flex', alignItems:'center', gap:'5px'}}>
                {user.name} <RxCross2 size={22} onClick={handleFunction} />
            </Typography>
        </Box>
    )
}

export default UserBadge