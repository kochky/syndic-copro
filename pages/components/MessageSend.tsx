

import React, { useState, useEffect} from "react"
import styled, { css } from 'styled-components'
import { MessageData } from "../dashboard";
import { MsgType } from "../dashboard";
import { Button } from "./Button";
import TextField from '@mui/material/TextField';
import { UserData } from "../dashboard";
import { UserType} from '../dashboard'
import {Theme} from '../index'

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
        {(value.messagerie && userValue.user && contactActive && messageInput) && (
            value.setMessagerie(value.messagerie.concat([{id:1,expediteur:userValue.user.name,destinataire:contactActive,message:messageInput,lu:false}])),
            setMessageInput('')
            
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