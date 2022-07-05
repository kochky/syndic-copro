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
const InputContainer=styled.div `
    display:flex;
    flex-direction:column;
    row-gap:15px;
`

type Props = {
    provisionToModify:User|null,
    setProvisionUpdated:(value:boolean)=>void
    setProvisionToModify:(value:User|null)=>void

}
type User= {
    year:number,
    montant:number
    name:string
}


const ProvisionModify = ({provisionToModify,setProvisionUpdated,setProvisionToModify}:Props) => {


    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [year, setYear] = useState(provisionToModify?.year);
    const [montant, setMontant] = useState(provisionToModify?.montant);

   
    

    const handleChange = (props:string,event:any) => {
        switch(props){
            case "year":
                setYear(event.target.value);
                break;
            case "montant":
                setMontant(event.target.value);
                break;
      
        }
      };
      function submit(){
          console.log(provisionToModify)
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
                modifyProvision(user:{name:"${provisionToModify?.name}",year:${year},oldMontant:${provisionToModify?.montant},montant:${montant}}){
                    name
                }
                            
              
            }`
          })
      };
      fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
          .then(response => response.json())
            .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
            .then(()=>setProvisionUpdated(true))
            .catch(error=>setErrorMessage(error))
    }

    return(
        <Bg >
            <Modal>
                <Title> Modifier provision</Title>
                <i onClick={()=>setProvisionToModify(null)}className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>
                    <TextField
                        id="outlined-name"
                        label="Année"
                        value={year}
                        onChange={(event)=>handleChange("year",event)}
                        type="number"
                    />
                    <TextField
                        id="outlined-name"
                        label="Montant"
                        value={montant}
                        type="number"
                        onChange={(event)=>handleChange("montant",event)}
                    />
                    <Button primary onClick={()=>submit()} label="Valider"/>
                </InputContainer>}
                <div> { confirmed && <Alert severity="success">Provision modifiée !</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }

  export default ProvisionModify