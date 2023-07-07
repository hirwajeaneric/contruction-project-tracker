import { useEffect, } from 'react';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from 'react-cookie';
import Auth from './pages/auth/Auth';
import DashboardMain from './pages/DashboardMain';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Project from './pages/Project';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

const App = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  // const authToken = cookies.AuthToken
  const authToken = 'Hello World';

  // useEffect(() => {
  //   if (authToken) {
      // dispatch information
  //   }
  // }, [authToken])

  // Sort by date
  // const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path='/auth/' element={<Auth />}>
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>

          <Route path='/' element={authToken ? <DashboardMain /> : <Navigate replace to={'/auth/signin'} />}>
            <Route path='' element={<Home />} />
            <Route path='' element={<Materials />} />
            <Route path='' element={<Project />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
