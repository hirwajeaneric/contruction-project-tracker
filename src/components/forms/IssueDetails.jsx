import React from 'react'
import { FormElement, FormElement2, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from '../styles/GenericStyles'
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
import { MdDelete, MdNotes, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { LuSend } from 'react-icons/lu';

const IssueDetails = ({data}) => {
  const [issue, setIssue] = useState({});
  const [project, setProject] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOpen, setResponseMessage, handleOpenModal } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({});
  const [sprint, setSprint] = useState({});

  // Handle activity/sprint input changes
  const handleActivityInput = ({ currentTarget: input }) => {
    setSprint({ ...sprint, [input.name]: input.value });
  }

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setIssue({ ...issue, [input.name]: input.value });
  }

  // Handle comment changes
  const handleComment = ({ currentTarget: input }) => {
    setComment(input.value);
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

    console.log(serverUrl+'/api/v1/cpta/issue/update?id='+issue._id);
    console.log(issue);

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
      <VerticallyFlexGapForm onSubmit={updateIssue} style={{ gap: '20px', color: 'gray', fontSize:'90%' }}>
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <Label style={{ color: 'black' }}/> 
          <StatusButtonGroup data={issue} />
        </HorizontallyFlexGapContainer>
        <VerticallyFlexGapContainer>
          <VerticallyFlexGapContainer style={{ overflowY: 'auto' }}>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <MdOutlineDriveFileRenameOutline />
                <div>
                  <input type={'text'} placeholder='Change name' value={issue.name} name='name' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <MdNotes />
                <div>
                  <input type={'text'} placeholder='Notes' value={issue.description} name='description' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <BiCalendar/>
                <div>
                  <label htmlFor="endDate">Start date</label>
                  <input type={'date'} value={issue.startDate} name='startDate' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <BiCalendar/>
                <div>
                  <label htmlFor="endDate">Due date</label>
                  <input type={'date'} value={issue.endDate || ''} name='endDate' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <HorizontallyFlexGapContainer style={{ marginTop: '20px' }}>
              {isProcessing 
                ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                : <Button variant="contained" color="primary" size="small" type="submit">Save changes</Button>
              }
            </HorizontallyFlexGapContainer>
            <VerticallyFlexGapContainer style={{ marginTop: '20px', background: '#e0ebeb', padding: '20px', borderRadius: '5px' }}>
              <h3 style={{ width: '100%', textAlign: 'left', color: 'black' }}>Add activities</h3>

              <HorizontallyFlexGapContainer style={{ borderTop: "1px solid rgba(0,0,0,.2)" }}>
                  <input id="name" name="name" value={sprint.name || ''} placeholder="Add activity..." type={'text'} onChange={handleActivityInput} style={{ width: '80%', padding: '8px 12px', border: 'none', color:"gray", fontSize:'100%',borderRadius: '0 0 0 5px' }} />
                  {sprint.name && 
                      <>
                          {isProcessing ? 
                              <button type="button" disabled style={{ width: '20%', padding: '8px 12px', border: 'none', background: 'gray', color: 'white', fontSize:'100%', borderRadius: '0 0 5px' }}>...</button>
                              :
                              <button type="submit" style={{ width: '20%', padding: '8px 12px', border: 'none', background: 'blue', color: 'white', fontSize:'100%', borderRadius: '0 0 5px' }}>Create</button>
                          }
                      </>
                  }
              </HorizontallyFlexGapContainer>
            </VerticallyFlexGapContainer>
            
          </VerticallyFlexGapContainer>
          <HorizontallyFlexGapContainer>
            <FormElement>
              <input name='comment' value={comment.text} placeholder='Add comment...' onChange={handleComment} />
            </FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="medium">...</Button> 
              : <Button variant="contained" color="primary" size="medium" type="submit"><LuSend style={{ fontSize: '150%' }}/></Button>
            }
          </HorizontallyFlexGapContainer>
        </VerticallyFlexGapContainer>
        <FormElement style={{ flexDirection: 'row', gap: '30%' }}>
        </FormElement>
      </VerticallyFlexGapForm>
    </VerticallyFlexGapContainer>
  )
}

export default IssueDetails