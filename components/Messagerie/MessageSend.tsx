

import React, { useState, useEffect} from "react"
import styled, { css } from 'styled-components'
import { MessageData } from "../../pages/dashboard";
import { MsgType } from "../../pages/dashboard";
import  Button  from "../Button";
import TextField from '@mui/material/TextField';
import { UserData } from "../../pages/dashboard";
import { UserType} from '../../pages/dashboard'
import {Theme} from '../../pages/index'

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

const MessageSender=({contactActive}:Props)=> {



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
                createMessage(messages: {message:"${messageInput?.replace(/\n/g, "\\n")}",destinataire:"${contactActive}"}){
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
            fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
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
                    className="input-message"
                />
                    <div style={{alignSelf:'center'}}>
                        <Button onClick={()=>sendMessage()} primary label="Envoyer"/>
                    </div>
                </InputContainer>
    )
}

export default MessageSender