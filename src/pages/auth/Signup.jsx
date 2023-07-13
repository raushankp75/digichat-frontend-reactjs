import React from 'react'
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material'

const Signup = () => {

    const profileUpload = 'https://static.thenounproject.com/png/5657068-200.png'
    return (
        <Box>
            {/* <Typography sx={{ fontSize: '18px', color:'gray', textAlign:'center' }}>Sign up to chat with your friends</Typography> */}

            <form>
            <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <Button
                        // variant="contained"
                        component="label"
                        sx={{ width: 'fill' }}
                    >
                        {/* Click here to select a profile pic */}
                        <CardMedia
                            component='img'
                            image={profileUpload}
                            alt=''
                            sx={{ height: '70px', width: '80px', objectFit: 'fill', border: '1px solid white', outline: 'none' }}
                            id='output'
                        />
                        <input
                            id='pic'
                            name='pic'
                            type="file"
                            hidden
                            accept='image/*'
                            // onChange={(event) => {
                            //     loadfile(event);
                            //     postDetails(event.target.files[0])
                            // }}
                        />
                    </Button>

                    <Typography>Please select a profile pic</Typography>


                </Box>

                <TextField variant='standard' type='name' name='name' label='name' placeholder='Enter name' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                <TextField variant='standard' type='email' name='email' label='Email' placeholder='Enter email' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                <TextField variant='standard' type='password' name='password' label='Password' placeholder='Enter password' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                <TextField variant='standard' type='password' name='conformPassword' label='conformPassword' placeholder='Enter conform password' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />

                <Button type='submit' color='primary' variant="contained" sx={{ margin: '10px 0', fontWeight:600 }} fullWidth>Signup</Button>
            </form>
        </Box>
    )
}

export default Signup