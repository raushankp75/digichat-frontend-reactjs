import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'


const Login = () => {

  const [show, setShow] = useState(false)

  // hide and show password
  const handleShowHide = () => {
    setShow(!show)
  }

  return (

    <Box>
      {/* <Typography sx={{ fontSize: '18px', color:'gray', textAlign:'center' }}>Log in to your account</Typography> */}

      <form>
        <TextField variant='standard' type='email' name='email' label='Email' placeholder='Enter email' fullWidth required sx={{ margin: '10px 0', borderBottom: '1px solid gray' }} />
        <Box sx={{ position: 'relative' }}>
          <TextField variant='standard' type={show ? 'text' : 'password'} name='password' label='Password' placeholder='Enter password' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
          <Button onClick={handleShowHide} sx={{ position: 'absolute', top: '15px', right: '0' }}>
            {show ? <BiSolidHide size={25} /> : <BiSolidShow size={25} />}
          </Button>
        </Box>

        <Button type='submit' color='primary' variant="contained" sx={{ margin: '10px 0', fontWeight: 600 }} fullWidth>Login</Button>

        {/* <Typography sx={{ textAlign: 'center', fontSize: '13px', margin: '5px 0' }}>OR</Typography> */}

        {/* <Typography sx={{ fontSize: '13px', margin: '12px 0' }}> Don't have an account?
          <Link to="/signup" > Sign Up </Link>
        </Typography> */}
      </form>
    </Box>
  )
}

export default Login