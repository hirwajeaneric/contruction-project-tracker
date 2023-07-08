import { Outlet } from 'react-router-dom'
import { CenterFlexedContainer } from '../../components/styles/GenericStyles'

const Auth = () => {
  return (
    <CenterFlexedContainer>
        <Outlet />
    </CenterFlexedContainer>
  )
}

export default Auth