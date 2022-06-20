import React, {useEffect, useState} from "react"
import InfosTable from './InfosTable'
import { ItemProps } from '../dashboard'

import styled, { css } from 'styled-components'
import {Theme} from '../index'
import { MenuContext } from "../dashboard";
import { State } from "../dashboard";

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

export const AdminInfos= ( )=> {
    const value = React.useContext (MenuContext) as State;
    return (
        <div>   
            <BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Infos</CardTitle>
                    </TopTitle>
                <InfosTable />
                </CardContent>
            </BigCard>

        </div>
    )
}