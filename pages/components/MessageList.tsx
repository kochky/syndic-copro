
import React, { useState, useEffect} from "react"
import styled, { css } from 'styled-components'
import { MessageData } from "../dashboard";
import { MsgType } from "../dashboard";
import {Theme} from '../index'

import {Message} from '../dashboard'

interface MessageProps {
    receive?:boolean
}

type Props ={
    contactActive:string|undefined;
}

const MessageList=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
    overflow:auto;
    height:100%;
    background-color:white;
    @media screen and (max-width:768px){
        border:1px solid;
        border-bottom:0;
        border-radius:15px 15px 0 0;
        border-color:${(props:Theme)=>props.theme.tertiary};
     }
`

const MessageCard=styled.div`
    max-width:90%;
    word-break: break-all;
    background-color:whitesmoke;
    align-self:flex-end;
    border-radius:15px;
    padding:15px;
    height:auto;
    margin-bottom:5px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    ${(props:MessageProps) => props.receive && css`
    align-self:flex-start
  `}
`
const Lu=styled.div`
    align-self:flex-end;
    margin-bottom:15px;
    padding:0 15px;

    color:${(props:Theme)=>props.theme.tertiary};
    ${(props:MessageProps) => props.receive && css`
    align-self:flex-start
  `}
`

export const Messages=({contactActive}:Props)=> {
    const value = React.useContext (MessageData) as MsgType;
    const objDiv = document.getElementById('messageList')as HTMLInputElement | null;

    useEffect(() => {
        value.setMessagerie((prevState:Message[])=>prevState.map((message:Message)=>message.expediteur===contactActive ? Object.assign(message,{lu:true}):message))
        
       if(objDiv!=null){
           objDiv.scrollTop = objDiv.scrollHeight
        }

    }, [contactActive])
    
    useEffect(() => {

        if(objDiv!=null){
            objDiv.scrollTop = objDiv.scrollHeight
         }
    }, [value.messagerie])
    
   

    return (
        <MessageList id="messageList">
            {value.messagerie?.map((msg,index)=>(msg.destinataire===contactActive|| msg.expediteur===contactActive)&&(
                <>{msg.destinataire===contactActive?
                    <><MessageCard key={msg.message+index}>{msg.message}</MessageCard> {(value.messagerie?.[index+1]?.lu !==msg.lu && msg.destinataire===contactActive) && <Lu>{msg.lu?'Lu':'Envoyé'}</Lu>}</>:
                    <MessageCard receive key={msg.message+index}>{msg.message}</MessageCard>
                    }</>))}
        </MessageList>
    )
}