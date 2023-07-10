import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import CreateProjectForm from "../components/forms/CreateProjectForm";
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
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
      
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start'}}>
        {/* List of projects  */}
        <VerticallyFlexGapContainer style={{ gap: '20px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
          <VerticallyFlexGapContainer>
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

        {/* Create project form  */}
        <CreateProjectForm />
      </HorizontallyFlexGapContainer>

    </VerticallyFlexGapContainer>
  )
}

export default Project