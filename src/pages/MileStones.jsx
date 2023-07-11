import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../components/forms/CreateProjectForm";
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GeneralContext } from "../App";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getProjectResources } from "../redux/features/materialSlice";
import { Button } from "@mui/material";
import { getProjectIssues } from "../redux/features/issueSlice";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const MileStones = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage, handleOpenModal, setDetailsFormType, setDetailsData } = useContext(GeneralContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();  
    const [project, setProject] = useState({});
    
    // Fetching project 
    useEffect(() => {
        axios.get(`${serverUrl}/api/v1/cpta/project/findByCode?code=${params.code}`)
        .then((response) => {
            setProject(response.data.project);
            dispatch(getProjectIssues(response.data.project._id));
        })
        .catch(error => console.log(error))
    },[]);

    const { 
        isLoading : loadingIssues, 
        listOfProjectIssues, 
        numberOfProjectIssues, 
        listOfTodoIssues, 
        listOfInProgressIssue, 
        listOfCompletedIssues, 
        numberOfTodoIssues, 
        numberOfInProgressIssues, 
        numberOfCompletedIssues 
    } = useSelector(state => state.issue);

    const { isLoading: loadingProject } = useSelector(state => state.project);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px'}}>
      <Helmet>
        <title>{`Resources - ${project.code}`}</title>
        <meta name="description" content={`A list of all resources associated to this project and a form to add more.`} /> 
      </Helmet>

      <VerticallyFlexGapContainer style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
        {loadingProject ? <p style={{ width: '100%', textAlign: 'left' }}>Loading...</p> :
          <HorizontallyFlexSpaceBetweenContainer>
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{project.name}</HeaderTwo>
            <HorizontallyFlexGapContainer style={{ gap: '20px', justifyContent: 'flex-end' }}>
              <p style={{ color: 'black' }}>Code: <span style={{ color: 'gray' }}>{project.code}</span></p>
              <Button 
                variant='contained' 
                size='small' 
                color='info' 
                onClick={() => { 
                  handleOpenModal(); 
                  setDetailsFormType('project');
                  setDetailsData(project);
                }}>
                  Edit/View Project
                </Button>
            </HorizontallyFlexGapContainer>
          </HorizontallyFlexSpaceBetweenContainer>
        }
      </VerticallyFlexGapContainer>

      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems:'flex-start'}}>
        
      </HorizontallyFlexGapContainer>

    </VerticallyFlexGapContainer>
  )
}

export default MileStones