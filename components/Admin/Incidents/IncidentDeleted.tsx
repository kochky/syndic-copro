import React, { useState} from 'react';
import styled, { css } from 'styled-components'
import  Button  from '../../Button';
import {Theme} from '../../../pages/index'
import { MenuContext } from "../../../pages/dashboard";
import { State } from "../../../pages/dashboard";
import Alert from '@mui/material/Alert';


const Bg = styled.div `
    width:100vw;
    height:100vh;
    position:absolute;
    top:0;
    left:0;
    z-index:99;
    display:flex;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,0.2)
`
const Modal=styled.div `
    width:50%;
    background:white;
    border-radius:15px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    row-gap:30px;
    padding:30px;
    position:relative;
    @media screen and (max-width:768px){
        width:80%;

    }
`
const Title=styled.h2 `
    color:${(props:Theme)=>props.theme.primary};
    font-family:"Gotham black";
    @media screen and (max-width:475px){
        font-size:16px;

    }

`
type Id= {
    _id:string
}
type Props ={
    setIncidentToDelete:(value:Id|null)=>void,
    setIncidentUpdated:(value:boolean)=>void,
    incidentToDelete:Id

}



const IncidentDelete = ({setIncidentUpdated,setIncidentToDelete,incidentToDelete}:Props) => {

    const value = React.useContext (MenuContext) as State;

    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    


      function submit(){
        setErrorMessage(null)
        setConfirmed(false)
        const user= JSON.parse(localStorage.getItem("user")||'')
        const token="Bearer " + user.token
        const headers = {
            "content-type": "application/json",
              "Authorization": token,
          };
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ 
            query:` mutation{
              deleteIncident(incidents: {_id:"${incidentToDelete?._id}"}){
               _id
              }
            }`
          })
      };
        fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
            .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .then(()=>setIncidentUpdated(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Suppression incident</Title>
                <i onClick={()=>setIncidentToDelete(null)}className="fa-solid fa-xmark x fa-lg" ></i>
                {!confirmed && 
                    <div> 
                        <Button onClick={()=>submit()} primary label="Confirmer"/>      
                    </div>
                    }
                <div> { confirmed && <Alert severity="success">incident supprimé!</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }

export default IncidentDelete