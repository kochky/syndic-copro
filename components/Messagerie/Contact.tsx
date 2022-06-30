import React, { useState, useEffect} from 'react';
import styled, { css } from 'styled-components'
import { MsgType } from "../../pages/dashboard";
import { MessageData } from "../../pages/dashboard";
import {Theme} from '../../pages/index'
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import { UserType} from '../../pages/dashboard'
import { UserData } from "../../pages/dashboard";

interface ContactProps {
    active?:boolean;  
}

interface Props {
    active:boolean,
    personne:string,
    handleActive?:(value:string)=>void,
}
const ContactDiv=styled.div`
    color:white; 
    font-family:"Gotham book";
    height:50px;
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width:100%;
    border-radius:15px;
    @media screen and (max-width:768px){
        height:auto;
        justify-content:flex-start;
        border-radius:0;
        background-color:rgba(0,0,0,0);
        column-gap:10px;

    }
    

    ${(props:ContactProps) => props.active && css`
        background-color:white;
        color:${(props:Theme)=>props.theme.secondary};
        cursor:pointer;
    `}
    @media screen and (max-width:425px){
        font-size:12px;
        border-radius:0;
    }
`

const Contact=({active,personne,handleActive=()=>{}}:Props)=> {
    const msg = React.useContext (MessageData) as MsgType;
    const userInfo = React.useContext (UserData) as UserType;

    const [numberOfMessages,setNumberOfMessages]=useState(0)

    useEffect(() => {
        setNumberOfMessages(0)
        msg.messagerie?.map(message=>(message.expediteur===personne && message.lu===false && message.destinataire===userInfo.user?.name) && setNumberOfMessages(prevState=>prevState+1))
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg.messagerie])


    return(
        <>
        { active ?
            <ContactDiv active key={personne}>
                <Badge  badgeContent={numberOfMessages} color="success">
                    <PersonIcon color="action" />
                </Badge>&nbsp;{personne}</ContactDiv>:
            <ContactDiv onClick={()=>handleActive(personne)}>
                <Badge className="white-bg" badgeContent={numberOfMessages} color="success">
                    <PersonIcon color="action" />
                </Badge>
                &nbsp; {personne}
        </ContactDiv>}
       </>

    )
}

export default Contact