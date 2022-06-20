import React from "react"
import styled, { css } from 'styled-components'
import { ItemProps } from "../dashboard";
import {Theme} from '../index'
import { State } from "../dashboard";
import { MenuContext } from "../dashboard";
import { UserData } from "../dashboard";
import { CoproData } from "../dashboard";
import { MessageData } from "../dashboard";
import { CoProType} from '../dashboard'
import { MsgType } from "../dashboard";
import { Text } from './Finance'
import { UserType} from '../dashboard'
import {Message} from '../dashboard'

const CardContainer=styled.div`
        width:100%;
        display:flex;
        justify-content:space-between;
        row-gap:50px;
        @media screen and (max-width:520px){
            flex-direction:column;
        }
    `
    
    const BigCard=styled.div`
        width:100%;
        max-height:500px;
        margin-bottom:50px;
  
    `
    const CardContent=styled.div`
        background:white;
        padding:15px;
        padding-right:0;
        border-radius:15px;
        margin-bottom:5px;
        box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
                @media screen and (max-width:425px) {
            box-shadow:none;
        };

        ${(props:ItemProps) => props.primary && css`
            border:1px solid;
            border-color:${(props:Theme)=>props.theme.tertiary};
            @media screen and (max-width:425px){
                border-radius:0;
                border-left:0;
                border-right:0;
                padding:0px;
            }
        `}  
    `
    const CardTitle=styled.h3`
        font-family:"Gotham black";
        color:${(props:Theme)=>props.theme.primary};
        margin-bottom:10px;
        display:flex;
        align-items:center;
        transition:transform 300ms;
        width:min-content;
        white-space: nowrap;
        @media screen and (max-width:768px) {
            font-size:16px;
         };
         @media screen and (max-width:425px) {
            font-size:14px;
         };
        &:hover {
                
            ${(props:ItemProps) => props.underline && css`
            text-decoration: underline;
            cursor:pointer;


            }
        }
    `} 
        
    `
    const SmallCard=styled.div`
        width:40%;
        @media screen and (max-width:520px){
            width:100%;
        }
    `
    const ContentScroll=styled.div`
        font-family:"Gotham book";
        overflow-y:scroll;
        height:100%;
 
    `
    const Info= styled.div`
        height:50px;
        display:flex;
        align-items:center
    `
    
export const Accueil=()=> {

    const copro = React.useContext (CoproData) as CoProType;
    const user = React.useContext (UserData) as UserType;
    const value = React.useContext (MenuContext) as State;
    const msg = React.useContext (MessageData) as MsgType;

    const handleActive=(item:string)=>{
        value.setActiveAccueil(false)
        value.setActiveNews(false)
        value.setActiveFinance(false)
        value.setActiveIncident(false)
        value.setActiveMessage(false)
        value.setActiveAdmin(false)
        switch(item){
            case "news":
                value.setActiveNews(true);
                break;
    
            case "message":
                value.setActiveMessage(true);
                break;
            case "incident":
                value.setActiveIncident(true);
                break;
        
        }
    }
    return (
        <>  
       { copro.data && <>
        {user.user &&
        <BigCard>
            <CardTitle >Infos</CardTitle>
            <CardContent primary={true} >
                <div style={{display:"flex"}}>
                    <Info><Text tertiary={true}>Lot n°</Text><Text>{user.user.lot}</Text></Info>
                </div>
                <div style={{display:"flex"}}>
                <Info><Text  tertiary={true}>Millième:</Text> <Text>{user.user.millieme}</Text>  </Info>
                </div>

            </CardContent>
        </BigCard>}
        <BigCard>
            <CardTitle underline onClick={()=>handleActive('news')}>Actualités</CardTitle>
            <CardContent primary={true} ><ContentScroll>{(copro.data.infos && copro.data?.infos?.length>0 )? <>{copro.data?.infos?.map((info)=><Info key={info}><Text tertiary={true}>{info.date}  </Text><Text> &nbsp;{info.description}</Text></Info>)}</>:<Info><Text>Pas d&apos;actualité...</Text></Info> }</ContentScroll></CardContent>
        </BigCard>
        <CardContainer>
            <SmallCard>
                <CardTitle underline onClick={()=>handleActive('incident')}>Incident</CardTitle>
                <CardContent  primary={true}>{(value.incidentsPresent) ? <>{copro.data?.incident?.map((item)=>item.messageAdmin!="Résolu" && <Info key={item._id}><Text tertiary={true}>{item.date}  </Text><Text >&nbsp;{item.description}</Text></Info>)}</>:<Info><Text>Pas d&apos;incident</Text></Info>}</CardContent>

            </SmallCard>
            <SmallCard>
                <CardTitle underline  onClick={()=>handleActive('message')}>Nouveaux messages</CardTitle>
                <CardContent  primary={true}>{(msg.newMessage>0 )? <>{msg.messagerie?.map((msg:Message)=>(!msg.lu && msg.destinataire===user.user?.name )&&<Info><Text key={msg.id}>{msg.message}</Text></Info>)}</>:<Info>Pas de nouveau message</Info>}</CardContent>

            </SmallCard>
        </CardContainer>
        </>}
        </>
    )
}