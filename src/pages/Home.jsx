import { Avatar, Button, Tooltip } from "@mui/material"
import { HeaderOne, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
import AddIcon from '@mui/icons-material/Add';
import { ProjectProgressBar, StepToGetStarted } from "../components/styles/DashboardStructureStyles";
import ConstructionIcon from '@mui/icons-material/Construction';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleCapitalizedChars } from "../utils/HelperFunctions";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext, useState } from "react";
import axios from "axios";
import { GeneralContext } from "../App";
import { getAllProjects } from "../redux/features/projectSlice";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const Home = () => {
  const navigate = useNavigate();
  const [ cookies ] = useCookies(null);
  const user = cookies.UserData;
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
  const dispatch = useDispatch();

  const deleteProject = (projectId) => {
    setIsProcessing(true);
    axios.delete(serverUrl+'/api/v1/cpta/project/delete?id='+projectId)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          dispatch(getAllProjects({id: user.id, email: user.email}));
        }
      }, 3000)
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }

  const { isLoading, listOfConsultantsProjects, listOfOwnerProjects } = useSelector(state => state.project);

  return (
    <VerticallyFlexGapContainer style={{ gap: '15px' }}>
      <Helmet>
        <title>Dashboard - Home</title>
        <meta name="description" content={`Welcome to your user dashboard.`} /> 
      </Helmet>

      {/* First dashboard section  */}
      <VerticallyFlexGapContainer style={{ gap: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
        <HorizontallyFlexSpaceBetweenContainer>
          <div className="left49width" style={{ flexDirection: 'column'}}>
            <HeaderOne style={{ color: '#0080ff' }}>{`Welcome ${user.fullName}`}</HeaderOne>
            {user.role === 'Consultant' && <p style={{ color: '#476b6b'}}>Here are some quick steps to get you started</p>}
            {user.role === 'Owner' && <p style={{ color: '#476b6b'}}>Get overview of your projects</p>}
          </div>
          {user.role === 'Consultant' && <div className="right49width" style={{ justifyContent: "flex-end" }}>
            <Button variant="text" color='primary' startIcon={<AddIcon />} onClick={() => navigate('projects')}>Create Project</Button>
          </div>}
        </HorizontallyFlexSpaceBetweenContainer>
        {user.role === 'Consultant' && <HorizontallyFlexSpaceBetweenContainer>
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
        </HorizontallyFlexSpaceBetweenContainer>}
      </VerticallyFlexGapContainer>

      {/* Second dashboard section  */}
      <VerticallyFlexGapContainer style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
        
        <HorizontallyFlexSpaceBetweenContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '15px'}}>
          <p style={{ fontWeight: '600' }}>Projects</p>
        </HorizontallyFlexSpaceBetweenContainer>

        <VerticallyFlexGapContainer style={{ gap: '10px' }}>
          {isLoading ? 
          <p style={{ color: 'gray' }}>Loading...</p> :
          <>
            {(listOfConsultantsProjects.length === 0 && listOfOwnerProjects.length === 0) && <p style={{ color: 'gray' }}>No available projects yet</p>}
            {listOfOwnerProjects && listOfOwnerProjects.map((project, index) => (
              <HorizontallyFlexGapContainer key={index}>
                <div style={{ width: '5%' }}>
                  <Avatar style={{ border: '2px solid blue' }}>PI</Avatar>
                </div>
                <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
                  <HorizontallyFlexSpaceBetweenContainer style={{ width: '100%'}}>
                    <HeaderTwo style={{ width:'70%', }}>{`Project ${project.name}`}</HeaderTwo>
                    <HorizontallyFlexGapContainer style={{ width:'30%', gap: '40px', justifyContent:'flex-end' }}>
                      <Tooltip title='View more'>
                        <Button variant="text" color="primary" size="small" type="button" onClick={(e) => { e.preventDefault(); navigate(`/${project.code}`)}}><MoreHorizIcon /></Button>
                      </Tooltip>
                    </HorizontallyFlexGapContainer>
                  </HorizontallyFlexSpaceBetweenContainer>
                  <p style={{ fontSize: '90%', color: 'gray' }}>{project.description}</p>
                  <ProjectProgressBar>
                    <div style={{ width: `${project.progress.toFixed(1)}%`}}>
                        {project.progress !== 0 && <p>{`${project.progress.toFixed(1)}%`}</p>}
                    </div>
                    {project.progress === 0 && <p>{`${project.progress.toFixed(1)}%`}</p>}
                </ProjectProgressBar>
                </VerticallyFlexGapContainer>
              </HorizontallyFlexGapContainer>
            ))}

            {listOfConsultantsProjects && listOfConsultantsProjects.map((project, index) => (
              <HorizontallyFlexGapContainer key={index}>
                <div style={{ width: '5%' }}>
                  <Avatar style={{ border: '2px solid blue' }}>{getSimpleCapitalizedChars(project.name)}</Avatar>
                </div>
                <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
                  <HorizontallyFlexSpaceBetweenContainer style={{ width: '100%'}}>
                    <HeaderTwo style={{ width:'70%', }}>{`Project ${project.name}`}</HeaderTwo>
                    <HorizontallyFlexGapContainer style={{ width:'30%', gap: '40px', justifyContent:'flex-end' }}>
                      <Tooltip title='View more'>
                        <Button variant="text" color="primary" size="small" type="button" onClick={() => {navigate(`/${project.code}`)}}><MoreHorizIcon /></Button>
                      </Tooltip>
                    </HorizontallyFlexGapContainer>
                  </HorizontallyFlexSpaceBetweenContainer>
                  <p style={{ fontSize: '90%', color: 'gray' }}>{project.description}</p>
                  <ProjectProgressBar>
                    <div style={{ width: `${project.progress.toFixed(1)}%`}}>
                        {project.progress !== 0 && <p>{`${project.progress.toFixed(1)}%`}</p>}
                    </div>
                    {project.progress === 0 && <p>{`${project.progress.toFixed(1)}%`}</p>}
                  </ProjectProgressBar>
                </VerticallyFlexGapContainer>
              </HorizontallyFlexGapContainer>
            ))}
          </>}
        </VerticallyFlexGapContainer>
      </VerticallyFlexGapContainer>

    </VerticallyFlexGapContainer>
  )
}

export default Home