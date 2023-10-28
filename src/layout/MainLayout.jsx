import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/header/Header'

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ maxHeight: '100vh', maxWidth: '100%', height: '100vh' }}>
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', margin:'10px' }}>
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout


// padding:{xs:'70px 4px', lg:'80px 250px'},

// ,padding:{xs:'0px 4px', lg:'0px 0px'}