import React from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin, RotatingLines } from 'react-loader-spinner'
import { Box } from '@mui/material'


const Loader = () => {

    return (
        // <Box display="flex" justifyContent="center" alignItems="center" minHeight="85vh" minWidth="100%" position="relative">
        <Box display="flex" justifyContent="center" alignItems="center" height='100%' width='100%'>
            <TailSpin
                height="50"
                width="50"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />


            {/* <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            /> */}
        </Box>
        // </Box>
    )
}

export default Loader