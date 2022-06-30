
import React, { useState} from "react"
import styled from 'styled-components'
import {Theme} from '../../pages/index'
import { CoproData } from "../../pages/dashboard";
import { CoProType } from "../../pages/dashboard";
import  MessageSender  from "./MessageSend";
import Messages from './MessageList'
import { UserType} from '../../pages/dashboard'
import { UserData } from "../../pages/dashboard";
import Contact from './Contact'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuContext } from "../../pages/dashboard";
import { State } from "../../pages/dashboard";

const Container=styled.div `
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

const Messagerie=() => {
    
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
                {copro.data?.contacts?.map(personne=>personne.name !==userValue.user?.name && <>{personne.name===contactActive ?
                <Contact active={true} personne={personne.name}/>:<Contact handleActive={handleActive} active={false} personne={personne.name} />}</>)}
            </ContactList>:
            <FormControl sx={{ m: 1, minWidth: 120,alignSelf:'flex-start',marginBottom:'15px' }}>
                <InputLabel >Contact</InputLabel>
                <Select
                value={contactActive}
                label="Month"
                onChange={handleChange}
                >
                {copro.data?.contacts?.map((personne,index:number)=>personne.name !==userValue.user?.name && <MenuItem key={index} value={personne.name}><Contact active={true} personne={personne.name} /></MenuItem>)}


            </Select>
        </FormControl>}
            <MessageContainer>
                <Messages contactActive={contactActive}/>
                <MessageSender contactActive={contactActive}/>
            </MessageContainer>
        </Container>
    )
}

export default Messagerie