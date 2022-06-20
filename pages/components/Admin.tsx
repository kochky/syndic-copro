import React, {useEffect, useState} from "react"
import  { AdminUsers } from './AdminUsers'
import { AdminInfos } from "./AdminInfos";
import { AdminIncidents } from "./AdminIncidents";
export const Admin=()=> {

  
    return (<div>
      <>
      <AdminUsers />
      <AdminInfos />
      <AdminIncidents />
      </>
    </div>)
}