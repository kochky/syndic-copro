import React, {useState} from "react"
import { ItemProps } from '../../../pages/dashboard'
import  CreateProvision  from './ProvisionCreate'
import  ProvisionDelete  from "./ProvisionDelete"
import  ProvisionModify  from "./ProvisionModify"
import ProvisionTable from "./ProvisionTable"

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
const AddIcon=styled.div `
    color:${(props:Theme)=>props.theme.tertiary};
    font-size:14px;
    display:flex;
    align-items:center;
    @media screen and (max-width:425px){
        align-self:flex-start
    }

`



type User= {
    year:number,
    montant:number
    name:string
}


 type IdProps ={
    name:string,
    montant:number
}
const AdminProvisions= ( )=> {
    const [createProvision, setCreateProvision] = useState<boolean>(false);
    const [provisionUpdate, setProvisionUpdated] = useState<boolean>(false);
    const [provisionToDelete, setProvisionToDelete] = useState<IdProps|null>(null);
    const [provisionToModify,setProvisionToModify]=useState<User|null>(null)


    return (
        <div>   
            {createProvision && <CreateProvision setProvisionUpdated={setProvisionUpdated} setCreateProvision={setCreateProvision} />}
            {provisionToDelete && <ProvisionDelete setProvisionUpdated={setProvisionUpdated} setProvisionToDelete={setProvisionToDelete} provisionToDelete={provisionToDelete}/>}
            {provisionToModify && <ProvisionModify setProvisionUpdated={setProvisionUpdated} provisionToModify={provisionToModify} setProvisionToModify={setProvisionToModify} />}

            <BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Provisions</CardTitle>
                        <AddIcon onClick={()=>setCreateProvision(true)}><i className="fa-solid fa-plus blue"></i>&nbsp;  Ajout provision</AddIcon>
                    </TopTitle>
                    <ProvisionTable setProvisionToModify={setProvisionToModify} setProvisionToDelete={setProvisionToDelete} provisionUpdate={provisionUpdate} setProvisionUpdated={setProvisionUpdated}/>
                </CardContent>
            </BigCard>

        </div>
    )
}
export default AdminProvisions