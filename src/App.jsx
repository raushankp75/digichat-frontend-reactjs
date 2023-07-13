import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import AuthenticationContainer from './pages/auth/AuthenticationContainer'

function App() {

  return (
    <>
      <MainLayout>
          <Routes>
          <Route path='/' element={<AuthenticationContainer />} />
          </Routes>
      </MainLayout>
    </>
  )
}

export default App
