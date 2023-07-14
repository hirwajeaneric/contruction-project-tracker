import React from 'react'
import styled from 'styled-components';

const CommentMessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 5px;
    border-radius: 5px;
    background: gray;

    p {
        color: white;
    }

    span {
        color: white-smoke;
    }
`;

const CommentComponent = (props) => {

    const { data } = props;
    return (
        <CommentMessageContainer>
            <p>{data.message}</p>
            <span>{new Date(data.addDate).toLocaleString()}</span>
        </CommentMessageContainer>
  )
}

export default CommentComponent