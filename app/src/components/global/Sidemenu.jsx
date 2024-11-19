import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../global/Button';
import { useAuth } from '../../Context/AuthContext';
import { MdAppRegistration,MdHome,MdMenuOpen,
  MdListAlt,MdSettings,MdHelp,MdExitToApp
 } from "react-icons/md";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export function Sidemenu () {

    const { logout } = useAuth();
    
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div style={{ display: 'flex', height: '100%', minHeight: '400px', alignContent:'center'}}>
        <Sidebar breakPoint='md' collapsed={collapsed}  rootStyles={{
          background:
            '#fff',
          float: 'left',
          height: '650px',
          
        }}>
          <Menu>
            <MenuItem component={<Link to="/" />}> <MdHome/> Home </MenuItem>
            <MenuItem component={<Link to="/config" />} > <MdSettings/> Usuários </MenuItem>
            <MenuItem onClick={logout} component={<Link to="/" />}> <MdExitToApp/> Sair</MenuItem>

          </Menu>
        </Sidebar>
        <main style={{ padding: 10 }}>
          <div>
            <Button className="openCloseMenu" onClick={() => setCollapsed(!collapsed)} text={<MdMenuOpen/>} color="#789671" border={10} />

          </div>
        </main>
      </div>
    );
}
