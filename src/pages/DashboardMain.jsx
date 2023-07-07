import { Link, Outlet } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, SideBarMenuItem, SideBarMenueContainer, SideNavigationBar, TopNavigationBar } from "../components/styles/DashboardStructureStyles"
import { HorizontallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../components/styles/GenericStyles"
import { MdHome, MdMenu } from 'react-icons/md';

const DashboardMain = () => {
  return (
    <VerticallyFlexSpaceBetweenContainer style={{ backgroundColor: '#f0f5f5' }}>
        <TopNavigationBar>
            <div className="left">
                <MdMenu />
                <Link to='/'>Contruc</Link>
            </div>    
            <div className="right">
                right side
            </div>
        </TopNavigationBar>    
        <HorizontallyFlexGapContainer style={{ position: 'relative', backgroundColor: '#f0f5f5' }}>
            
            <SideNavigationBar>
                <SideBarMenueContainer>
                    <SideBarMenuItem>
                        <MdHome to={''}/>
                        <span className="text">Home</span>
                    </SideBarMenuItem>
                    <SideBarMenuItem to={'projects'}>
                        <MdHome />
                        <span className="text">Projects</span>
                        <span className="number">0</span>
                    </SideBarMenuItem>
                    <SideBarMenuItem to={'materials'}>
                        <MdHome />
                        <span className="text">Materials</span>
                        <span className="number">20</span>
                    </SideBarMenuItem>
                    <SideBarMenuItem to={'report'}>
                        <MdHome />
                        <span className="text">Reports</span>
                    </SideBarMenuItem>
                    <SideBarMenuItem>
                        <MdHome to={'settings'}/>
                        <span className="text">My account</span>
                    </SideBarMenuItem>                    
                </SideBarMenueContainer>
            </SideNavigationBar>
            


            <DashboardMainContainer>
                <DashboardInnerContainer>
                    <Outlet />
                </DashboardInnerContainer>
            </DashboardMainContainer>

        </HorizontallyFlexGapContainer>
    </VerticallyFlexSpaceBetweenContainer>
  )
}

export default DashboardMain