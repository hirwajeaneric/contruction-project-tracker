import React, { useContext, useState } from 'react';
import { HorizontallyFlexGapContainer } from './styles/GenericStyles';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdOutlineCircle } from 'react-icons/md';
import { GeneralContext } from '../App';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getProjectIssues } from '../redux/features/issueSlice';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const generalStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: '#e6f2ff',
    border: '1px solid #b3d9ff',
    borderRadius: '5px'
}

const checkButtonStyles = {
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    padding: '5px',
    fontSize: '150%',
    color: '#0066cc'
}

const nameStyles = {
    width: '100%',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontSize: '100%',
}

const TodoItem = (props) => {
    const { type ,data } = props;
    const { setOpen, setResponseMessage,handleOpenModal, setDetailsFormType, setDetailsData } = useContext(GeneralContext);
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);

    const viewIssueDetails = () => {
        handleOpenModal(); 
        setDetailsFormType('issue');
        setDetailsData(data);
    }

    const updateIssueProgress = (e) => {
        e.preventDefault();

        var progress = '';
        if (data.progress === 'Todo') {
            progress = 'Completed';
        } else {
            progress = 'Todo'
        }

        setIsProcessing(true);

        axios.put(serverUrl+'/api/v1/cpta/issue/update?id='+data.id, {progress : progress})
        .then(response => {
            if (response.status === 200) {
                setIsProcessing(false);
                dispatch(getProjectIssues(response.data.issue.project));
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
            }
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
        <HorizontallyFlexGapContainer style={generalStyles}>
            <button type='button' onClick={updateIssueProgress} style={checkButtonStyles}>{(data.progress=== 'Todo' || data.progress=== 'In Progress') ? <MdOutlineCircle /> : <AiFillCheckCircle />}</button>
            <button type='button' onClick={viewIssueDetails} style={nameStyles}>{data.name}</button>
        </HorizontallyFlexGapContainer>
    )
}

export default TodoItem