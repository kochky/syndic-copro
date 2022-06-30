

import React, { useState, useEffect} from "react"
import styled, { css } from 'styled-components'
import { MessageData } from "../../dashboard";
import { MsgType } from "../../dashboard";
import { Button } from "../Button";
import TextField from '@mui/material/TextField';
import { UserData } from "../../dashboard";
import { UserType} from '../../dashboard'
import {Theme} from '../../index'

type Props ={
    contactActive:string|undefined;
}

const InputContainer=styled.div`
    height:150px;
    display:flex;
    align-items:flex-end;
    padding:0 15px;
    column-gap:15px;
    background-color:whitesmoke;
    border-radius:0 0px 15px 0 ;

    @media screen and (max-width:768px){
        border:1px solid;
        border-top:none;
        border-color:${(props:Theme)=>props.theme.tertiary};
        border-radius:0 0 15px 15px;
    }

`

export const MessageSender=({contactActive}:Props)=> {



    const value = React.useContext (MessageData) as MsgType;
    const userValue = React.useContext (UserData) as UserType;

    const [messageInput,setMessageInput]=useState<string>()

    const handleChange=(event:any)=>{
        setMessageInput(event.target.value);
    }   

    const sendMessage=()=>{
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
                createMessage(messages: {message:"${messageInput}",destinataire:"${contactActive}"}){
                    _id
                    message
                    destinataire
                    expediteur
                    lu
                    date
              }
            }`
          })
      };
        {(value.messagerie && userValue.user && contactActive && messageInput) && (
            setMessageInput(''),
            fetch('http://localhost:4000/graphql', requestOptions)
                .then(response => response.json())
                .then(()=>value.setUpdateMessages(true))
                
                .catch(error=>console.log(error))
        )}
        
    }
    return(

        <InputContainer>
                <TextField
                    id="outlined-multiline-static"
                    key={1}
                    label="Message"
                    multiline
                    rows={5}
                    value={messageInput}
                    fullWidth
                    variant="filled"
                    onChange={handleChange}
                />
                    <div style={{alignSelf:'center'}}>
                        <Button onClick={()=>sendMessage()} primary label="Envoyer"/>
                    </div>
                </InputContainer>
    )
}