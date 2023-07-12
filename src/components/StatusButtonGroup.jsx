import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { GeneralContext } from '../App';
import { getProjectIssues } from '../redux/features/issueSlice';
import { StatusButtonGroupContainer } from './styles/GenericStyles';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const StatusButtonGroup = (props) => {
    const { data } = props;
    const { setOpen, setResponseMessage, handleOpenModal } = useContext(GeneralContext);
    const dispatch = useDispatch();
    

    // Update issue 
    const updateIssue = (updates) => {
        axios.put(serverUrl+'/api/v1/cpta/issue/update?id='+data._id, updates)
        .then(response => {
            if (response.status === 200) {
                dispatch(getProjectIssues(response.data.issue.project));
                handleOpenModal(); 
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
            }
        })
        .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setResponseMessage({ message: error.response.data.msg, severity:'error'})
            setOpen(true);
        }
        })
    };

    return (      
        <StatusButtonGroupContainer>
            <button 
                type='button'
                onClick={(e) => {
                    e.preventDefault();
                    updateIssue({progress: 'Todo'});
                }} 
                style={{ 
                    background: data.progress === 'Todo' ? 'green' : '#e6f2ff', 
                    color: data.progress === 'Todo' ? 'white' : 'black'        
                }}>
                    Todo
                    {data.progress === 'Todo' && <AiOutlineCheckCircle />}
            </button>
            <button 
                type='button'
                onClick={(e) => {
                    e.preventDefault();
                    updateIssue({progress: 'In Progress'});
                }}  
                style={{ 
                    background: data.progress === 'In Progress' ? 'green' : '#e6f2ff', 
                    color: data.progress === 'In Progress' ? 'white' : 'black'
                }}>
                    In Progress
                    {data.progress === 'In Progress' && <AiOutlineCheckCircle />}
            </button>
            <button 
                type='button'
                onClick={(e) => {
                    e.preventDefault();
                    updateIssue({progress: 'Completed'});
                }}  
                style={{ 
                    background: data.progress === 'Completed' ? 'green' : '#e6f2ff', 
                    color: data.progress === 'Completed' ? 'white' : 'black'
                }}>
                    Completed
                    {data.progress === 'Completed' && <AiOutlineCheckCircle />}
            </button>
        </StatusButtonGroupContainer>
    )
}

export default StatusButtonGroup