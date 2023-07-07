import styled from 'styled-components';

export const TopNavigationBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    z-index: 1000;
    height: 10svh; 
    width: 100vw; 
    
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
            
        }
    
        div.right {
        
        }
    }
`;

export const SideNavigationBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    position: fixed;
    z-index: 999;
    height: 90svh;
    bottom: 0;
    left: 0;
    padding: 0 10px 20px;

    @media (max-width: 1200px) {
        display: none;
    }
    
    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SideBarMenueContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    border-radius: 5px;
    background: green;

    @media (max-width: 1200px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SideBarMenuItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const DashboardMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    position: fixed;
    z-index: 999;
    height: 90svh;
    bottom: 0;
    right: 0;
    
    @media (max-width: 1200px) {
        width: 100%;
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const DashboardInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding: 5px 10px 5px 5px;

    @media (max-width: 1200px) {
        padding: 5px 10px 5px 10px;
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;