import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import CreateProjectForm from "../components/forms/CreateProjectForm";
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GeneralContext } from "../App";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AddResourcesForm from "../components/forms/AddResourcesForm";
import ResourcesTable from "../components/tables/ResourcesTable";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const ProjectMaterials = () => {
  const params = useParams();
  const { isLoading, listOfConsultantsProjects, listOfOwnerProjects } = useSelector(state => state.project);
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const [project, setProject] = useState({});
  
  // Fetching project 
  useEffect(() => {
    axios.get(`${serverUrl}/api/v1/cpta/project/findByCode?code=${params.code}`)
    .then((response) => {
      setProject(response.data.project)
    })
    .catch(error => console.log(error))
  },[]);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px'}}>
      <Helmet>
        <title>{`Resources - ${project.code}`}</title>
        <meta name="description" content={`A list of all resources associated to this project and a form to add more.`} /> 
      </Helmet>

      <VerticallyFlexGapContainer style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
        <HorizontallyFlexGapContainer>
          <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{project.name}</HeaderTwo>
          <p style={{ color: 'gray' }}>{project.code}</p>
        </HorizontallyFlexGapContainer>
      </VerticallyFlexGapContainer>

      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems:'flex-start'}}>
        {/* List of resources  */}
        <VerticallyFlexGapContainer style={{ justifyContent:'flex-start', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
          <p style={{ fontWeight: '600', width: '100%', textAlign:'left' }}>Resources</p>
          <ResourcesTable data={[]}/>
        </VerticallyFlexGapContainer>
        
        {/* Add resource form  */}
        <AddResourcesForm />
      </HorizontallyFlexGapContainer>

    </VerticallyFlexGapContainer>
  )
}

export default ProjectMaterials