import { Button } from '@mui/material'
import React from 'react'
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from '../styles/GenericStyles'
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProjectResources } from "../../redux/features/materialSlice";
import { useEffect } from 'react';
import { ProjectTypes } from '../../utils/ProjectTypes';
import { WorldCountries } from '../../utils/WorldCountries';
import { useCookies } from 'react-cookie';

const MoreProjectDetails = ({data}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [project, setProject] = useState({});
  const { setOpen, setResponseMessage, handleOpenModal } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [ cookies ] = useCookies(null);
  const user = cookies.UserData;

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setProject({ ...project, [input.name]: input.value });
  }

  // Fetch resouce information
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    axios.get(serverUrl+'/api/v1/cpta/project/findById?id='+data._id)
    .then(response => {
      setProject(response.data.project);
    })
    .catch(error => console.log(error));
  },[]);

  // Update project
  const updateResouce = (e) => {
    e.preventDefault();
    setIsProcessing(true); 
    axios.put(serverUrl+'/api/v1/cpta/project/update?id='+project._id, project)
    .then(response => {
      if (response.status === 200) {
        dispatch(getProjectResources(project._id));
        setTimeout(() => {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          window.location.reload();
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

  // Delete project
  const deleteResource = (e) => {
    e.preventDefault();
    axios.delete(serverUrl+'/api/v1/cpta/project/delete?id='+project._id)
    .then(response => {
      if (response.status === 200) {
        dispatch(getProjectResources(project.project));
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
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer style={{ alignItems:'flex-start', paddingBottom:'10px', borderBottom:'1px solid #a3c2c2' }}>
        <h2 style={{ width: '70%' }}>{project.name}</h2>
        {user.role === 'Consultant' && <Button variant='contained' size='small' color='error' onClick={deleteResource}>Delete</Button>}
      </HorizontallyFlexSpaceBetweenContainer>
      <VerticallyFlexGapForm onSubmit={updateResouce} style={{ gap: '20px', color: 'gray', fontSize:'90%' }}>
        <HorizontallyFlexSpaceBetweenContainer style={{ fontSize: '100%', color: 'black', textAlign: 'left', alignItems: 'flex-start' }}>
          <VerticallyFlexGapContainer style={{ alignItems: 'flex-start', gap: '10px' }}>
            <p>Create on: <span style={{ color: 'gray', textAlign: 'left' }}>{new Date(project.creationDate).toLocaleString()}</span></p>
            <p>Start date: <span style={{ color: 'gray', textAlign: 'left' }}>{new Date(project.startDate).toLocaleString()}</span></p>
            <p>Status: <span style={{ color: 'gray', textAlign: 'left' }}>{project.status}</span></p>
          </VerticallyFlexGapContainer>
          <VerticallyFlexGapContainer style={{ alignItems: 'flex-start', gap: '10px' }}>
            <p>Owner: <span style={{ color: 'gray', textAlign: 'left' }}>{project.ownerName}</span></p>
            <p>Progress: <span style={{ color: 'gray', textAlign: 'left' }}>{`${project.progress.toFixed(1)} %`}</span></p>
          </VerticallyFlexGapContainer>
        </HorizontallyFlexSpaceBetweenContainer>
        <HorizontallyFlexSpaceBetweenContainer style={{ fontSize: '100%', color: 'black', textAlign: 'left', paddingBottom:'20px', borderBottom:'1px solid #a3c2c2' }}>
          <Button variant='text' type='button' size='small' color='primary' onClick={() => { window.location.replace(`/${project.code}/resources`) }}>
            {user.role === 'Consultant' && 'Add/View Resources'}
            {user.role === 'Owner' && 'View Resources'}
          </Button>
          <Button variant='text' type='button' size='small' color='secondary' onClick={() => { window.location.replace(`/${project.code}/milestones`) }}>
            {user.role === 'Consultant' && 'Add/View Milestones'}
            {user.role === 'Owner' && 'View Milestones'}
          </Button>
        </HorizontallyFlexSpaceBetweenContainer>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <FormElement>
            <label htmlFor="name">Name</label>
            {user.role === 'Consultant' && <input type="text" name="name" id="name" onChange={handleChange} value={project.name} />}
            {user.role === 'Owner' && <strong>{project.name}</strong>}
          </FormElement>
          <FormElement>
            <label htmlFor="type">Start date</label>
            {user.role === 'Consultant' && <input type={'date'} name="type" id="type" onChange={handleChange} value={project.startDate} />}
            {user.role === 'Owner' && <strong>{project.startDate}</strong>}
          </FormElement>
        </HorizontallyFlexGapContainer>
        <FormElement>
          <label htmlFor="description">Description</label>
          {user.role === 'Consultant' && <textarea rows={5} type="text" name="description" id="description" onChange={handleChange} value={project.description}></textarea>}
          {user.role === 'Owner' && <strong>{project.description}</strong>}
        </FormElement>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <FormElement>
            <label htmlFor="projectType">Project type</label>
            {user.role === 'Consultant' && <input type="text" disabled name="projectType" id="projectType" onChange={handleChange} value={project.projectType} />}
            {user.role === 'Owner' && <strong>{project.projectType}</strong>}
          </FormElement>
          <FormElement>
            <label htmlFor="dimensions">Dimensions</label>
            {user.role === 'Consultant' && <input type="number" name="dimensions" id="dimensions" onChange={handleChange} value={project.dimensions} />}
            {user.role === 'Owner' && <strong>{project.dimensions}</strong>}
          </FormElement>
        </HorizontallyFlexGapContainer>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <FormElement>
            <label htmlFor="country">Country</label>
            {user.role === 'Consultant' && <input type="text" name="country" id="country" onChange={handleChange} value={project.country} />}
            {user.role === 'Owner' && <strong>{project.country}</strong>}
          </FormElement>
        </HorizontallyFlexGapContainer>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <FormElement>
            <label htmlFor="city">City</label>
            {user.role === 'Consultant' && <input type="text" name="city" id="city" onChange={handleChange} value={project.city} />}
            {user.role === 'Owner' && <strong>{project.city}</strong>}
          </FormElement>
          <FormElement>
            <label htmlFor="province">Province</label>
            {user.role === 'Consultant' && <input type="text" name="province" id="province" onChange={handleChange} value={project.province} />}
            {user.role === 'Owner' && <strong>{project.province}</strong>}
          </FormElement>
          <FormElement>
            <label htmlFor="district">District</label>
            {user.role === 'Consultant' && <input type="text" name="district" id="district" onChange={handleChange} value={project.district} />}
            {user.role === 'Owner' && <strong>{project.district}</strong>}
          </FormElement>
        </HorizontallyFlexGapContainer>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <FormElement>
            <label htmlFor="sector">Sector</label>
            {user.role === 'Consultant' && <input type="text" name="sector" id="sector" onChange={handleChange} value={project.sector} />}
            {user.role === 'Owner' && <strong>{project.sector}</strong>}
          </FormElement>
          <FormElement>
            <label htmlFor="address">Address</label>
            {user.role === 'Consultant' && <input type="text" name="address" id="address" onChange={handleChange} value={project.address} />}
            {user.role === 'Owner' && <strong>{project.address}</strong>}
          </FormElement>
        </HorizontallyFlexGapContainer>
        {user.role === 'Consultant' && <FormElement style={{ flexDirection: 'row', gap: '30%' }}>
          {isProcessing 
          ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
          : <Button variant="contained" color="primary" size="small" type="submit">Confirm Updates</Button>
          }
          <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
        </FormElement>}
      </VerticallyFlexGapForm>
    </VerticallyFlexGapContainer>
  )
}

export default MoreProjectDetails