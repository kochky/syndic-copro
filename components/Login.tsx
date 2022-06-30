import React, { useState} from 'react';
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import Button  from './Button';
import TextField from '@mui/material/TextField';
import {Theme} from '../pages/index'
import Alert from '@mui/material/Alert';
import { State } from "../pages/dashboard";
import { MenuContext } from "../pages/dashboard";
import { UserData } from "../pages/dashboard";
import { MessageData } from "../pages/dashboard";
import { MsgType } from "../pages/dashboard";
import { UserType} from '../pages/dashboard'
  

const Bg = styled.div `
    width:100vw;
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
    height:50%;
    max-height:400px;
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


const Login = () => {
    
    const router = useRouter()

    const user = React.useContext (UserData) as UserType;
    const msg = React.useContext (MessageData) as MsgType;
    const context = React.useContext (MenuContext) as State;


    const [username,setUsername]=useState<string | undefined>(undefined)
    const [password,setPassword]=useState<string | undefined>(undefined)
    const [errorUsername,setErrorUsername]=useState<boolean>(false)
    const [errorPassword,setErrorPassword]=useState<boolean>(false)
    const [forgotten,setForgotten]=useState(false)
    const [confirmed,setConfirmed]=useState(false)
    const [errorMail,setErrorMail]=useState(false)
    const [errorMessage, setErrorMessage]= useState<string|null> (null);


    const handleChangeUser=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(event.target.value)
    }
    const handleChangePassword=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value)
    }

    const handleSubmit=()=> {
        if(forgotten){
            console.log("mot de passe envoyé")
            setConfirmed(true)
            const requestOptions = {
                method: 'POST',
                headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    query:` mutation{
                    forgotPassword(password:{email:"${username}"}){
                        _id            
                        }
                    }`
                })
            };
            fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
                .then(response => response.json())
                .then(response=>{if(!response.errors) {user.setUser(response.data.loginUser)
                    localStorage.setItem("user",JSON.stringify(response.data.loginUser)||'')
                    context.setIsLogged(true) }
                    else{setErrorMessage(response.errors[0].message)} 
                                })
                .catch(error=>setErrorMessage(error))
            
        }else {

            const requestOptions = {
                    method: 'POST',
                    headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        query:` {
                        loginUser(password:"${password}",email:"${username}"){
                           token
                           userId
                           name
                           email
                           lot
                           millieme
                           provision{
                               year
                               montant
                               paid
                           }
                           admin
                           
                                     
                            }
                        }`
                    })
                };
                fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
                .then(response => response.json())
                .then(response=>{if(!response.errors) {user.setUser(response.data.loginUser)
                    localStorage.setItem("user",JSON.stringify(response.data.loginUser)||'')
                    context.setIsLogged(true) }
                    else{setErrorMessage(response.errors[0].message)} 
                                })
                .catch(error=>setErrorMessage(error))
                
        }
   
    }

    const handleClose=()=>{
        setConfirmed(false)
        setForgotten(false)
        setErrorMail(false)
        setErrorMessage(null)

    }

    return(
        <Bg >
            <Modal>
                <Title> {!forgotten ? 'Connectez-vous': 'Récupérer mot de passe'}</Title>
                <i className="fa-solid fa-xmark x fa-lg" onClick={()=>router.push('/')}></i>
               {!confirmed &&<>{!errorUsername ?  (
                    <TextField
                            id="username-input"
                            label="Identifiant"
                            value={username}
                            onChange={handleChangeUser}
                            fullWidth 
                            color="primary"
                            
                            
                        />):(
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="Identifiant"
                        value={username}
                        helperText="L'identifiant ne correspond pas"
                        onChange={handleChangeUser}
                        fullWidth 
                    />)
                        }</> }
             { !forgotten && <> {!errorPassword ?  (
                    <TextField
                            id="password-input"
                            label="Mot de passe"
                            value={password}
                            onChange={handleChangePassword}
                            fullWidth 
                            type="password"
                        />):(
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="Mot de passe"
                        value={password}
                        helperText="Mot de passe incorrect"
                        onChange={handleChangePassword}
                        fullWidth 
                        type="password"

                    />)
                }</> }
                {!forgotten && <Link onClick={()=>setForgotten(true)}>Mot de passe perdu</Link>}
                <div> { confirmed && <Alert severity="success">Votre mot de passe vous a été envoyé par mail !</Alert>}
                        {errorMail && <Alert severity="error">Votre email ne correspond pas</Alert> }
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert> }  
                </div>
                {!confirmed ? <Button primary onClick={handleSubmit} size="large" label="Valider"/> :<Button primary onClick={handleClose} size="large" label="Retour"/>}
            </Modal>
        </Bg>
    )

  }

  export default Login