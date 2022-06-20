import React, { useState} from 'react';
import styled, { css } from 'styled-components'
import { Button } from './Button';
import TextField from '@mui/material/TextField';
import {Theme} from '../index'
import { MenuContext } from "../dashboard";
import { State } from "../dashboard";
import Alert from '@mui/material/Alert';



  

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
const InputContainer=styled.div `
    display:flex;
    flex-direction:column;
    row-gap:15px;
`


export const CreateUsers = () => {

    const value = React.useContext (MenuContext) as State;

    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
    const [lot, setLot] = useState<number>();
    const [millieme, setMillieme] = useState<string>();

    const handleChange = (props:string,event:any) => {
        switch(props){
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "name":
                setName(event.target.value);
                break;
            case "lot":
                setLot(event.target.value);
                break;
            case "millieme":
                setMillieme(event.target.value)
                break;
        }
      };
      function submit(){
        setErrorMessage(null)
        setConfirmed(false)

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
                createUser(user: {name:"${name}",password:"${password}",email:"${email}",lot:${Number(lot)},millieme:"${millieme}"}){
                name
                password
                email
                lot
                millieme
                provision{
                  year
                  montant
                }
                admin 
               
              }
            }`
          })
      };
        fetch('http://localhost:4000/graphql', requestOptions)
            .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .then(data=>value.setNewUserCreated(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Ajout utilisateur</Title>
                <i onClick={()=>value.setCreateUser(false)}className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>

                    <TextField
                        id="outlined-name"
                        label="Email"
                        value={email}
                        onChange={(event)=>handleChange("email",event)}
                    />
                    <TextField
                        id="outlined-name"
                        label="Password"
                        value={password}
                        onChange={(event)=>handleChange("password",event)}
                    />
                    <TextField
                        id="outlined-name"
                        label="Name"
                        value={name}
                        onChange={(event)=>handleChange("name",event)}
                    />
                    <TextField
                        id="outlined-name"
                        label="Lot"
                        value={lot}
                        onChange={(event)=>handleChange("lot",event)}
                    />
                    <TextField
                        id="outlined-name"
                        label="Millième"
                        value={millieme}
                        onChange={(event)=>handleChange("millieme",event)}
                    />
                    <Button primary onClick={()=>submit()} label="Valider"/>
                </InputContainer>}
                <div> { confirmed && <Alert severity="success">Nouvel utilisateur créé !</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }