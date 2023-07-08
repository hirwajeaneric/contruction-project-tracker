import { createContext, useEffect, useState } from 'react';
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
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ResponseComponent from './components/ResponseComponent';
import { useDispatch } from 'react-redux';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

export const GeneralContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});
  const [open, setOpen] = useState(false);
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const authToken = cookies.AuthToken;
  const user = cookies.UserData;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {  
    if (user !== null) {
      // dispatch(getDjPictures(user.id))
    }
  },[dispatch]);

  return (
    <GeneralContext.Provider value={{setOpen, responseMessage, setResponseMessage}}>
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
            <Route path='materials' element={<Materials />} />
            <Route path='projects' element={<Project />} />
            <Route path='report' element={<Reports />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* RESPONSE MESSAGE DISPLAYER ****************************************************************************************************************************** */}
      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </GeneralContext.Provider>
  )
}

export default App
