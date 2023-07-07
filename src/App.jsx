import { useEffect, } from 'react';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from 'react-cookie';
import AuthIndex from './pages/auth/AuthIndex';
import DashboardMain from './pages/DashboardMain';

const App = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const authToken = cookies.AuthToken

  // useEffect(() => {
  //   if (authToken) {
      // dispatch information
  //   }
  // }, [authToken])

  // Sort by date
  // const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <>
      {/* <AuthIndex /> */}
      <DashboardMain />
    </>
  )
}

export default App
