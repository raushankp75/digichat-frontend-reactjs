import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Box, Button, CardMedia, TextField, Typography } from '@mui/material'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'
import Loader from '../../components/';

import { signup } from '../../services/userService';

const Signup = () => {

    // const profileUpload = 'https://static.thenounproject.com/png/5657068-200.png'

    // hide and show password
    const [show, setShow] = useState(false)

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState('https://static.thenounproject.com/png/5657068-200.png');
    const [loading, setLoading] = useState(false)


    // upload pic to cloudinary
    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast.warn('Please select an image');
            return;
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'chat-app')
            data.append('cloud_name', 'raushancloud')

            fetch('https://api.cloudinary.com/v1_1/raushancloud/image/upload',
                {
                    method: 'post',
                    body: data
                }
            ).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            toast.warn('Please select an image');
            return;
        }
    }


    // get input field data
    // useEffect(() => {
    //     console.log(signupData);
    // }, [signupData])

    // get input field data
    const handleValueChange = (event, property) => {
        // console.log('get')
        // console.log(event.target.value)

        setSignupData({ ...signupData, [property]: event.target.value })
    }



     // reset the data
     const resetData = () => {
        setSignupData({
            name: '',
            email: '',
            password: '',
        })
    }



    // submit all data to api
    const submitHandler = (e) => {
        console.log(signupData, pic);
        e.preventDefault();

        // validation
        setLoading(true);
        if (!signupData.name || !signupData.email || !signupData.password || !confirmPassword) {
            toast.warn('Please fill all the fields');
            setLoading(false);
            return;
        }

        if (signupData.password !== confirmPassword) {
            toast.warn('Passwords do not match');
            setLoading(false);
            return;
        }

        // call server api for sending data here
        signup(signupData, pic).then((res) => {
            console.log("Signup Success", res)
            setLoading(false);
            toast.success('User Registered successfully')
            resetData();
        }).catch((error) => {
            if (error.response.data.message) {
                console.log("Signup Error", error.response.data.message)
                setLoading(false);
                toast.error(error.response.data.message)
            }

            // console.log(error)

        })
    }






    // hide and show password
    const handleShowHide = () => {
        setShow(!show)
    }


    return (
        <Box>
            {/* <Typography sx={{ fontSize: '18px', color:'gray', textAlign:'center' }}>Sign up to chat with your friends</Typography> */}
            {/* {JSON.stringify(signupData)} */}
            <form>
                {loading ?
                    (<Loader />)
                    :
                    (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <Button
                            // variant="contained"
                            component="label"
                            sx={{ width: 'fill' }}
                        >
                            {/* Click here to select a profile pic */}
                            <CardMedia
                                component='img'
                                image={pic}
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
                                onChange={(event) => {
                                    // loadfile(event);
                                    postDetails(event.target.files[0])
                                }}
                            />
                        </Button>

                        <Typography>Please select a profile pic</Typography>


                    </Box>)}

                <TextField variant='standard' type='name' name='name' value={signupData.name} onChange={(e) => handleValueChange(e, 'name')} label='name' placeholder='Enter name' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                <TextField variant='standard' type='email' name='email' value={signupData.email} onChange={(e) => handleValueChange(e, 'email')} label='Email' placeholder='Enter email' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                <Box sx={{ position: 'relative' }}>
                    <TextField variant='standard' type={show ? 'text' : 'password'} name='password' value={signupData.password} onChange={(e) => handleValueChange(e, 'password')} label='Password' placeholder='Enter password' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                    <Button onClick={handleShowHide} sx={{ position: 'absolute', top: '15px', right: '0' }}>
                        {show ? <BiSolidHide size={25} /> : <BiSolidShow size={25} />}
                    </Button>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <TextField variant='standard' type={show ? 'text' : 'password'} name='conformPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label='conformPassword' placeholder='Enter conform password' fullWidth required sx={{ margin: '4px 0', borderBottom: '1px solid gray' }} />
                    <Button onClick={handleShowHide} sx={{ position: 'absolute', top: '15px', right: '0' }}>
                        {show ? <BiSolidHide size={25} /> : <BiSolidShow size={25} />}
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: '80px' }}>
                    <Button type='submit' onClick={submitHandler} color='primary' variant="contained" sx={{ margin: '10px 0', fontWeight: 600 }} fullWidth>Signup</Button>
                    <Button onClick={resetData} color='error' variant="contained" sx={{ margin: '10px 0', fontWeight: 600 }} fullWidth>Reset</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Signup