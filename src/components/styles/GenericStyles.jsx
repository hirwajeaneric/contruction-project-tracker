import styled from 'styled-components';

export const CenterFlexedContainer = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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

export const HorizontallyFlexSpaceBetweenContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    div.left {
        display: flex;
        background-color: rgba(0,0,0,0.05);
    }

    div.right {
        display: flex;
        background-color: grey;
    }

    div.left49width {
        display: flex;
        width: 49%;
        background-color: rgba(0,0,0,0.05);
    }

    div.right49width {
        display: flex;
        width: 49%;
        background-color: grey;
    }

    @media (max-width: 768px) {
        div.left {
            display: flex;
            width: 100%;
            background-color: rgba(0,0,0,0.05);
            margin-bottom: 20px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
        
        div.left49width {
            display: flex;
            width: 100%;
            background-color: rgba(0,0,0,0.05);
            margin-bottom: 20px;
        }
    
        div.right49width {
            display: flex;
            width: 100%;
            background-color: grey;
        }
    }

    @media (max-width: 480px) {
        div.left {
            background-color: rgba(0,0,0,0.05);
            
        }
    
        div.right {
            background-color: grey;
        
        }
        
        div.left49width {
            background-color: rgba(0,0,0,0.05);
            
        }
    
        div.right49width {
            background-color: grey;
        
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



