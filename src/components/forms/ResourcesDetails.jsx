import { Button } from '@mui/material'
import React from 'react'
import { FormElement, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../styles/GenericStyles'

const ResourcesDetails = ({data}) => {
  const deleteResource = (e) => {
    e.preventDefault();

    
  }

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <h2>Resource Info</h2>
        <Button variant='contained' size='small' color='error' onClick={deleteResource}>Delete</Button>
      </HorizontallyFlexSpaceBetweenContainer>
      <VerticallyFlexGapContainer>
        <FormElement>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={data.name} />
        </FormElement>
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ResourcesDetails