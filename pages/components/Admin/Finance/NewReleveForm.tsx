import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button } from '../../Button';
import TextField from '@mui/material/TextField';
import {Theme} from '../../../index'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    setCreateReleve:(value:boolean)=>void,
    setReleveCreated:(value:boolean)=>void,
    yearSelected:number
}

type PropsSelect= {
    type:string,
    setType:(value:string)=>void
}

export default function BasicSelect({type,setType}:PropsSelect) {
  
    const handleChange = (event:any) => {
      setType(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="PRLV">PRLV</MenuItem>
            <MenuItem value="VIR">VIR</MenuItem>
            <MenuItem value="Chèque">Chèque</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

export const NewReleveForm = ({setCreateReleve,setReleveCreated,yearSelected}:Props) => {

    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [description, setDescription] = useState<string|null>();
    const [date, setDate] = useState<string|null>();
    const [type, setType] = useState<string>("PRLV");
    const [recette, setRecette] = useState<number|null>();
    const [depense, setDepense] = useState<number|null>();
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue:any) => {
      setValue(newValue);
    };
   
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
            createReleve(finances: {year:${yearSelected},date:"${date}",description:"${description}",type:"${type}",recette:${recette},depense:${depense}}){
                year
                solde
                actuel
            }
            }`
        })
    };

    fetch('http://localhost:4000/graphql',requestOptions )
        .then(response => response.json())
        .then(r=>console.log(r.data.createReleve))
        // .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
        .then(()=>setReleveCreated(true))
        .catch(error=>setErrorMessage(error))
    }

    useEffect(() => {
        if(recette){
            setDepense(0)
        }
        if(depense){
            setRecette(0)
        }
    }, [recette,depense])
    
  

    return(
        <Bg >
            <Modal>
                <Title> Ajout relevé</Title>
                <i onClick={()=>setCreateReleve(false)}className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>

                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        sx={{ width: 220 }}
                        value={date}
                        onChange={(event)=>setDate(event.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />        
                    <TextField
                        id="outlined-name"
                        label="Description"
                        value={description}
                        onChange={(event)=>setDescription(event.target.value)}
                    />
                    <BasicSelect  type={type} setType={setType}/>
                    
                 {depense ?   <TextField
                        id="outlined-name"
                        label="Recette"
                        value={''}
                        disabled
                        type="number"
                        onChange={(event)=>setRecette(Number(event.target.value))}
                    />:
                    <TextField
                    id="outlined-name"
                    label="Recette"
                    value={recette}
                    type="number"
                    onChange={(event)=>setRecette(Number(event.target.value))}
                    />
                    }
                  {recette ?  <TextField
                        id="outlined-name"
                        label="Dépense"
                        value={''}
                        disabled
                        type="number"
                        onChange={(event)=>setDepense(Number(event.target.value))}
                    />:
                    <TextField
                        id="outlined-name"
                        label="Dépense"
                        value={depense}
                        type="number"
                        onChange={(event)=>setDepense(Number(event.target.value))}
                        />
                    }
             
            
                    <Button primary onClick={()=>submit()} label="Valider"/>
                </InputContainer>}
                <div> { confirmed && <Alert severity="success">Nouveau relevé créé!</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }