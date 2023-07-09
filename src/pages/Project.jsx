import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import CreateProjectForm from "../components/forms/CreateProjectForm";
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
import ProjectItem from "../components/ProjectItem";

const Project = () => {
  const { isLoading, listOfConsultantsProjects, listOfOwnerProjects } = useSelector(state => state.project);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px'}}>
      <Helmet>
        <title>My projects - A list of both my projects and projects I manage</title>
        <meta name="description" content={`A list of both my projects and projects I manage.`} /> 
      </Helmet>

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
              <ProjectItem key={index} project={project} />
            ))}

            {listOfConsultantsProjects && listOfConsultantsProjects.map((project, index) => (
              <ProjectItem key={index} project={project}/>
            ))}
          </>}
        </VerticallyFlexGapContainer>
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Project