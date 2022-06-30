/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect} from "react"
import styled, { css } from 'styled-components'
import { MessageData } from "../../pages/dashboard";
import { MsgType } from "../../pages/dashboard";
import {Theme} from '../../pages/index'
import moment from 'moment'
moment.locale("fr")
import {Message} from '../../pages/dashboard'

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
    border-radius:0 15px 0 0 ;
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

    color:${(props:Theme)=>props.theme.secondary};
    ${(props:MessageProps) => props.receive && css`
    align-self:flex-start
  `}
`
const Date=styled.div`
    align-self:flex-end;
    margin-bottom:15px;
    padding:0 15px;
     font-size:12px;
    color:${(props:Theme)=>props.theme.tertiary};
    ${(props:MessageProps) => props.receive && css`
    align-self:flex-start
  `}
`

const Messages=({contactActive}:Props)=> {
    const value = React.useContext (MessageData) as MsgType;
    const objDiv = document.getElementById('messageList')as HTMLInputElement | null;


    function readMessage(_id:string){

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
                readMessage(messages: {_id:"${_id}"}){
                    _id
                 
              }
            }`
          })
      };
    
        fetch('http://localhost:4000/graphql', requestOptions)
            .then(response => response.json())
            .then(()=>value.setUpdateMessages(true))
            
            .catch(error=>console.log(error))
    
    }


    useEffect(() => {
        value.messagerie?.map((message:Message)=>message.expediteur===contactActive && readMessage(message._id))
       if(objDiv!=null){
           objDiv.scrollTop = objDiv.scrollHeight
        }

    }, [contactActive,value.updateMessages])
    
    useEffect(() => {

        if(objDiv!=null){
            objDiv.scrollTop = objDiv.scrollHeight
         }
    }, [value.messagerie])
    
   

    return (
        <MessageList id="messageList">
            {value.messagerie?.map((msg,index)=>(msg.destinataire===contactActive|| msg.expediteur===contactActive)&&(
                <>{msg.destinataire===contactActive?
                    <><MessageCard key={msg._id}>{msg.message}</MessageCard><Date>{moment(msg.date).format("Do/MM")}</Date> {(value.messagerie?.[index+1]?.lu !==msg.lu && msg.destinataire===contactActive) && <Lu>{msg.lu?'Lu':'Envoyé'}</Lu>}</>:
                    <><MessageCard receive key={msg._id}>{msg.message}</MessageCard><Date receive>{moment(msg.date).format("Do/MM")}</Date></>
                    }</>))}
        </MessageList>
    )
}

export default Messages