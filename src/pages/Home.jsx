import { Avatar, Button } from "@mui/material"
import { HeaderOne, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
import AddIcon from '@mui/icons-material/Add';
import { ProjectProgressBar, StepToGetStarted } from "../components/styles/DashboardStructureStyles";
import ConstructionIcon from '@mui/icons-material/Construction';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  
  return (
    <VerticallyFlexGapContainer style={{ gap: '15px' }}>
      {/* First dashboard section  */}
      <VerticallyFlexGapContainer style={{ gap: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
        <HorizontallyFlexSpaceBetweenContainer>
          <div className="left49width" style={{ flexDirection: 'column'}}>
            <HeaderOne style={{ color: '#0080ff' }}>Welcome Hirwa Jean Eric</HeaderOne>
            <p style={{ color: '#476b6b'}}>Here are some quick steps to get you started</p>
          </div>
          <div className="right49width" style={{ justifyContent: "flex-end" }}>
            <Button variant="text" color='primary' startIcon={<AddIcon />} onClick={() => navigate('projects')}>Create Project</Button>
          </div>
        </HorizontallyFlexSpaceBetweenContainer>
        <HorizontallyFlexSpaceBetweenContainer>
          <div className="left49width" style={{ gap: '15px', flexDirection: 'column'}}>
            <StepToGetStarted>
              <AddIcon style={{ color: 'green' }}/>
              <div>
                <p>Create a project</p>
                <span>Add all necessary information</span>
              </div>
            </StepToGetStarted>
            <StepToGetStarted>
              <ConstructionIcon style={{ color: 'blue' }}/>
              <div>
                <p>Add project materials</p>
                <span>Provide all estimated project resources</span>
              </div>
            </StepToGetStarted>
          </div>
          <div className="right49width" style={{ gap: '15px', flexDirection: 'column'}}>
            <StepToGetStarted>
              <FormatListBulletedIcon style={{ color: 'orange' }}/>
              <div>
                <p>Create issues</p>
                <span>Issues are steps of a project</span>
              </div>
            </StepToGetStarted>
            <StepToGetStarted>
              <PlaylistAddCheckIcon style={{ color: '#4da6ff' }}/>
              <div>
                <p>Provide sprints for issue</p>
                <span>Sprint are smaller but trackable tasks of an issue</span>
              </div>
            </StepToGetStarted>
          </div>
        </HorizontallyFlexSpaceBetweenContainer>
      </VerticallyFlexGapContainer>

      {/* Second dashboard section  */}
      <VerticallyFlexGapContainer style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
        
        <HorizontallyFlexSpaceBetweenContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '15px'}}>
          <p style={{ fontWeight: '600' }}>Projects</p>
        </HorizontallyFlexSpaceBetweenContainer>

        <VerticallyFlexGapContainer style={{ gap: '10px' }}>
          <HorizontallyFlexGapContainer>
            <div style={{ width: '5%' }}>
              <Avatar style={{ border: '2px solid blue' }}>PI</Avatar>
            </div>
            <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
              <HeaderTwo>Project 1</HeaderTwo>
              <ProjectProgressBar>
                Hello world
              </ProjectProgressBar>
            </VerticallyFlexGapContainer>
          </HorizontallyFlexGapContainer>
          <HorizontallyFlexGapContainer>
            <div style={{ width: '5%' }}>
              <Avatar style={{ border: '2px solid blue' }}>PI</Avatar>
            </div>
            <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
              <HeaderTwo>Project 1</HeaderTwo>
              <ProjectProgressBar>
                Hello world
              </ProjectProgressBar>
            </VerticallyFlexGapContainer>
          </HorizontallyFlexGapContainer>
          <HorizontallyFlexGapContainer>
            <div style={{ width: '5%' }}>
              <Avatar style={{ border: '2px solid blue' }}>PI</Avatar>
            </div>
            <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
              <HeaderTwo>Project 1</HeaderTwo>
              <ProjectProgressBar>
                Hello world
              </ProjectProgressBar>
            </VerticallyFlexGapContainer>
          </HorizontallyFlexGapContainer>
          <HorizontallyFlexGapContainer>
            <div style={{ width: '5%' }}>
              <Avatar style={{ border: '2px solid blue' }}>PI</Avatar>
            </div>
            <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
              <HeaderTwo>Project 1</HeaderTwo>
              <ProjectProgressBar>
                Hello world
              </ProjectProgressBar>
            </VerticallyFlexGapContainer>
          </HorizontallyFlexGapContainer>
        </VerticallyFlexGapContainer>
      </VerticallyFlexGapContainer>

    </VerticallyFlexGapContainer>
  )
}

export default Home