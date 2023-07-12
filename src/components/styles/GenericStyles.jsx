import styled from 'styled-components';

export const CenterFlexedContainer = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const HeaderOne = styled.h1`
    font-weight: 400;
    font-size: 2.2rem;
`;

export const HeaderTwo = styled.h2`
    font-weight: 400;
    font-size: 1.3rem;
`;

export const VerticallyFlexSpaceBetweenContainer = styled.div`
    width: 100%;  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const VerticallyFlexGapContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const VerticallyFlexSpaceBetweenForm = styled.form`
    width: 100%;  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const VerticallyFlexGapForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HorizontallyFlexSpaceBetweenContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    div.left {
        display: flex;
    }

    div.right {
        display: flex;
    }

    div.left49width {
        display: flex;
        width: 49%;
    }

    div.right49width {
        display: flex;
        width: 49%;
    }

    @media (max-width: 768px) {
        div.left {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
        
        div.left49width {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
        }
    
        div.right49width {
            display: flex;
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        div.left {
            
        }
    
        div.right {
        
        }
        
        div.left49width {
            
        }
    
        div.right49width {
        
        }
    }
`;

export const HorizontallyFlexGapContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    div.left {
        display: flex;
        
    }

    div.right {
        display: flex;
        
    }

    @media (max-width: 768px) {
        div.left {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        div.left {
            display: flex;
            width: 100%;
            margin-bottom: 15px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
    }
`;

export const StatusButtonGroupContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: 10px;
    
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        gap: 10px;
        background: #e6f2ff;
        color: black;
        border: none;
        padding: 5px 10px;
        cursor: pointer;

        &:hover {
            border: 1px solid black;
            padding: 4px 9px;
        }
    }
`; 

export const ProjectItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    border-bottom: 1px solid #b3d9ff; 
    padding: 20px 20px 20px 0px;
    align-items: flex-start;

    div.avatar-container {
        width: 15%;
        display: flex;
        justify-content: center;
    }

    div.right {
        display: flex;
        
    }

    @media (max-width: 768px) {
        div.left {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        div.left {
            display: flex;
            width: 100%;
            margin-bottom: 15px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
    }
`;

export const FormElement = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    label {
        font-size: 90%;
    }

    p {
        font-size: 90%;
        color: tomato;
    }

    textarea {
        font-size: 110%;
        font-family: 'Trebuchet MS', Arial, sans-serif;
    }

    input, textarea, select, option {
        width: 100%;
        padding: 12px 12px;
        border: 1px solid #b3cccc;
        border-radius: 3px;
        font-size: 100%;
    }

    button {
        width: 100%;
    }
`;
