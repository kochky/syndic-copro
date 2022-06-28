import React,{useState} from 'react';
import IncidentTable from './IncidentTable'
import styled, { css } from 'styled-components'
import {Theme} from '../../index'
import { ItemProps } from '../../dashboard'
import { CoproData } from "../../dashboard";
import { CoProType } from "../../dashboard";
import { IncidentCreate } from "./IncidentCreate"

const BigCard=styled.div`
    width:100%;
    height:100%;
`
const CardTitle=styled.h3`
    font-family:"Gotham black";
    color:${(props:Theme)=>props.theme.primary};
    cursor:pointer;
    display:flex;
    align-items:center;
`
const TopTitle=styled.div `
    display:flex;
    justify-content:space-between;
    padding-right: 50px;
    padding-bottom:20px;
    align-items:center;
    border-bottom:1px solid;
    border-color:${(props:Theme)=>props.theme.secondary};
    @media screen and (max-width:425px){
        padding-right:0;
        flex-direction:column;
        row-gap:15px;
    }

`
const CardContent=styled.div`
    background:white;
    padding:15px;
    padding-right:0;
    border-radius:15px;
    margin-bottom:5px;
    @media screen and (max-width:425px){
        border-radius:0;
        box-shadow:none;
    }
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;

    ${(props:ItemProps) => props.primary && css`
        border:1px solid;
        border-color:${(props:Theme)=>props.theme.tertiary};

    `}  
`
const AddIcon=styled.div `
    color:${(props:Theme)=>props.theme.tertiary};
    font-size:14px;
    display:flex;
    align-items:center;
    @media screen and (max-width:425px){
        align-self:flex-start
    }

`
const NoContent=styled.div`
    padding:20px;
    color:${(props:Theme)=>props.theme.tertiary};

`


export const Incident= ()=> {
    const copro = React.useContext (CoproData) as CoProType;
    const [createIncident, setCreateIncident] = useState<boolean>(false);

    return (
        <div>
            {createIncident && <IncidentCreate setCreateIncident={setCreateIncident} />}

            <BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Incident</CardTitle>
                        <AddIcon onClick={()=>setCreateIncident(true)}><i className="fa-solid fa-plus blue"></i>&nbsp;  Signaler un incident</AddIcon>
                    </TopTitle>
                   {(copro.data && copro.data.incident && copro.data?.incident?.length>0 )? <IncidentTable />: <NoContent>Pas d&apos;incident remonté</NoContent>}
                </CardContent>
            </BigCard>
       
       </div>
    )
}