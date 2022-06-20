
import React, { useState, useEffect} from "react"
import styled, { css } from 'styled-components'
import {Theme} from '../index'
import { CoproData } from "../dashboard";
import { CoProType } from "../dashboard";
import { MessageSender } from "./MessageSend";
import {Messages} from './MessageList'
import { UserType} from '../dashboard'
import { UserData } from "../dashboard";
import {Contact} from './Contact'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuContext } from "../dashboard";
import { State } from "../dashboard";

const Container=styled.div `
    border:1px solid;
    border-color:${(props:Theme)=>props.theme.tertiary};    
    width:100%;
    height:80%;
    border-radius:15px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    display:flex;
    @media screen and (max-width:768px){
       border:none;
       border-radius:0;
       box-shadow:none;
       flex-direction:column;
       height:75%;
    }
`

const ContactList=styled.div `
    flex:1;
    height:100%;
    border-radius:15px 0 0 15px;
    background-color:${(props:Theme)=>props.theme.secondary};
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:30px 5px ;
    row-gap:30px;
    y-overflow:auto;
    @media screen and (max-width:768px){
        padding:10px 0;
        row-gap:10px;
        border-radius:0
    }
`


const MessageContainer=styled.div`
    flex:3;
    height:100%;
    display:flex;
    flex-direction:column;
    `

export const Messagerie=() => {
    
    const userValue = React.useContext (UserData) as UserType;
    const copro = React.useContext (CoproData) as CoProType;
    const value = React.useContext (MenuContext) as State;

    const [contactActive,setContactActive]=useState<string>()

    const handleActive=(person:string)=> {
        setContactActive(person)
    }
    const handleChange = (event: any) => {
        setContactActive(event.target.value);
      };
    

    
    

    return(
        <Container>
          {value.windowSize >768 ?<ContactList>
                {copro.data?.proprio?.map(personne=>personne !==userValue.user?.name && <>{personne===contactActive ?
                <Contact active={true} personne={personne}/>:<Contact handleActive={handleActive} active={false} personne={personne} />}</>)}
            </ContactList>:
            <FormControl sx={{ m: 1, minWidth: 120,alignSelf:'flex-start',marginBottom:'15px' }}>
                <InputLabel >Contact</InputLabel>
                <Select
                value={contactActive}
                label="Month"
                onChange={handleChange}
                >
                {copro.data?.proprio?.map((personne:string,index:number)=>personne !==userValue.user?.name && <MenuItem key={index} value={personne}><Contact active={true} personne={personne} /></MenuItem>)}


            </Select>
        </FormControl>}
            <MessageContainer>
                <Messages contactActive={contactActive}/>
                <MessageSender contactActive={contactActive}/>
            </MessageContainer>
        </Container>
    )
}