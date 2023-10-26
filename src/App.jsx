import { Route, Routes } from 'react-router-dom'
import './App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layout/MainLayout'
import AuthenticationContainer from './pages/authentication/AuthenticationContainer'
import Chats from './pages/Chats'
import PrivateRoute from './components/routes/PrivateRoute';
import PageNotFound from './components/PageNotFound';

function App() {

  return (
    <>
      <MainLayout>
        <ToastContainer position='top-center' />
        <Routes>
          <Route path='/' element={<AuthenticationContainer />} />
          <Route path='*' element={<PageNotFound />} />

          <Route path='/user' element={<PrivateRoute />}>
            <Route path='chats' element={<Chats />} />
          </Route>
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
