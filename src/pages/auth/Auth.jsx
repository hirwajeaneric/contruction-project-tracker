import { Outlet } from 'react-router-dom'
import { CenterFlexedContainer } from '../../components/styles/GenericStyles'

const Auth = () => {
  return (
    <CenterFlexedContainer style={{ width: '100vw', height: '100vh', background: "url('/pexels-apostrophy-studio-1098460.jpg')", backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundOrigin: 'unset' }}>
        <Outlet />
    </CenterFlexedContainer>
  )
}

export default Auth