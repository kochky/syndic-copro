import React, { useState} from 'react';
import styled, { css } from 'styled-components'
import Button  from '../../Button';
import {Theme} from '../../../pages/index'
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
    setDeleteReleve:(value:Id|null)=>void,
    setReleveCreated:(value:boolean)=>void,
    deleteReleve:Id,
    yearSelected:number

}



 const ReleveDelete = ({yearSelected,deleteReleve,setReleveCreated,setDeleteReleve}:Props) => {

    
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
                deleteReleve(finances: {year:"${yearSelected}",_id:"${deleteReleve?._id}"}){
               _id
              }
            }`
          })
      };
        fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
            .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .then(data=>setReleveCreated(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Suppression relev??</Title>
                <i onClick={()=>setDeleteReleve(null)}className="fa-solid fa-xmark x fa-lg" ></i>
                {!confirmed && 
                    <div> 
                        <Button onClick={()=>submit()} primary label="Confirmer"/>      
                    </div>
                    }
                <div> { confirmed && <Alert severity="success">Relev?? supprim??!</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }

  export default ReleveDelete