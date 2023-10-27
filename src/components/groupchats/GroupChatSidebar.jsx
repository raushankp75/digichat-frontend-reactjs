import { Box, Button } from '@mui/material'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'


const GroupChatSidebar = ({ isOpenSidebar, onClose, children }) => {
    return (
        <>
            <Box onClick={onClose} sx={{ position: 'fixed', inset: '0', transition: 'colors', zIndex: '100', visibility: isOpenSidebar ? 'visible' : 'hidden'}}>
                {/*Sidebar */}
                <Box onClick={(e) => e.stopPropagation()} sx={{width:{xs: '95%', sm:'300px'},display:'flex', flexDirection:'column' ,height:'100vh', background: 'white', color:'black', position:'absolute', overflowX:'hidden', overflowY: 'auto', boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.2)', padding: '10px',transition: 'all 4s linear', transitionDuration: '0.5s' ,left: isOpenSidebar ? '0' : '-300px'}}>
                    <button onClick={onClose} style={{ width: 'fixed', alignSelf: 'end', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}><RxCross2 size={30} /></button>
                    {children}
                </Box>
            </Box>
        </>
    )
}

// bg-white px-2 md:w-[480px] w-[95%] h-[92vh] absolute right-0 overflow-x-hidden overflow-y-auto transition-all duration-500 ease-in ${isOpenSidebar ? 'right-0 top-[59px]' : 'right-[-420px] top-[59px]'}`}

export default GroupChatSidebar