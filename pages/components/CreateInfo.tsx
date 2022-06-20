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
    width:80%;
`


export const CreateInfo = () => {

    const value = React.useContext (MenuContext) as State;

    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [description, setDescription] = useState('');

    
      function submit(){
        setErrorMessage(null)
        setConfirmed(false)
        const date=Date.now()
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
                        createInfo(infos:{date:"${date}",description:"${description}"}){
                            description
                        
               
              }
            }`
          })
      };
        fetch('http://localhost:4000/graphql', requestOptions)
            .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Proposer une info</Title>
                <i onClick={()=>value.setCreateInfo(false)}className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>

                    <TextField
                        id="outlined-name"
                        label="Description"
                        value={description}
                        onChange={(event)=>setDescription(event.target.value)}
                        multiline
                        rows={4}
                        fullWidth

                    />
                
                    <Button primary onClick={()=>submit()} label="Valider"/>
                </InputContainer>}
                <div> { confirmed && <Alert severity="success">L&apos;info a été envoyé et sera examiné!</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }