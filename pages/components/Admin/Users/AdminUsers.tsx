import React, {useState} from "react"
import UsersTable from './UsersTable'
import { ItemProps } from '../../../dashboard'
import { CreateUsers } from './CreateUsers'
import { ContactDelete } from "./ContactDelete"
import { ModifyUsers} from "./ModifyUsers"

import styled, { css } from 'styled-components'
import {Theme} from '../../../index'


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
const AddIcon=styled.div `
    color:${(props:Theme)=>props.theme.tertiary};
    font-size:14px;
    display:flex;
    align-items:center;
    @media screen and (max-width:425px){
        align-self:flex-start
    }

`
const FormContainer=styled.div`
    overflow:scroll`

type User= {
    token:string,
    email:string ,
    name: string ,
    lot:number,
    millieme:string,
    provision?:object[],
    password?:string,
    _id?:string,
    admin:boolean
}

 type IdProps ={
    _id:string
}
export const AdminUsers= ( )=> {
    const [createUser, setCreateUser] = useState<boolean>(false);
    const [userUpdated, setUserUpdated] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<IdProps|null>(null);
    const [userToModify,setUserToModify]=useState<User|null>(null)


    return (
        <div>   
            {createUser && <CreateUsers setUserUpdated={setUserUpdated} setCreateUser={setCreateUser} />}
            {userToDelete && <ContactDelete setUserUpdated={setUserUpdated} setUserToDelete={setUserToDelete} userToDelete={userToDelete}/>}
            {userToModify && <ModifyUsers setUserUpdated={setUserUpdated} userToModify={userToModify} setUserToModify={setUserToModify} />}

            <BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Utilisateurs</CardTitle>
                        <AddIcon onClick={()=>setCreateUser(true)}><i className="fa-solid fa-plus blue"></i>&nbsp;  Ajout utilisateur</AddIcon>
                    </TopTitle>
                <FormContainer >
                    <UsersTable setUserToModify={setUserToModify} setUserToDelete={setUserToDelete} userUpdated={userUpdated} setUserUpdated={setUserUpdated}/>
                </FormContainer >

                </CardContent>
            </BigCard>

        </div>
    )
}