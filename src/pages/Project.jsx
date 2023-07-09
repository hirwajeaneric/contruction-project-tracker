import { useSelector } from "react-redux";
import CreateProjectForm from "../components/forms/CreateProjectForm";
import { ProjectProgressBar } from "../components/styles/DashboardStructureStyles";
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../components/styles/GenericStyles"

const Project = () => {
  
  const { isLoading, listOfConsultantsProjects, listOfOwnerProjects } = useSelector(state => state.project);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px'}}>
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>My Projects</HeaderTwo>
      <CreateProjectForm />
      
      {/* List of projects  */}
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
                  <HeaderTwo>{`Project ${project.name}`}</HeaderTwo>
                  <p style={{ fontSize: '90%', color: 'gray' }}>{project.description}</p>
                  <ProjectProgressBar>
                    Hello world
                  </ProjectProgressBar>
                </VerticallyFlexGapContainer>
              </HorizontallyFlexGapContainer>
            ))}

            {listOfConsultantsProjects && listOfConsultantsProjects.map((project, index) => (
              <HorizontallyFlexGapContainer key={index}>
                <div style={{ width: '5%' }}>
                  <Avatar style={{ border: '2px solid blue' }}>PI</Avatar>
                </div>
                <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
                  <HeaderTwo>{`Project ${project.name}`}</HeaderTwo>
                  <p style={{ fontSize: '90%', color: 'gray' }}>{project.description}</p>
                  <ProjectProgressBar>
                    Hello world
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

export default Project