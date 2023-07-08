import { Outlet } from 'react-router-dom'
import { CenterFlexedContainer } from '../../components/styles/GenericStyles'

const Auth = () => {
  return (
    <CenterFlexedContainer>
        <h1>Authentication</h1>
        <Outlet />
    </CenterFlexedContainer>
  )
}

export default Auth