/* eslint-disable react/prop-types */
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexGapForm, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from '../styles/GenericStyles'
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Label } from '@mui/icons-material';
import StatusButtonGroup from '../StatusButtonGroup';
import { MdDelete, MdNotes, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { LuSend } from 'react-icons/lu';
import { getSprintComments } from '../../redux/features/commentSlice';
import CommentComponent from '../CommentComponent';
import { useCookies } from 'react-cookie';
import { getIssueSprints } from '../../redux/features/sprintSlice';
import { useForm } from 'react-hook-form';
import { getProjectResources } from '../../redux/features/materialSlice';
import SprintResourcesTable from '../tables/SprintResourcesTable';

const SprintDetails = (props) => {
  const { data } = props;
  const [ cookies ] = useCookies(null);
  const user = cookies.UserData;
  const [sprint, setSprint] = useState({});
  const [project, setProject] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingComment, setIsProcessingComment] = useState(false);
  const [isProcessingMaterials, setIsProcessingMaterials] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setOpen, setResponseMessage, handleOpenModal, selectedMaterial, setSelectedMaterial } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({});
  const [issue, setIssue] = useState({});

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setSprint({ ...sprint, [input.name]: input.value });
  }

  // Handle comment changes
  const handleComment = ({ currentTarget: input }) => {
    setComment({...comment, [input.name]: input.value });
  }

  const handleMaterialUpdates = ({ currentTarget: input }) => {
    setSelectedMaterial({...selectedMaterial, [input.name]: input.value });
  }


  // FETCHING INFORMATION ON COMPONENT LOADING
  useEffect(() => {
    // Set up a loader
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Fetch sprint details 
    axios.get(serverUrl+'/api/v1/cpta/sprint/findById?id='+data.id)
    .then(response => {
      response.data.sprint.creationDate = new Date(response.data.sprint.creationDate).toUTCString();
      setSprint(response.data.sprint);

      // Fetch sprint related comments 
      dispatch(getSprintComments(response.data.sprint.id));

      // Fetch project resources
      dispatch(getProjectResources(response.data.sprint.project));

      // Fetch project
      axios.get(serverUrl+'/api/v1/cpta/project/findById?id='+response.data.sprint.project)
      .then(response => {
        setProject(response.data.project)
      })
      .catch(error => console.error(error));

      // Fetch issue
      axios.get(serverUrl+'/api/v1/cpta/issue/findById?id='+response.data.sprint.issue)
      .then(response => {
        setIssue(response.data.issue)
      })
      .catch(error => console.error(error));

    })
    .catch(error => console.error(error));
  },[data, data.id, dispatch]);



  // Update issue 
  const updateSprint = (e) => {
    e.preventDefault();

    console.log(sprint);
    console.log(serverUrl+'/api/v1/cpta/sprint/update?id='+sprint._id);

    setIsProcessing(true); 
    axios.put(serverUrl+'/api/v1/cpta/sprint/update?id='+sprint._id, sprint)
    .then(response => {
      if (response.status === 200) {
        dispatch(getIssueSprints(sprint.issue));
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




  // Add sprint to issue 
  const onSubmit = data => {
  
    sprint.materials.push({
      id: data.name.split(" - ")[0],
      name: data.name.split(" - ")[1],
      quantity: Number(data.quantity),
      used: 0
    });

    console.log(sprint);

    setIsProcessingMaterials(true);

    axios.put(serverUrl+'/api/v1/cpta/sprint/update?id='+sprint._id, sprint)
    .then(response => {
        setTimeout(() => {
            if (response.status === 200) {
                setIsProcessingMaterials(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
            }
        }, 3000)
    })
    .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessingMaterials(false);
          setResponseMessage({ message: error.response.data.msg, severity:'error'})
          setOpen(true);
        }
    })
  };


  // Update material status
  const updateMaterialStatus = () => {


    setIsProcessingMaterials(true);

    axios.put(serverUrl+'/api/v1/cpta/sprint/update?id='+sprint._id, sprint)
    .then(response => {
        setTimeout(() => {
            if (response.status === 200) {
                setIsProcessingMaterials(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
            }
        }, 3000)
    })
    .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessingMaterials(false);
          setResponseMessage({ message: error.response.data.msg, severity:'error'})
          setOpen(true);
        }
    })
  };




  // Add comment 
  const addComment = (e) => {
    e.preventDefault();

    if (comment.message === '') {
      setResponseMessage({ message: 'Provide a message', severity:'warning'})
      setOpen(true);
      return;
    } else {
      comment.senderName = user.fullName;
      comment.senderId = user.id;
      comment.sprint = sprint._id;

      setIsProcessingComment(true); 
      
      axios.post(serverUrl+'/api/v1/cpta/comment/add', comment)
      .then(response => {
        if (response.status === 201) {
          dispatch(getSprintComments(response.data.comment.sprint));
          setIsProcessingComment(false);
          setComment({});
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessingComment(false);
        }
      })
    }
  };
  


  // Delete issue
  const deleteSprint = (e) => {
    e.preventDefault();
    axios.delete(serverUrl+'/api/v1/cpta/comment/deleteBySprint?sprint='+sprint._id)
    .then(response => {
      if (response.status === 200) {
        axios.delete(serverUrl+'/api/v1/cpta/sprint/delete?id='+sprint._id)
        .then(response => {
          if (response.status === 200) {
            dispatch(getIssueSprints(sprint._id));
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
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }


  // Calling store data
  const { isLoading, numberOfSprintComments, listOfSprintComments } = useSelector(state => state.comment);
  const { listOfProjectResources } = useSelector(state => state.material);


  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  
  
  return (
    <VerticallyFlexGapContainer style={{ gap: '10px', position: 'relative' }}>
      
      <HorizontallyFlexSpaceBetweenContainer style={{ borderBottom: '1px solid #94b8b8', paddingBottom: '10px' }}>
        <p>
          <strong>{project.name}</strong>
          <span> / {issue.name}</span> / activity</p>
      </HorizontallyFlexSpaceBetweenContainer>
      
      <HorizontallyFlexSpaceBetweenContainer style={{ flexWrap:'wrap', borderBottom: '1px solid #94b8b8', paddingBottom: '10px' }}>
        <h2>{sprint.name}</h2>
        <Button variant='contained' size='small' color='error' onClick={deleteSprint}>Delete &nbsp;<MdDelete /></Button>
      </HorizontallyFlexSpaceBetweenContainer>
      

      <VerticallyFlexGapContainer style={{ gap: '20px', color: 'gray', fontSize:'90%', position: 'relative' }}>
        
        <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
          <Label style={{ color: 'black' }}/> 
          <StatusButtonGroup type='sprint' data={sprint} />
        </HorizontallyFlexGapContainer>
        
        <VerticallyFlexGapContainer>
          <VerticallyFlexGapForm onSubmit={updateSprint} style={{ overflowY: 'auto' }}>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <MdOutlineDriveFileRenameOutline />
                <div>
                  <input type={'text'} placeholder='Change name' value={sprint.name} name='name' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <MdNotes />
                <div>
                  <input type={'text'} placeholder='Notes' value={sprint.description} name='description' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <BiCalendar/>
                <div>
                  <label htmlFor="startDate">Start Date {sprint.startDate && <span style={{ color: 'black' }}>{new Date(sprint.startDate).toLocaleString()}</span>}</label>
                  <input type={'date'} id='startDate' value={sprint.startDate} name='startDate' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <FormElement style={{ gap: '0px' }}>
              <div className="input-with-icon">
                <BiCalendar/>
                <div>
                  <label htmlFor="endDate">Due Date {sprint.endDate && <span style={{ color: 'black' }}>{new Date(sprint.endDate).toLocaleString()}</span>}</label>
                  <input type={'date'} id='endDate' value={sprint.endDate || ''} name='endDate' onChange={handleChange} />
                </div>
              </div>
            </FormElement>
            <HorizontallyFlexGapContainer style={{ marginTop: '20px' }}>
              {isProcessing 
                ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                : <Button variant="contained" color="primary" size="small" type="submit">Save changes</Button>
              }
            </HorizontallyFlexGapContainer>
          </VerticallyFlexGapForm>




          {/* MATERIAL MANAGEMENT ****************************************************************************************************************************/}
          <VerticallyFlexGapForm 
            onSubmit={(e) => {
              e.preventDefault();
              console.log(selectedMaterial.id);
              !selectedMaterial.id ? handleSubmit(onSubmit) : updateMaterialStatus()
            }} 
            style={{ marginTop: '20px', background: '#c6ecd9', padding: '20px', borderRadius: '5px', gap: '10px' }}
          >  
            <h3 style={{ width: '100%', textAlign: 'left', color: 'black' }}>Assign materials</h3>

            <HorizontallyFlexGapContainer style={{ gap: '20px', width: '100%', alignItems: 'flex-end' }}>
              {selectedMaterial.id
              ?  
              <HorizontallyFlexGapContainer style={{ gap: '20px', width: '100%' }}>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor='name' style={{ color: 'black' }}>Name</label>
                  <select style={{ padding: '8px 12px' }} name='name'>
                    <option value={selectedMaterial.name || ''}>{selectedMaterial.name}</option>
                    {listOfProjectResources.map((resource, index) => (
                      <option key={index} value={`${resource.id} - ${resource.name}`}>{resource.name}  :  {resource.quantity} {resource.measurementUnit}</option>
                    ))}
                  </select>
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor='quantity' style={{ color: 'black' }}>Quantity</label>
                  <input 
                    style={{ padding: '8px 12px' }}
                    type="number" 
                    id="quantity"
                    placeholder="Quantity" 
                    name='quantity'
                    value={selectedMaterial.quantity || ''}
                    onChange={handleMaterialUpdates}
                  />
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor='used' style={{ color: 'black'}}>Used quantity</label>
                  <input 
                    style={{ padding: '8px 12px' }}
                    type="number" 
                    id="used"
                    name='used'
                    placeholder="Used" 
                    value={selectedMaterial.used || ''}
                    onChange={handleMaterialUpdates}
                  />
                </FormElement>
              </HorizontallyFlexGapContainer>
              :
              <HorizontallyFlexGapContainer style={{ gap: '20px', width: '100%' }}>
                <FormElement style={{ color: 'gray' }}>
                  <select
                    style={{ padding: '8px 12px' }} 
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? "true" : "false"}
                  >
                    <option value="">Select material</option>
                    {listOfProjectResources.map((resource, index) => (
                      <option key={index} value={`${resource.id} - ${resource.name}`}>{resource.name}  :  {resource.quantity} {resource.measurementUnit}</option>
                    ))}
                  </select>
                  {errors.name?.type === "required" && (
                    <p role="alert">Required</p>
                  )}
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <input 
                    style={{ padding: '8px 12px' }}
                    type="number" 
                    id="quantity"
                    placeholder="Quantity" 
                    {...register("quantity", 
                    {required: true})} 
                    aria-invalid={errors.quantity ? "true" : "false"}
                  />
                  {errors.quantity?.type === "required" && (
                    <p role="alert">Required</p>
                  )}
                </FormElement>
              </HorizontallyFlexGapContainer>}
                
                {isProcessingMaterials ? 
                  <Button type="button" disabled variant='contained' color='success' size='small'>...</Button>
                  :
                  <Button type="submit" variant='contained' color='success' size='small'>{selectedMaterial.id ? 'Update' : 'Add'}</Button>
                }
            </HorizontallyFlexGapContainer>
            
            <VerticallyFlexGapContainer style={{ gap: '10px'}}>
              {sprint.materials.length > 0 && <></>}
              <SprintResourcesTable data={sprint.materials}/>
            </VerticallyFlexGapContainer>

          </VerticallyFlexGapForm>




          {/* COMMENTS  *************************************************************************************************************************** */}
          {/* List of comment */}
          <VerticallyFlexGapContainer style={{ padding: '20px 0' }}>
            <h4 style={{ padding: '5px', color: 'white', background:'black', borderRadius:'5px' }}>Comments</h4>
            <VerticallyFlexGapContainer style={{ gap: '10px', padding: '20px 0' }}>
              {isLoading 
              ?
              <p>Loading...</p>
              : 
              <>
                {numberOfSprintComments !== 0 && listOfSprintComments.map((comment,index) => {
                  return (
                    <CommentComponent data={comment} user={user} key={index}/>
                  )
                })}
                {numberOfSprintComments === 0 && <p>No comments yet</p>}
              </>}
            </VerticallyFlexGapContainer>
          </VerticallyFlexGapContainer>

          {/* Comment form  */}
          <HorizontallyFlexGapForm onSubmit={addComment} style={{ background:'white', padding:'10px', position: 'sticky', left: '0%', right: '0%', borderTop: '1px solid gray', borderBottom: '1px solid gray', }}>
            <FormElement>
              <input style={{ border: 'none', padding: '5px' }} name='message' value={comment.message || ''} placeholder='Add comment...' onChange={handleComment} />
            </FormElement>
            {isProcessingComment 
              ? <Button disabled variant="contained" color="primary" size="medium">...</Button> 
              : <Button variant="text" color="primary" size="medium" type="submit"><LuSend style={{ fontSize: '150%' }}/></Button>
            }
          </HorizontallyFlexGapForm>
        </VerticallyFlexGapContainer>

      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default SprintDetails