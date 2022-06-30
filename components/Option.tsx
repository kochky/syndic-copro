import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled, { css } from 'styled-components'
import {Theme} from '../pages/index'
import { State } from "../pages/dashboard";
import { MenuContext } from "../pages/dashboard";
import { UserData } from "../pages/dashboard";
import { CoproData } from "../pages/dashboard";
import { MessageData } from "../pages/dashboard";
import { CoProType} from '../pages/dashboard'
import { MsgType } from "../pages/dashboard";
import { UserType} from '../pages/dashboard'

const Icon=styled.i `
    color:${(props:Theme)=>props.theme.tertiary};  
`


export default function BasicMenu({}) {
  const copro = React.useContext (CoproData) as CoProType;
    const user = React.useContext (UserData) as UserType;
    const context = React.useContext (MenuContext) as State;
    const msg = React.useContext (MessageData) as MsgType;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose=()=> {
    setAnchorEl(null);

  }

  const handleChangePassword = () => {
    context.setChangePassword(true);
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    user.setUser(null)
    copro.setData(null)
    msg.setMessagerie(null)
    context.setIsLogged(false)
    if (localStorage.getItem('user')) {
      localStorage.clear()
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon className="fa-solid fa-user-gear fa-xl"></Icon>      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleChangePassword}>Changer mot de passe</MenuItem>
        <MenuItem onClick={handleLogOut}>Déconnexion</MenuItem>
      </Menu>
    </div>
  );
}