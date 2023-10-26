import React, { useState } from 'react'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Box, Button, TextField, Typography } from '@mui/material'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'
import Loader from '../../components/Loader/Loader';
import { login } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../../auth';



const Login = () => {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  // get input field data
  const handleValueChange = (event, property) => {
    setLoginData({ ...loginData, [property]: event.target.value })
  }



  // reset the data
  const resetData = () => {
    setLoginData({
      email: '',
      password: '',
    })
  }



  // submit all data to api
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(loginData);

    // validation
    setLoading(true);
    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.warn('Please fill email and password')
      setLoading(false);
      return;
    }


    // Submit data to server to generate token
    login(loginData).then((loggedInData) => {
      console.log(loggedInData.token)
      console.log(loggedInData.user)

      // save data to localstorage
      doLogin(loggedInData, () => {
        console.log('Login details is saved to localStorage')

        // navigate to home page
        navigate('/user/chats');
        setLoading(false);
        toast.success(`Welcome ${loggedInData.user.name}`)
      })

    }).catch((error) => {
      // console.log(error)
      // if (error.response.status === 400 || error.response.status === 404 || error.response.status === 401) {

      if (error.response.data) {
        // console.log("Signup Error", error.response.data.message)
        setLoading(false);
        toast.error(error.response.data.message)
      } else {
        setLoading(false);
        toast.error('Server not working')
      }
    })

  }


  // Guest Login
  const guestLogin = (e) => {
    e.preventDefault();
    setLoginData({
      email: 'guest@gmail.com',
      password: 'guest'
    })
  }



  // hide and show password
  const handleShowHide = () => {
    setShow(!show)
  }




  return (

    <Box>
      {/* <Typography sx={{ fontSize: '18px', color:'gray', textAlign:'center' }}>Log in to your account</Typography> */}

      {loading && <Loader />}

      <form>
        <TextField variant='standard' type='email' name='email' value={loginData.email} onChange={(e) => handleValueChange(e, 'email')} label='Email' placeholder='Enter email' fullWidth required sx={{ margin: '10px 0', borderBottom: '1px solid gray' }} />
        <Box sx={{ position: 'relative' }}>
          <TextField variant='standard' type={show ? 'text' : 'password'} name='password' value={loginData.password} onChange={(e) => handleValueChange(e, 'password')} label='Password' placeholder='Enter password' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
          <Button onClick={handleShowHide} sx={{ position: 'absolute', top: '15px', right: '0' }}>
            {show ? <BiSolidHide size={25} /> : <BiSolidShow size={25} />}
          </Button>
        </Box>


        <Box sx={{ display: 'flex', gap: '80px', margin: '10px 0', }}>
          <Button type='submit' onClick={submitHandler} color='primary' variant="contained" sx={{ margin: '10px 0', fontWeight: 600 }} fullWidth>Login</Button>
          <Button onClick={resetData} color='error' variant="contained" sx={{ margin: '10px 0', fontWeight: 600 }} fullWidth>Reset</Button>
        </Box>

        <Button type='submit' onClick={guestLogin} color='grey' variant="contained" sx={{ fontWeight: 600 }} fullWidth>Guest Login</Button>

        {/* <Typography sx={{ textAlign: 'center', fontSize: '13px', margin: '5px 0' }}>OR</Typography> */}

        {/* <Typography sx={{ fontSize: '13px', margin: '12px 0' }}> Don't have an account?
          <Link to="/signup" > Sign Up </Link>
        </Typography> */}
      </form>
    </Box>
  )
}

export default Login