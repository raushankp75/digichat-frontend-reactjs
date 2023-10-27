import React from 'react'
import { Box, Typography } from '@mui/material'

const MainLayout = ({ children }) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection:'column',padding:{xs:'0px 4px', lg:'0px 0px'}, overflow: 'hidden', maxHeight: '100vh', maxWidth:'100%', height:'100vh' }}>
                {children}
            </Box>
        </>
    )
}

export default MainLayout


// padding:{xs:'70px 4px', lg:'80px 250px'},
