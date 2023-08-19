import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from "../components/styles/GenericStyles"
import { getSelectedProject } from "../redux/features/projectSlice";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from 'react-to-print';

export default function Reports() {
  const dispatch = useDispatch();
  const params = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });

  // Fetching project 
  useEffect(() => {
    dispatch(getSelectedProject({ projectCode: params.code }))
  },[dispatch]);  

  const { selectedProject } = useSelector(state => state.project);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px'}}>
      <Helmet>
        <title>{`Report preview - ${selectedProject.name}`}</title>
        <meta name="description" content={`Report preview for project ${selectedProject.name}.`} /> 
      </Helmet>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Report preview </strong></HeaderTwo>
        <Button variant='contained' size='small' color='secondary' onClick={handlePrint}>Print</Button>
      </HorizontallyFlexSpaceBetweenContainer>

      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <ComponentToPrint ref={componentRef} project={selectedProject} />      
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}