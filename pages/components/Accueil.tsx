/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useState} from "react"
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
import { Text } from './Finance/Finance'
import { UserType} from '../dashboard'
import {Message} from '../dashboard'
import moment from 'moment'
moment.locale("fr")

const CardContainer=styled.div`
        width:100%;
        display:flex;
        justify-content:space-between;
        column-gap:50px;
        @media screen and (max-width:624px){
            flex-direction:column;
        }
    `
    
    const Card=styled.div`
            padding:15px;
            border-radius:15px;
            margin-bottom:50px;
            display:flex;
            min-height:200px;
            width:100%;
            background-color:white;
            justify-content:space-between;
            box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
                    @media screen and (max-width:425px) {
                box-shadow:none;
                
            };
            border-color:${(props:Theme)=>props.theme.tertiary};
            @media screen and (max-width:425px){
                border-radius:0;
        
                border:none
            }
      
        
  
    `
    const CardSection=styled.div`
        display:flex;
        align-items:center;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:100%;
        padding-left:15px;
        position:relative;


    
    `
    const CardIcon=styled.div`
        display:flex;
        align-items:center;
        flex-direction:column;
        align-items:flex-start;
        justify-content:space-evenly;
        width:120px;
        height:100%;
        @media screen and (max-width:900px){
            width:50px;
        }
    `
    const IconBg=styled.div`
        width:75px;
        background-color:rgba(76,52,255,0.1);
        height:75px;
        max-width:100px;
        display:flex;
        border-radius:15px;
        align-items:center;
        justify-content:center;
        @media screen and (max-width:900px){
            width:50px;
            height:50px;
        }
    `
    const CardContent=styled.div`
        display:flex;
        flex-direction:column;
        width:100%;
        height:80%;
        align-items:flex-start;
        justify-content:center;

    
    `
    const CardTitle=styled.h3`
        font-family:"Gotham black";
        position:absolute;
        top:0;
        color:${(props:Theme)=>props.theme.primary};
        margin-bottom:15px;
        display:flex;
        align-items:center;
        justify-content:flex-start;
        transition:transform 300ms;
        width:100%;
        white-space: nowrap;
        @media screen and (max-width:768px) {
            font-size:16px;
         };
         @media screen and (max-width:425px) {
            font-size:14px;
            padding-left:15px;
         };
        &:hover {     
            ${(props:ItemProps) => props.underline && css`
            text-decoration: underline;
            cursor:pointer;
             }
            }
        `} 
    `
   
    const Info= styled.div`
        height:50px;
        display:flex;
        align-items:center
    `
     type Messages= {
        _id:string,
        expediteur:string,
        destinataire:string,
        message:string,
        lu:boolean,
        date:string
    }
export const Accueil=()=> {

    const copro = React.useContext (CoproData) as CoProType;
    const user = React.useContext (UserData) as UserType;
    const value = React.useContext (MenuContext) as State;
    const msg = React.useContext (MessageData) as MsgType;
    const [messages, setMessages] = useState([]);

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
    let msgArray:any=[]

    useEffect(() => {
        let i=0
        msgArray=[]
        msg.messagerie?.map((msg:Message)=>{
            if (!msg.lu && msg.destinataire===user.user?.name && i<5){
                i++
                msgArray.push(msg)
                }
            }
        )
        setMessages(msgArray)
    }, [msg.messagerie])
    
    return (
        <>  
       { copro.data && <>
        <CardContainer>
            <Card >
                <CardIcon>
                    <IconBg>
                        <i className="fa-solid fa-user blue fa-2xl"></i>
                    </IconBg>

                </CardIcon>
                <CardSection>
                    <CardTitle >Profil</CardTitle>
                    <CardContent primary={true} >
                        <div style={{display:"flex"}}>
                            <Info><Text tertiary={true}>Lot n°</Text><Text>{user.user?.lot}</Text></Info>
                        </div>
                        <div style={{display:"flex"}}>
                        <Info><Text  tertiary={true}>Millième:</Text> <Text>{user.user?.millieme}</Text>  </Info>
                        </div>
                    </CardContent>
                </CardSection>

            </Card>
            <Card >
            <CardIcon>
                    <IconBg>
                        <i onClick={()=>handleActive('message')} className="fa-solid fa-envelope blue fa-2xl"></i>
                    </IconBg>
                </CardIcon>
               <CardSection>
                    <CardTitle underline  onClick={()=>handleActive('message')}> Messages</CardTitle>
                    <CardContent primary={true}>{(msg.newMessage>0 )? <>{messages && messages?.map((msg:Messages)=><Info key={msg._id}><Text tertiary>De {msg.expediteur}</Text><Text style={{display:"block",overflow:'hidden',width:'150px',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} key={msg._id}>{msg.message}</Text></Info>)}</>:<Info><Text >Pas de nouveau message</Text></Info>}</CardContent>
               </CardSection>

            </Card>
        </CardContainer>

        <Card>
            <CardIcon>
                <IconBg>
                    <i className="fa-solid fa-newspaper blue fa-2xl"></i>
                </IconBg>

            </CardIcon>
            <CardSection>

                <CardTitle underline onClick={()=>handleActive('news')}>Actualités</CardTitle>
                <CardContent primary={true} ><>{(copro.data.infos && copro.data?.infos?.length>0 )? <>{copro.data?.infos?.map((info,index)=>index<5 &&<Info key={info}><Text tertiary={true}>{moment(info.date).format("dddd Do/MM")}  </Text><Text> &nbsp;{info.description}</Text></Info>)}</>:<Info><Text>Pas d&apos;actualité...</Text></Info> }</></CardContent>
            </CardSection>

        </Card>
            <Card>
                <CardIcon>
                    <IconBg>
                        <i className="fa-solid fa-triangle-exclamation  blue fa-2xl"></i>
                    </IconBg>
                </CardIcon>
                <CardSection>
                    <CardTitle underline onClick={()=>handleActive('incident')}>Incident</CardTitle>
                    <CardContent  primary={true}>{(value.incidentsPresent) ? <>{copro.data?.incident?.map((item,index)=>(item.messageAdmin!="Résolu" && index<5) && <Info key={item._id}><Text tertiary={true}>{moment(item.date).format("dddd Do/MM")}  </Text><Text style={{display:"block",overflow:'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}}>&nbsp;{item.description}</Text></Info>)}</>:<Info><Text>Pas d&apos;incident</Text></Info>}</CardContent>
                </CardSection>
            </Card>
   
        </>}
        </>
    )
}