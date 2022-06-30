import React, { useState} from 'react';
import styled, { css } from 'styled-components'
import Button  from '../../Button';
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


const InputContainer=styled.div `
    display:flex;
    flex-direction:column;
    row-gap:15px;
`

type Props ={
    setCreateNewYear:(value:boolean)=>void,
    setNewYearCreated:(value:boolean)=>void
}

 const NewYearForm = ({setCreateNewYear,setNewYearCreated}:Props) => {

    const date= new Date()
    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [year, setYear] = useState(date.getFullYear());
    const [solde, setSolde] = useState<number|null>(null);

 
      
      function submit(){
        setErrorMessage(null)
        setConfirmed(false)
        const user= JSON.parse(localStorage.getItem("user")||'')
        const token="Bearer " + user.token
        const headers = {
          "content-type": "application/json",
            "Authorization": token,
        };
        let requestOptions={}
      {solde ?  ( requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ 
                query:` mutation{
                createYearFinance(finances:{year:${year},solde:${solde},actuel:${solde}}){               
                    year
              }
            }`
          })
        }):(
             requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 
                    query:` mutation{
                    createYearFinance(finances:{year:${year}}){               
                        year
                  }
                }`
              })}
        )}

        fetch('http://localhost:4000/graphql', requestOptions)
            .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .then(()=>setNewYearCreated(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Ajout nouvelle année</Title>
                <i onClick={()=>setCreateNewYear(false)}className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>

                    <TextField
                        id="outlined-name"
                        label="Année"
                        value={year}
                        type="number"
                        onChange={(event)=>setYear(Number(event.target.value))}
                    />
                    <TextField
                        id="outlined-name"
                        label="Solde"
                        value={solde}
                        type="number"

                        onChange={(event)=>setSolde(Number(event.target.value))}
                    />
             
            
                    <Button primary onClick={()=>submit()} label="Valider"/>
                </InputContainer>}
                <div> { confirmed && <Alert severity="success">Nouvelle année créée !</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }

  export default NewYearForm