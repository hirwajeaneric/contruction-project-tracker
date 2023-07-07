import { HorizontallyFlexSpaceBetweenContainer, VerticallyFlexSpaceBetweenContainer } from '../components/styles/GenericStyles'

const DashboardMain = () => {
  return (
    <VerticallyFlexSpaceBetweenContainer>
        <HorizontallyFlexSpaceBetweenContainer style={{ height: '5%' }}>
            <div className="left">
                left side
            </div>    
            <div className="right">
                right side
            </div>
        </HorizontallyFlexSpaceBetweenContainer>    
    </VerticallyFlexSpaceBetweenContainer>
  )
}

export default DashboardMain