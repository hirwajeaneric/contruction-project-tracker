import { Link, Outlet, useNavigate } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, SideBarMenuItem, SideBarMenueContainer, SideNavigationBar, TopNavigationBar } from "../components/styles/DashboardStructureStyles"
import { HorizontallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../components/styles/GenericStyles"
import { MdHome, MdMenu, MdNotifications } from 'react-icons/md';
import { AiFillBuild } from 'react-icons/ai';
import { PiToolboxFill } from 'react-icons/pi';
import { TiUser } from 'react-icons/ti';
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import React from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const DashboardMain = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signout = () => {
        navigate('/auth/signin')
    }
    
    return (
        <VerticallyFlexSpaceBetweenContainer style={{ backgroundColor: '#e0ebeb' }}>
            <TopNavigationBar>
                <div className="left">
                    <MdMenu />
                    <Link to='/'>Contruc</Link>
                </div>    
                <div className="right">
                    <MdNotifications style={{ fontSize: '150%', color: 'gray'}} />
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>Settings
                    </MenuItem>
                    <MenuItem onClick={() => {handleClose(); signout()}}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>Logout
                    </MenuItem>
                </Menu>
            </TopNavigationBar>    
            <HorizontallyFlexGapContainer style={{ position: 'relative' }}>
                
                <SideNavigationBar>
                    <SideBarMenueContainer>
                        <SideBarMenuItem to={''}>
                            <MdHome />
                            <div className="nav-data">
                                <span className="text">Home</span>
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'projects'}>
                            <AiFillBuild />
                            <div className="nav-data">
                                <span className="text">Projects</span>
                                <span className="number">0</span>
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'materials'}>
                            <PiToolboxFill />
                            <div className="nav-data">
                                <span className="text">Materials</span>
                                <span className="number">20</span>
                            </div>
                        </SideBarMenuItem>
                        {/* <SideBarMenuItem to={'report'}>
                            <BiSolidReport />
                            <div className="nav-data">
                                <span className="text">Reports</span>
                            </div>
                        </SideBarMenuItem> */}
                        <SideBarMenuItem to={'settings'}>
                            <TiUser />
                            <div className="nav-data">
                                <span className="text">My account</span>
                            </div>
                        </SideBarMenuItem>                    
                    </SideBarMenueContainer>
                </SideNavigationBar>
                


                <DashboardMainContainer>
                    <DashboardInnerContainer>
                        <Outlet />
                    </DashboardInnerContainer>
                </DashboardMainContainer>

            </HorizontallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>
    )
}

export default DashboardMain