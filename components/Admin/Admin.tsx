import React, {useEffect, useState} from "react"
import  AdminUsers  from './Users/AdminUsers'
import  AdminInfos  from "./Infos/AdminInfos";
import AdminIncidents  from "./Incidents/AdminIncidents";
import  AdminFinance  from "./Finance/AdminFinance";
import AdminProvisions  from "./Provisions/AdminProvisions";
import styled, { css } from 'styled-components'


const Container=styled.div `
  row-gap:20px;
  display:flex;
  flex-direction:column;

  width:100%;
  padding-bottom:50px;


`

const Admin=()=> {

  
    return (
      <Container >
        <AdminUsers />
        <AdminInfos />
        <AdminIncidents />
        <AdminFinance />
        <AdminProvisions />
      </Container>
    )
}

export default Admin