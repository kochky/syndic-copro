import React, { useEffect,useState} from 'react';
import styled, { css } from 'styled-components'
import  Button  from '../../Button';
import TextField from '@mui/material/TextField';
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
const Link=styled.div `
    color:${(props:Theme)=>props.theme.tertiary};
    font-family:"Gotham book";
    cursor:pointer;
    height:20px;
    &:hover {
        border-bottom:1px solid;
    }
    @media screen and (max-width:475px){
        font-size:12px;

    }

`
const InputContainer=styled.div `
    display:flex;
    flex-direction:column;
    row-gap:15px;
`

type IncidentProps={
    _id:string,
    message:string,
    description:string
}
type Props= {
    incidentToModify:IncidentProps|null,
    setIncidentToModify:(value:IncidentProps|null)=>void
    setIncidentUpdated:(value:boolean|null)=>void
}

const ChangeDescriptionIncident = ({incidentToModify,setIncidentToModify,setIncidentUpdated}:Props) => {


    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [description, setDescription] = useState<string|undefined>(incidentToModify?.description);
    const [message, setMessage] = useState(incidentToModify?.message);

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
                updateIncident(incidents:{_id:"${incidentToModify?._id}",messageAdmin:"${message}",description:"${description}"}){
                    description
                }
            }`
          })
      };
      const apiUrl = process.env.NODE_ENV === 'production' ? process.env.FETCH_URL_PROD : process.env.FETCH_URL_DEV
      fetch(apiUrl||'', requestOptions)
            .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .then(()=>setIncidentUpdated(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Modifier description</Title>
                <i onClick={()=>setIncidentToModify(null)} className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>

                    <TextField
                        id="outlined-name"
                        label="Description"
                        value={description}
                        onChange={(event)=>setDescription(event.target.value)
                        }
                    />
                        <TextField
                        id="outlined-name"
                        label="Message"
                        value={message}
                        onChange={(event)=>setMessage(event.target.value)
                        }
                    />
                    
                    <Button primary onClick={()=>submit()} label="Valider"/>
                </InputContainer>}
                <div> { confirmed && <Alert severity="success">incident modifié !</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }

  export default ChangeDescriptionIncident