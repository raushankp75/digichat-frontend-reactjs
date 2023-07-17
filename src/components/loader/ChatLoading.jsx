import { Skeleton, Typography } from '@mui/material'
import React from 'react'

const ChatLoading = () => {
  return (
    <Typography variant="h1">{loading ? <Skeleton /> : 'h1'}</Typography>

  )
}

export default ChatLoading