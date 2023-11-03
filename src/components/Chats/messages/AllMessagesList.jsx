import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isLoggedInUser, isSameSender, isSameSenderMargin } from '../../../config/chatLogics'
import { ChatState } from '../../../context/ChatProvider'

const AllMessagesList = ({ messages }) => {

    const { user } = ChatState()
    // console.log(user.user._id)

    // console.log(messages, 12)


    return (
        <ScrollableFeed>
            {/* <Typography sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'50%', fontSize:'18px', paddingX:'5px'}}>Write Something To Start Chatting</Typography> */}
            {messages && messages.map((message, index) => (
                <Box key={message._id} sx={{ display: 'flex', alignItems: 'center' }}>
                    {
                        // (isSameSender(messages, message, index, user.user._id)) || isLastMessage(messages, index, user.user._id) && (
                        message.chat.isGroupChat && message.sender._id !== user.user._id &&
                        <>
                            <Avatar src={message.sender.pic} alt={message.sender.name} sx={{ marginRight: '8px', cursor: 'pointer', width: '30px', height: '30px' }} />
                            {/* <Typography>{message.sender.name}</Typography> */}
                        </>

                        // )
                    }

                    <Typography sx={{
                        background: message.sender._id === user.user._id ? '#D9FDD3' : '#FFFFFF',
                        marginLeft: isSameSenderMargin(messages, message, index, user.user._id),
                        marginTop: isLoggedInUser(messages, message, index, user.user._id) ? '3px' : "10px",
                        borderRadius: '10px',
                        padding: { xs: '4px 10px', sm: '6px 12px' },
                        maxWidth: '75%',
                        color: '#555',
                        fontSize: { xs: '14px', sm: '16px' }
                    }}
                    > {message.content}
                    </Typography>

                    {/* <h5 style={{backgroundColor: `${message.sender._id === user.user._id ? '#BEE3F8' : '#B9F5D0'}`}}>

                    </h5> */}
                </Box>
            ))}
        </ScrollableFeed>
    )
}

export default AllMessagesList