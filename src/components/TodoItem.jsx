import React from 'react'
import { HorizontallyFlexGapContainer } from './styles/GenericStyles'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdOutlineCircle } from 'react-icons/md'

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
    const { data } = props;
    return (
        <HorizontallyFlexGapContainer style={generalStyles}>
            <button type='button' style={checkButtonStyles}>{data.progress=== 'Todo' ? <MdOutlineCircle /> : <AiFillCheckCircle />}</button>
            <button type='button' style={nameStyles}>{data.name}</button>
        </HorizontallyFlexGapContainer>
    )
}

export default TodoItem