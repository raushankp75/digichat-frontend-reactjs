import { Route, Routes } from 'react-router-dom'
import './App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layout/MainLayout'
import AuthenticationContainer from './pages/authentication/AuthenticationContainer'
import Home from './pages/Home'
import Chats from './pages/Chats'

function App() {

  return (
    <>
      <MainLayout>
        <ToastContainer position='top-center' />
        <Routes>
          <Route path='/' element={<AuthenticationContainer />} />
          <Route path='/home' element={<Home />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
