import React, {useEffect, useState} from "react"
import IncidentsAdminTable from './IncidentsAdminTable'
import { ItemProps } from '../../../pages/dashboard'
import ChangeDescriptionIncident from './ChangeDescriptionIncident'
import IncidentDelete  from "./IncidentDeleted"
import styled, { css } from 'styled-components'
import {Theme} from '../../../pages/index'

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
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    max-height:500px;
    min-height:500px;

    ${(props:ItemProps) => props.primary && css`
        border:1px solid;
        border-color:${(props:Theme)=>props.theme.tertiary};

    `}  
    @media screen and (max-width:470px){
        border:none;
        
        border-radius:0;
        box-shadow:none;

        border-color:${(props:Theme)=>props.theme.tertiary};  
    }
`


type IdProps ={
    _id:string
}

type Modify= {
    _id:string,
    description:string,
    message:string,
}

 const AdminIncidents= ( )=> {
    const [incidentToDelete, setIncidentToDelete] = useState<IdProps|null>(null);
    const [incidentUpdated, setIncidentUpdated] = useState<boolean|null>(false);
    const [incidentToModify, setIncidentToModify] = useState<Modify|null>();

    return (
        <div>   
        {incidentToModify && <ChangeDescriptionIncident setIncidentUpdated={setIncidentUpdated} setIncidentToModify={setIncidentToModify} incidentToModify={incidentToModify} />}
        {incidentToDelete && <IncidentDelete incidentToDelete={incidentToDelete} setIncidentUpdated={setIncidentUpdated} setIncidentToDelete={setIncidentToDelete} />}


            <BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Incidents</CardTitle>
                    </TopTitle>
                    <IncidentsAdminTable setIncidentToModify={setIncidentToModify}  setIncidentToDelete={setIncidentToDelete} setIncidentUpdated={setIncidentUpdated} incidentUpdated={incidentUpdated} />
                </CardContent>
            </BigCard>

        </div>
    )
}

export default AdminIncidents