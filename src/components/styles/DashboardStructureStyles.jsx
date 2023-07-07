import { NavLink } from 'react-router-dom';
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
        align-items: center;
        gap: 20px;

        a {
            font-size: 200%;
            text-decoration: none;
            font-weight: 900;
            color: rgb(00, 155, 255 )
        }

        svg {
            font-size: 180%;
            margin: 20px;
        }
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
    // background: #003366;
    color: white;

    @media (max-width: 1200px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SideBarMenuItem = styled(NavLink)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: grey;
    padding: 7px 0;
    cursor: pointer;
    text-decoration: none;
    text-align: left;

    svg {
        width: 20%;
    }

    span.text {
        width: 60%;
    }

    span.number {
        width: 20%;
    }


    &:hover {
        color: #3399ff;
    }

    &.active {
        color: #0059b3;
    }

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