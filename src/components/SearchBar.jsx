import { Box, Button } from '@mui/material'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

const SearchBar = () => {
    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: '10px', height: '2.5rem', padding: '0 15px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 8px #ddd' }}>
            <input type="text" placeholder='Search by name and email' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', height: '100%', fontSize: '1rem', width: '100%', marginLeft: '5px' }} />

            <Button>
                <CiSearch size={23} color='blue' />
            </Button>

        </Box>
    )
}

export default SearchBar