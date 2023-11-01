import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const UserList = ({ user, handleFunction }) => {

    console.log("user list", user)

    return (
        <Grid item lg={12} sm={12} xs={12} sx={{ cursor: 'pointer' }}>
            <Paper onClick={handleFunction} sx={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px', background:'#F0F2F5', marginBottom:'5px' }} elevation={1}>

                <Avatar src={user.pic} alt="Remy Sharp" />

                <Box>
                    <Typography sx={{ fontSize: '15px' }}>{user.name}</Typography>
                    <Typography sx={{ fontSize: '15px' }}>{user.email}</Typography>
                </Box>
            </Paper>
        </Grid>
    )
}

export default UserList