import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../config/chatLogics'
import { ChatState } from '../../../context/ChatProvider'

const AllMessagesList = ({ messages }) => {

    const { user } = ChatState()
    // console.log(user.user._id)


    return (
        <ScrollableFeed>
            {messages && messages.map((message, index) => (
                <Box key={message._id} sx={{ display: 'flex' }}>
                    {
                        (isSameSender(messages, message, index, user.user._id)) || isLastMessage(messages, index, user.user._id) && (
                            <Avatar src={message.sender?.pic} alt={message.sender.name} sx={{ marginTop: '5px', marginRight: '8px', cursor: 'pointer' }} />
                        )
                    }

                    <Typography sx={{
                        background: message.sender._id === user.user._id ? '#ECFFDC' : '#2AAA8A',
                        marginLeft: isSameSenderMargin(messages, message, index, user.user._id),
                        marginTop: isSameUser(messages, message, index, user.user._id) ? '4px' : "10px",
                        borderRadius: '20px',
                        padding: '4px 10px',
                        maxWidth: '75%',
                        color: '#222',
                        // fontWeight:'600',
                        letterSpacing:'0.5px',
                        fontSize:{xs:'14px', sm:'16px'}
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