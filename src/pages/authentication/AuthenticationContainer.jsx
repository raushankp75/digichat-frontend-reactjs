import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './Login';
import Signup from './Signup';

import { useNavigate } from 'react-router-dom';
import { getCurrentUserDetails } from '../../auth';


const authContainer = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    useEffect(() => {
        getCurrentUserDetails()

        if (getCurrentUserDetails()) {
            navigate('/chats')
        }
    }, [navigate])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const paperStyle = { width: 400, margin: "0px auto" }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }



    return (
        <Box style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={4} sx={{ width: { xs: '90%', md: '25%' }, padding: { xs: '5% 5%', md: '3% 3%' }, margin: { xs: '15% 0', md: '5% 0' }, display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Login" sx={{ fontWeight: '600' }} />

                        <Tab label="Signup" sx={{ fontWeight: '600' }} />
                    </Tabs>

                    {/* <Typography sx={{ fontSize:'28px', fontFamily: "'Pacifico', cursive", color:'blue' }}>DigiChat</Typography> */}
                </Box>

                <TabPanel value={value} index={0}>
                    <Login handleChange={handleChange} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Signup />
                </TabPanel>
            </Paper>
        </Box>



    )
}

export default authContainer
