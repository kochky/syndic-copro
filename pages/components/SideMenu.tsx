import React, {useEffect, useState} from "react"
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { MenuContext } from "../dashboard";
import {Theme} from '../index'
import { ItemProps } from "../dashboard";
import { State } from "../dashboard";
import { MessageData } from "../dashboard";
import { MsgType } from "../dashboard";
import BasicMenu from './Option'
import Badge from '@mui/material/Badge';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { UserType} from '../dashboard'
import { UserData } from "../dashboard";

const Menu=styled.div `
    background:white;
    width:30%;
    height:100vh;
    min-height:100vh;
    padding-top:50px;
    padding-left:30px;
    padding-right:30px;  
    box-shadow: rgb(159 162 191 / 18%) 2px 0px 3px, rgb(159 162 191 / 32%) 1px 0px 1px;
    @media screen and (max-width:768px) {
        padding-left:5px;
        padding-right:5px;  
    };
    @media screen and (max-width:720px) {
        min-width:50px;
        max-width:50px;
    };
    
`
const Title=styled.h2 `
    color:${(props:Theme)=>props.theme.primary};
    ${(props:ItemProps) => props.black && css`
    color:${(props:Theme)=>props.theme.fourth};
    `}
    margin-bottom:100px;
    height:30px;
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    font-family:"Gotham black";
    @media screen and (max-width:768px) {
        font-size:18px;
    };
    @media screen and (max-width:425px) {
        font-size:16px;
    };
`
const SecondTitle=styled.h3 `
    color:${(props:Theme)=>props.theme.primary};
    font-family:"Gotham black";
    margin-bottom:20px;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    @media screen and (max-width:768px) {
        font-size:14px;
    };
    @media screen and (max-width:425px) {
        font-size:12px;
    };
`
const List=styled.ul `
    display:flex;
    flex-direction:column;
    height:50%;
    @media screen and (max-width:425px) {
        font-size:12px;
    };
`
const Item=styled.li `
    color:${(props:Theme)=>props.theme.tertiary};
    font-family:"Gotham book";
    margin:10px 0;
    padding: 0 10px;
    height:50px;
    line-height:50px;
    border-radius:5px;
    cursor:pointer;
    display:flex;
    align-items:center;
    position:relative;
    ${(props:ItemProps) => props.active && css`
    color: white;
    background-color: ${(props:Theme)=>props.theme.secondary};
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    `}  
    ${(props:ItemProps) => !props.active && css`
    &:hover {
        background:white;
        box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    }
    `}
    @media screen and (max-width:720px) {
        border-radius:0;
        padding:0;
        justify-content:center;
    };
` 



export const SideMenu=()=> {
    const router = useRouter()
    const value = React.useContext (MenuContext) as State;
    const msg = React.useContext (MessageData) as MsgType;
    const user = React.useContext (UserData) as UserType;


    
    const handleActive=(item:string)=>{
        value.setActiveAccueil(false)
        value.setActiveNews(false)
        value.setActiveFinance(false)
        value.setActiveIncident(false)
        value.setActiveMessage(false)
        value.setActiveAdmin(false)
        switch(item){
            case "accueil":
                value.setActiveAccueil(true);
                break;
            case "news":
                value.setActiveNews(true);
                break;
            case "finance":
                value.setActiveFinance(true);
                break;
            case "message":
                value.setActiveMessage(true);
                break;
            case "incident":
                value.setActiveIncident(true);
                break;
            case "admin":
                value.setActiveAdmin(true);
                break;
        }
    }
    
    
    return (
        <Menu>
           {value.windowSize >720 ?<><Title onClick={()=>router.push('/')}><i className="fa-solid fa-arrow-left"></i>&nbsp;Ma Copro&apos;</Title>
            <SecondTitle>Menu <BasicMenu/> </SecondTitle>
                <List>
                    {!value.activeAccueil ? <Item  onClick={()=>handleActive('accueil')}><i className="fa-solid fa-table-columns blue"></i>&nbsp; Accueil</Item> : <Item active={true} ><i className="fa-solid fa-table-columns "></i> &nbsp;Accueil</Item>}
                    {!value.activeNews ? <Item  onClick={()=>handleActive('news')}><i className="fa-solid fa-newspaper blue"></i> &nbsp;Actualités</Item> :<Item active={true}><i className="fa-solid fa-newspaper "></i> &nbsp;Infos</Item>}
                    {!value.activeFinance ? <Item onClick={()=>handleActive('finance')}><i className="fa-solid fa-coins blue"></i> &nbsp;Finances</Item>: <Item active={true}><i className="fa-solid fa-coins "></i> &nbsp;Finances</Item>}
                    {!value.activeMessage ? <Item onClick={()=>handleActive('message')}> <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left', }} badgeContent={msg.newMessage} color="success" > <MailOutlineIcon color='action' /></Badge> &nbsp;Messagerie </Item>: <Item active={true}><Badge anchorOrigin={{ vertical: 'top', horizontal: 'left', }} color="success" badgeContent={msg.newMessage}className="white-bg" > <MailOutlineIcon  /></Badge> &nbsp;Messagerie</Item>}
                    {!value.activeIncident ? <Item onClick={()=>handleActive('incident')}><i className="fa-solid fa-triangle-exclamation blue"></i> &nbsp;Incident</Item>:<Item active={true}><i className="fa-solid fa-triangle-exclamation "></i> &nbsp;Incident</Item>}
                    {user.user?.admin &&   <> {!value.activeAdmin ? <Item onClick={()=>handleActive('admin')}><i className="fa-solid fa-lock blue"></i> &nbsp;Admin</Item>:<Item active={true}> <i className="fa-solid fa-lock-open"></i> &nbsp;Admin</Item>}</>}
                </List> </> :(
           <div style={{display:"flex",justifyContent:"center"}}>
                <List>   
                    <Item><i className="fa-solid fa-arrow-left fa-xl"></i></Item>
                    <Item><BasicMenu/></Item>
                    {!value.activeAccueil ? <Item  onClick={()=>handleActive('accueil')}><i className="fa-solid fa-table-columns blue fa-xl"></i> </Item> : <Item active={true} ><i className="fa-solid fa-table-columns fa-xl"></i> </Item>}
                    {!value.activeNews ? <Item  onClick={()=>handleActive('news')}><i className="fa-solid fa-newspaper blue fa-xl"></i> </Item> :<Item active={true}><i className="fa-solid fa-newspaper fa-xl "></i> </Item>}
                    {!value.activeFinance ? <Item onClick={()=>handleActive('finance')}><i className="fa-solid fa-coins blue fa-xl"></i> </Item>: <Item active={true}><i className="fa-solid fa-coins fa-xl"></i> </Item>}
                    {!value.activeMessage ? <Item onClick={()=>handleActive('message')}>  <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left', }} badgeContent={msg.newMessage} color="success" > <MailOutlineIcon color='action' /></Badge> </Item>: <Item active={true}> <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left', }} color="success" badgeContent={msg.newMessage}className="white-bg" > <MailOutlineIcon  /></Badge></Item>}
                    {!value.activeIncident ? <Item onClick={()=>handleActive('incident')}><i className="fa-solid fa-triangle-exclamation blue fa-xl"></i> </Item>:<Item active={true}><i className="fa-solid fa-triangle-exclamation fa-xl"></i> </Item>}
                    {user.user?.admin &&   <> {!value.activeAdmin ? <Item onClick={()=>handleActive('admin')}><i className="fa-solid fa-lock blue"></i></Item>:<Item active={true}> <i className="fa-solid fa-lock-open"></i></Item>}</>}

                </List>
            </div>    
      )}
        </Menu>

    )
}