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
        width: 48%;
        background-color: gray;
    }

    div.right {
        display: flex;
        width: 48%;
        background-color: grey;
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

export const HorizontallyFlexGapContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

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



