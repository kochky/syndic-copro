import React, { useState} from 'react';
import styled, { css } from 'styled-components'
import Button  from './Button';
import {Theme} from '../pages/index'
import Alert from '@mui/material/Alert';
import { State } from "../pages/dashboard";
import { MenuContext } from "../pages/dashboard";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

  

const Bg = styled.div `
    width:100vw;
    min-width:325px;
    height:100vh;
    position:absolute;
    top:0;
    z-index:99;
    display:flex;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,0.2)
`
const Modal=styled.div `
    width:50%;
   
    background:white;
    border-radius:15px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    row-gap:30px;
    padding:30px;
    position:relative;
    @media screen and (max-width:768px){
        width:80%;

    }
`
const Title=styled.h2 `
    color:${(props:Theme)=>props.theme.primary};
    font-family:"Gotham black";
    @media screen and (max-width:475px){
        font-size:16px;

    }

`
const Link=styled.div `
    color:${(props:Theme)=>props.theme.tertiary};
    font-family:"Gotham book";
    cursor:pointer;
    height:20px;
    &:hover {
        border-bottom:1px solid;
    }
    @media screen and (max-width:475px){
        font-size:12px;

    }
`


const Password = () => {

    const value = React.useContext (MenuContext) as State;



    const [oldPassword,setOldPassword]=useState<string | null>(null)
    const [newPasswordOne,setNewPasswordOne]=useState<string | null>(null)
    const [newPasswordTwo,setNewPasswordTwo]=useState<string | null>(null)
    const [showOldPassword,setShowOldPassword]=useState<boolean>(false)
    const [showPasswordOne,setShowPasswordOne]=useState<boolean>(false)
    const [showPasswordTwo,setShowPasswordTwo]=useState<boolean>(false)


    const [errorOldPassword,setErrorOldPassword]=useState<boolean>(false)
    const [errorDifferentPassword,setErrorDifferentPassword]=useState<boolean>(false)
    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorFormat,setErrorFormat]=useState<boolean>(false)

    const handleOldPassword=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setOldPassword(event.target.value)
    }
    const handleChangePasswordOne=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setNewPasswordOne(event.target.value)
    }
    const handleChangePasswordTwo=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setNewPasswordTwo(event.target.value)
    }
    const handleSubmit=()=> {
        if(newPasswordOne !=null && newPasswordTwo!=null && oldPassword!=null ){

            if((newPasswordOne===newPasswordTwo) && newPasswordOne.match( /[0-9]/g) && 
            newPasswordOne.match( /[A-Z]/g) && 
            newPasswordOne.match(/[a-z]/g) && 
            newPasswordOne.match( /[^a-zA-Z\d]/g) &&
            newPasswordOne.length >= 8){
                //doit vérifier l'ancien mot de passe puis confirme

                const user= JSON.parse(localStorage.getItem("user")||'')
                const token="Bearer " + user.token
                const headers = {
                  "content-type": "application/json",
                    "Authorization": token,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ 
                        query:` mutation{
                                changePassword(user:{password:"${oldPassword}",newPassword:"${newPasswordOne}"}){
                                    name
                                }
                        }`
                    })
                  }
            
                fetch('http://localhost:4000/graphql', requestOptions)
                .then(response => response.json())
                .then((response)=>{
                 if(!response.errors) {setConfirmed(true)
                    setErrorOldPassword(false)
                    setErrorDifferentPassword(false)
                    setErrorFormat(false)
                }else {
                    setErrorOldPassword(true) 
                    }
                 })
                .catch(error=>console.log(error))







          


            }else if(newPasswordOne!==newPasswordTwo){
                setErrorDifferentPassword(true)
                setErrorFormat(false)

            }else {
                setErrorFormat(true)
                setErrorDifferentPassword(false)

            }
        }
    }
    const handleClickShowOldPassword = () => {
       setShowOldPassword(!showOldPassword);
      };

    const handleClickShowPasswordOne = () => {
        setShowPasswordOne(!showPasswordOne);
    };

    const handleClickShowPasswordTwo = () => {
        setShowPasswordTwo(!showPasswordTwo);
    };

    const handleClose=()=>{
        value.setChangePassword(false)
    }
    const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
    };

    return(
        <Bg >
            <Modal>
                <Title> Changer mot de passe</Title>
                {!confirmed &&
                    <>
                    <i className="fa-solid fa-xmark x fa-lg" onClick={()=>value.setChangePassword(false)}></i>
                    <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showOldPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={handleOldPassword}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOldPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                        </InputAdornment>
                        }
                        label="Ancien mot de passe"
                    />
                    </FormControl>
                      
                    <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordOne ? 'text' : 'password'}
                            value={newPasswordOne}
                            onChange={handleChangePasswordOne}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordOne}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                        </InputAdornment>
                        }
                        label="Nouveau mot de passe"
                    />
                    </FormControl>
                      
                      <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPasswordTwo? 'text' : 'password'}
                          value={newPasswordTwo}
                          onChange={handleChangePasswordTwo}
                          endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordTwo}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              >
                              {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                      </InputAdornment>
                      }
                      label="Nouveau mot de passe"
                  />
                  </FormControl>
            
    
                    </> 
                    }
                
                
                <div> { confirmed && <Alert severity="success">Votre mot de passe a été modifié !</Alert>}
                        {errorDifferentPassword && <Alert severity="error">Vos mots de passe ne correspondent pas</Alert>    }  
                        {errorOldPassword && <Alert severity="error">Votre ancien mot de passe est erroné </Alert>}
                        {errorFormat && <Alert severity="error">Le nouveau mot de passe doit contenir une majuscule, une minuscule, un chiffre, un symbole, un caractère spécial et avoir au moins 8 caractères </Alert>}

                        
                </div>
                {!confirmed ? <Button primary onClick={handleSubmit} size="large" label="Valider"/> :<Button primary onClick={handleClose} size="large" label="Retour"/>}
            </Modal>
        </Bg>
    )

  }

  export default Password