import React from 'react'
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from '../styles/GenericStyles'
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProjectIssues } from '../../redux/features/issueSlice';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Label } from '@mui/icons-material';
import StatusButtonGroup from '../StatusButtonGroup';
import { MdDelete } from 'react-icons/md';

const IssueDetails = ({data}) => {
  const [issue, setIssue] = useState({});
  const [project, setProject] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOpen, setResponseMessage, handleOpenModal } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setIssue({ ...issue, [input.name]: input.value });
  }

  // Fetch resouce information
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    axios.get(serverUrl+'/api/v1/cpta/issue/findById?id='+data.id)
    .then(response => {
      response.data.issue.creationDate = new Date(response.data.issue.creationDate).toUTCString();
      setIssue(response.data.issue);

      axios.get(serverUrl+'/api/v1/cpta/project/findById?id='+response.data.issue.project)
      .then(response => {
        setProject(response.data.project)
      })
      .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  },[]);

  // Update issue 
  const updateIssue = (e) => {
    e.preventDefault();
    setIsProcessing(true); 
    axios.put(serverUrl+'/api/v1/cpta/issue/update?id='+issue._id, issue)
    .then(response => {
      if (response.status === 200) {
        dispatch(getProjectIssues(issue.project));
        setTimeout(() => {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          handleOpenModal();
        }, 2000);
      }
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  };

  // Delete issue
  const deleteIssue = (e) => {
    e.preventDefault();
    axios.delete(serverUrl+'/api/v1/cpta/issue/delete?id='+issue._id)
    .then(response => {
      if (response.status === 200) {
        dispatch(getProjectIssues(issue.project));
        handleOpenModal();
      }
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <VerticallyFlexGapContainer style={{ gap: '10px' }}>
      <HorizontallyFlexSpaceBetweenContainer style={{ borderBottom: '1px solid #94b8b8', paddingBottom: '10px' }}>
        <p>{project.name}</p>
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexSpaceBetweenContainer style={{ flexWrap:'wrap', borderBottom: '1px solid #94b8b8', paddingBottom: '10px' }}>
        <h2>{issue.name}</h2>
        <Button variant='contained' size='small' color='error' onClick={deleteIssue}>Delete &nbsp;<MdDelete /></Button>
      </HorizontallyFlexSpaceBetweenContainer>
      <VerticallyFlexGapForm onSubmit={updateIssue} style={{ gap: '20px', color: 'gray', fontSize:'90%',borderBottom: '1px solid #94b8b8', paddingBottom: '10px' }}>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <Label style={{ color: 'black' }}/> 
          <StatusButtonGroup data={issue} />
        </HorizontallyFlexGapContainer>
        <FormElement style={{ flexDirection: 'row', gap: '30%' }}>
          {isProcessing 
          ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
          : <Button variant="contained" color="primary" size="small" type="submit">Confirm Updates</Button>
          }
          <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
        </FormElement>
      </VerticallyFlexGapForm>
    </VerticallyFlexGapContainer>
  )
}

export default IssueDetails