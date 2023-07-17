import { Box } from '@mui/material'
import React from 'react'
import SearchBar from '../SearchBar'

const MainChats = () => {
  return (
    <>
      <Box display='flex' flexDirection='column' gap='20px'>
        {/* <input type='text' placeholder='Search by name and email' style={{ padding:'10px 10px' }} /> */}

        {/* // Search component */}
        <Box component='div' paddingTop='2vh' display='flex' flexDirection='column'>
          {/* <SearchBar /> */}
          <Box component='div'>Search Resuts</Box>
        </Box>





        MainChats
      </Box>
    </>
  )
}

export default MainChats