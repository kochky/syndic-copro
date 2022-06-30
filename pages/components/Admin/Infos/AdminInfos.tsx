import React, { useState} from "react"
import InfosTable from './InfosTable'
import { ItemProps } from '../../../dashboard'
import { InfoDelete } from "./InfoDelete"
import styled, { css } from 'styled-components'
import {Theme} from '../../../index'
import { MenuContext } from "../../../dashboard";
import { State } from "../../../dashboard";

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
    max-height:500px;
    min-height:500px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;

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

export type IdProps ={
    _id:string
}
export const AdminInfos= ( )=> {
    const value = React.useContext (MenuContext) as State;
    const [infoToDelete, setInfoToDelete] = useState<IdProps|null>(null);
    const [infoDeleted, setInfoDeleted] =  useState<boolean>(false);

    return (
        <div>   
            {infoToDelete && <InfoDelete setInfoToDelete={setInfoToDelete} infoToDelete={infoToDelete} setInfoDeleted={setInfoDeleted} />} 

            <BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Infos</CardTitle>
                    </TopTitle>
                    <InfosTable infoDeleted={infoDeleted} setInfoDeleted={setInfoDeleted} setInfoToDelete={setInfoToDelete} />
                </CardContent>
            </BigCard>

        </div>
    )
}