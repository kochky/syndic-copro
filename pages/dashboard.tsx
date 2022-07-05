/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import moment from 'moment'
import 'moment/locale/fr'
import  SideMenu  from "../components/SideMenu"
import Accueil  from "../components/Accueil"
import  Finance  from '../components/Finance/Finance'
import  Infos  from "../components/Info/Infos"
import  Login  from "../components/Login"
import Incident  from "../components/Incidents/Incident"
import Messagerie  from "../components/Messagerie/Messagerie"
import styled, { css } from 'styled-components'
import {ThemeProvider} from "styled-components"
import { theme } from "."
import {Theme} from './index'
import  Password  from '../components/Password'
import  Admin  from '../components/Admin/Admin'
import Spinner from '../components/Spinner'
import Script from 'next/script'

moment.locale("fr")
export const UserData = React.createContext<UserType|null>(null);
export const MessageData = React.createContext<MsgType|null>(null);
export const CoproData = React.createContext<CoProType|null>(null);
export const MenuContext = React.createContext<State|null>(null);


export type ItemProps ={
    active?: boolean;
    black?:boolean;
    primary?:boolean;
    size?:number;
    tertiary:boolean;
    secondary:boolean;
    big:boolean;
    minify:boolean;
    white?:boolean;
    underline?:boolean,
    small:boolean,
    year:boolean,
}
type Provision= {
    montant:number,
    paid:boolean,
    year:number
}
 type User= {
    token:string,
    email:string ,
    name: string ,
    lot:number,
    millieme:string,
    provision?:Provision[],
    password?:string,
    _id?:string,
    admin:boolean
}
type Releve={
    _id:string,
    date:string,
    description:string,
    type:string,
    recette:number,
    depense:number
}

type Finance ={
    _id:string,
    year:number,
    solde:number,
    actuel:number,
    releve:Releve[]
}
type News = {
    date:string,
    description:string,
    status:string,
    _id:string,
}
type Incidents = {
    date:string,
    description:string,
    status:string,
    messageAdmin:string,
    _id:string,
}
type Contacts={
    _id:string,
    name:string
}
 type Data= {
    infos?:News[] ,
    finances?: Finance[] ,
    incident?:Incidents[],
    contacts?:Contacts[]
  };

 export type Message= {
    _id:string,
    expediteur:string,
    destinataire:string,
    message:string,
    lu:boolean,
    date:string
}

export type CoProType= {
    data:Data|null,
    setData:(value:Data|null)=>void,
}
export type UserType= {
    user:User|null,
    setUser:(value:User|null)=>void,
}

export type MsgType={
    messagerie:Message[]|null,
    setMessagerie:(value:any)=>void,
    newMessage:number,
    setNewMessage:(value:number)=>void,
    setUpdateMessages:(value:boolean)=>void
    updateMessages:boolean
}
export type IdProps ={
    _id:string
}


export type State= {
    activeAccueil:boolean,
    activeNews:boolean,
    activeFinance:boolean,
    activeMessage:boolean,
    activeIncident:boolean,
    activeAdmin:boolean,
    setActiveAccueil:(value:boolean)=>void,
    setActiveNews:(value:boolean)=>void,
    setActiveFinance:(value:boolean)=>void,
    setActiveMessage:(value:boolean)=>void,
    setActiveIncident:(value:boolean)=>void,
    setActiveAdmin:(value:boolean)=>void,
    windowSize:number,
    setChangePassword:(value:boolean)=>void,
    incidentsPresent:boolean,
    setIncidentsPresent:(value:boolean)=>void,
    isLogged:boolean,
    setIsLogged:(value:boolean)=>void
}

const Container=styled.div `
    display:flex;
    justify-content:center;
    max-height:100vh;
    width:100%;
    background-color:whitesmoke;
    overflow:hidden;
    box-shadow: rgb(159 162 191 / 18%) 0px 0px 5px, rgb(159 162 191 / 32%) 0px 0px 2px;
`
const Main=styled.div `
    padding:5% 5%;
    width:100%;
    display:flex;
    flex-wrap:no-wrap;
    flex-direction:column;
    height:90vh;
    padding-bottom:50px;
    justify-content:flex-start;
    min-height:540px;
    box-sizing:border-box;
    overflow:auto;
    @media screen and (max-width:425px) {
        padding:0;
    };  
`
const Header=styled.div `
    display:flex;
    justify-content:space-evenly;
    height:10vh;
    padding-top:30px;
    border-radius 0 0 15px 15px;
    padding:0px 5%;
    background-image:url("/offers_banner.png");
    background-repeat:no-repeat;
    background-position:right bottom;
    background-size:100%;
    @media screen and (max-width:940px) {
        flex-direction:column;
    }; 
`

const Title=styled.h2 `
    color:${(props:Theme)=>props.theme.primary};
    ${(props:ItemProps) => props.black && css`
        color:${(props:Theme)=>props.theme.fourth};
    `}
    ${(props:ItemProps) => props.white && css`
        color:white;
    `}
    height:100%;
    display:flex;
    align-items:center;
    font-family:"Gotham black";
    @media screen and (max-width:768px) {
        font-size:22px;
    };
    @media screen and (max-width:425px) {
        font-size:16px;
    };
`

const Date=styled.h3 `
    color:${(props:Theme)=>props.theme.tertiary};
    font-family:"Gotham black";
    height:100%;
    display:flex;
    align-items:center;
    @media screen and (max-width:768px) {
        font-size:16px;
    };
    @media screen and (max-width:425px) {
        font-size:12px;
    };
`



const Dashboard=()=> {
    const [user,setUser]=useState<User|null>(null)
    const [data,setData]=useState<Data|null>(null)
    const [messagerie,setMessagerie]=useState<Message[]|null>(null)
    const [newMessage,setNewMessage]=useState<number>(0)
    const [windowSize, setWindowSize] = useState<number>(0);
    const [activeAccueil,setActiveAccueil]=useState<boolean>(true)
    const [activeNews,setActiveNews]=useState<boolean>(false)
    const [activeFinance,setActiveFinance]=useState<boolean>(false)
    const [activeMessage,setActiveMessage]=useState<boolean>(false)
    const [activeIncident,setActiveIncident]=useState<boolean>(false)
    const [activeAdmin,setActiveAdmin]=useState<boolean>(false)
    const [changePassword,setChangePassword]=useState<boolean>(false)
    const [meteo,setMeteo]=useState<string>('')
    const [incidentsPresent, setIncidentsPresent] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [updateMessages, setUpdateMessages] = useState(true);

  
    const Meteo=styled.div `
        background:url("${meteo}");
        height:30px;
        width:30px;
        background-size:cover;
        margin-left:10px;
    `
  
    useEffect(() => {
        function handleResize() {
          setWindowSize(window.innerWidth);
        }
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); 


    useEffect(() => {
        user && setInterval(checkNewMessage, 5000) 
        if(!user){
            clearInterval(setInterval(checkNewMessage, 5000) )
            }
    }, [user])
      

    useEffect(() => {
        fetch("https://prevision-meteo.ch/services/json/marseille")
        .then (r=>r.json())
        .then(r=>setMeteo(r.current_condition.icon||''))

        if (localStorage.getItem('user') ) {
            const user= JSON.parse(localStorage.getItem("user")||'')
            const token="Bearer " + user.token
            const headers = {
              "content-type": "application/json",
                "Authorization":token ,
            };
            
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 
                    query:` {
                        infosNoAdmin{
                            _id
                            date
                            description    
                        }
                        incidentsNoAdmin{
                            _id
                            date
                            description
                            messageAdmin                        
                        }
                        finances {
                            _id
                            year
                            solde
                            actuel
                            releve {
                                _id
                                date
                                description
                                type
                                recette
                                depense
                            }
                        }
                        contacts {
                            _id
                            name
                        }
                        userInfo {
                            token
                            userId
                            name
                            email
                            lot
                            millieme
                            provision{
                                year
                                montant
                                paid
                            }
                            admin
                        }
                    }`
                })
            };
            setUser(user)
            fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
            .then(response => response.json())
            .then(response=>{if(!response.errors) {
                if(!isLogged){
                    localStorage.setItem("user",JSON.stringify(response.data.userInfo)||'')
                    setUser(response.data.userInfo)
                }
                setData({...data,infos:response.data.infosNoAdmin,incident:response.data.incidentsNoAdmin,finances:response.data.finances,contacts:response.data.contacts}) 
                response.data.incidentsNoAdmin.map((incident:Incidents)=>incident.messageAdmin!="Résolu" && setIncidentsPresent(true))
            }})
            .catch(error=>console.log(error))

        }
      }, [isLogged])


      function checkNewMessage(){
        if (localStorage.getItem('user') ) {
            const user= JSON.parse(localStorage.getItem("user")||'')
            const token="Bearer " + user.token
            const headers = {
            "content-type": "application/json",
                "Authorization":token ,
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 
                    query:` {
                        messages{
                            _id
                            message
                            expediteur
                            destinataire
                            lu
                            date
                        }
                    }`
                })
            };

            fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
            .then(response => response.json())
                .then(response=>{if(!response.errors) {
                    setMessagerie(response.data.messages)
                    setUpdateMessages(false)
                }})
           }
      }

      useEffect(() => {
        if (updateMessages ) {
            checkNewMessage() 
        }
      }, [updateMessages])
      
      useEffect(() => {
       if(messagerie){   setNewMessage(0)
          messagerie?.map(chat=>(chat.lu===false && chat.destinataire===user?.name) && setNewMessage(prevState=>prevState+1))}
      }, [messagerie])

    return(
        <ThemeProvider  theme={theme}>
          <MenuContext.Provider  value={{isLogged:isLogged,setIsLogged:setIsLogged,incidentsPresent:incidentsPresent,setIncidentsPresent:setIncidentsPresent,activeAdmin:activeAdmin,setActiveAdmin:setActiveAdmin,setChangePassword:setChangePassword,windowSize:windowSize,activeAccueil:activeAccueil,activeNews:activeNews,activeFinance:activeFinance,activeIncident:activeIncident,activeMessage:activeMessage,setActiveAccueil:setActiveAccueil,setActiveFinance:setActiveFinance,setActiveIncident:setActiveIncident,setActiveMessage:setActiveMessage,setActiveNews:setActiveNews}}>
           <Container>
           <Script src="https://kit.fontawesome.com/3b79fd5521.js" strategy="lazyOnload" />
                <CoproData.Provider  value={{data:data,setData:setData}}>
                <UserData.Provider  value={{user:user,setUser:setUser}}>
                <MessageData.Provider  value={{setMessagerie:setMessagerie,messagerie:messagerie,newMessage:newMessage,setNewMessage:setNewMessage,setUpdateMessages:setUpdateMessages,updateMessages:updateMessages}}>
                {!user && <Login  />}
                {changePassword && <Password  />}
        
                {(user && (!data || !messagerie)) &&<div style={{height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}><Spinner /></div> }
                {(user && data && messagerie) &&
                    <>
                    <SideMenu/>
                    <div style={{width:'100%'}}>
                        <Header>
                            <Title black>Bonjour {user.name} 👋</Title>
                                <Date>{moment().format('dddd LL ')} <Meteo></Meteo> </Date>
                            </Header>
                        <Main >
                        
                        {activeAccueil &&(
                            <Accueil  />
                                )}
                            {activeNews && (
                                <Infos />
                            )}
                            {activeFinance &&
                                <Finance/>
                            }
                            {activeMessage &&
                                <Messagerie/>
                            }
                            {activeIncident &&
                                <Incident />
                            }
                            {activeAdmin &&
                                <Admin />
                            }
                        </Main>
                    </div>
                    </>
                    }
                </MessageData.Provider>
                </UserData.Provider>
                </CoproData.Provider>
            </Container>
            </MenuContext.Provider>
  
        </ThemeProvider>
    
    )
}

export default Dashboard