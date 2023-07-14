import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() =>{
    getCurrentUserDetails()

    if(getCurrentUserDetails()){
      navigate('/chats')
    }
  })


  return (
    <div>HomePage</div>
  )
}

export default HomePage