import { Avatar, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from './styles/GenericStyles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSimpleCapitalizedChars } from '../utils/HelperFunctions';
import { ProjectProgressBar } from './styles/DashboardStructureStyles';
import axios from "axios";
import { useContext, useState } from "react";
import { GeneralContext } from "../App";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const ProjectItem = ({ project }) => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const { setOpen, setResponseMessage } = useContext(GeneralContext);

    const deleteProject = (projectId) => {
        setIsProcessing(true);
        axios.delete(serverUrl+'/api/v1/cpta/project/delete?id='+projectId)
        .then(response => {
        setTimeout(() => {
            if (response.status === 200) {
            setIsProcessing(false);
            setResponseMessage({ message: response.data.message, severity: 'success' });
            setOpen(true);
            window.location.reload(); 
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
    return (
        <HorizontallyFlexGapContainer>
            <div style={{ width: '5%' }}>
                <Avatar style={{ border: '2px solid blue' }}>{getSimpleCapitalizedChars(project.name)}</Avatar>
            </div>
            <VerticallyFlexGapContainer style={{ borderBottom: '1px solid #b3d9ff', paddingBottom: '10px', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5px' }}>
            <HorizontallyFlexSpaceBetweenContainer style={{ width: '100%'}}>
                <HeaderTwo style={{ width:'70%', }}>{project.name}</HeaderTwo>
                <HorizontallyFlexGapContainer style={{ width:'30%', gap: '40px', justifyContent:'flex-end' }}>
                    <Button variant="contained" color="primary" size="small" type="button" onClick={(e) => {navigate(`/projects/${project.code}`)}}><VisibilityIcon /></Button>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="error" size="small" type="button" onClick={(e) => {e.preventDefault(); deleteProject(project.id);}}><DeleteIcon /></Button>
                    }
                </HorizontallyFlexGapContainer>
                </HorizontallyFlexSpaceBetweenContainer>
                <p style={{ fontSize: '90%', color: 'gray' }}>{project.description}</p>
                <ProjectProgressBar>
                Hello world
                </ProjectProgressBar>
            </VerticallyFlexGapContainer>
        </HorizontallyFlexGapContainer>
    )
}

export default ProjectItem