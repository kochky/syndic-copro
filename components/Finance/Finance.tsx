import React, { useState} from "react"
import styled, { css } from 'styled-components'
import {Theme} from '../../pages/index'
import { ItemProps } from '../../pages/dashboard'
import  Releve  from './Relevé'
import  Budget  from './Budget'
import Provision  from './Provision'
import YearPicking from "../Admin/Finance/YearPicking"
import { CoproData } from "../../pages/dashboard";
import { CoProType} from '../../pages/dashboard'

export const Card=styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    align-items:center;
    border-radius:15px;
    justify-content:center;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    background-color:white;
    padding:30px;
    flex:1;
    @media screen and (max-width:470px){
        padding: 30px 0
    }
    @media screen and (max-width:420px){
        padding: 30px 0px;
        
        border-radius:0;
        box-shadow:none;

    }
    ${(props:ItemProps) => props.year && css`
    color:${(props:Theme)=>props.theme.tertiary};
    background: rgba(76,52,255,0.3);
    background: linear-gradient(346deg, rgba(76,52,255,1) 10%, rgba(76,52,255,0.3) 80%);
        `}
`
export const Title=styled.h3`
    font-family:"Gotham black";
    color:${(props:Theme)=>props.theme.primary};

`
export const CardContainer=styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    column-gap:50px;
    flex:1;
    
    
    @media screen and (max-width:1170px){
        flex-direction:column;
        row-gap:50px;
    }
    @media screen and (max-width:425px){
        column-gap:10px;

    }
`
export const CardDiv=styled.div`
    margin:10px 30px;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    width:auto;
    @media screen and (max-width:425px){
        margin:10px;

    }

`
export const CardSection=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    width:100%;
    position:relative;

`
export const Text=styled.div `
    min-width:80px;
    font-family:'Gotham book';
    color:${(props:Theme)=>props.theme.fourth};
    ${(props:ItemProps) => props.tertiary && css`
        color:${(props:Theme)=>props.theme.tertiary};
    `}
    ${(props:ItemProps) => props.secondary && css`
    color:${(props:Theme)=>props.theme.secondary};
    `}   
    ${(props:ItemProps) => props.size && css`
        font-size:${props.size}px;
        @media screen and (max-width:425px){
            font-size:${props.size*0.6}px
        }
    `} 
    @media screen and (max-width:768px){
        font-size:14px
    }
    @media screen and (max-width:425px){
        font-size:12px
    }

`

export const CardTitle=styled.h3`
    font-family:"Gotham black";
    color:${(props:Theme)=>props.theme.primary};
    margin-bottom:50px;
    cursor:pointer;
    @media screen and (max-width:425px){
        margin-bottom:15px;
    }
`
export const Flex=styled.div `
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    width:100%;
`

const Finance=() => {
    const value = React.useContext (CoproData) as CoProType;
    const date= new Date()

    const [yearSelected, setYearSelected] = useState(date.getFullYear());
    
    return (
     <>

      <CardContainer>
        <Provision /> 

        <CardContainer style={{flexDirection:'column',rowGap:"20px"}}>
            <Card style={{flex:0.5}} year>
                <Flex>
                    <CardTitle style={{margin:0}} >Choisir l'année : </CardTitle>
                    {(value.data && value.data.finances) && <YearPicking financesData={value.data?.finances} yearSelected={yearSelected} setYearSelected={setYearSelected} />}
                </Flex>
            </Card>
            <Budget yearSelected={yearSelected} />
            </CardContainer>
        </CardContainer>
        <Releve  yearSelected={yearSelected}/>
    </>
    )
}

export default Finance