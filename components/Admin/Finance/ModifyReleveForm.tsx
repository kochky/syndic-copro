import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Button  from '../../Button';
import TextField from '@mui/material/TextField';
import {Theme} from '../../../pages/index'
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

type Releve= {
    _id:string,
    date:string,
    description:string,
    type:string,
    recette:number,
    depense:number
}
type Props ={
    setModifyReleve:(value:Releve|null)=>void,
    setReleveCreated:(value:boolean)=>void,
    yearSelected:number,
    modifyReleve:Releve|null
}

type PropsSelect= {
    type:string|undefined,
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

export const ModifyReleveForm = ({setModifyReleve,setReleveCreated,yearSelected,modifyReleve}:Props) => {

    const [confirmed,setConfirmed]=useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [description, setDescription] = useState<string|undefined>(modifyReleve?.description);
    const [date, setDate] = useState<string|undefined>(modifyReleve?.date);
    const [type, setType] = useState<string|undefined>(modifyReleve?.type);
    const [recette, setRecette] = useState<number|undefined>(modifyReleve?.recette);
    const [depense, setDepense] = useState<number|undefined>(modifyReleve?.depense);

   
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
            changeReleve(finances: {year:${yearSelected},_id:"${modifyReleve?._id}",date:"${date}",description:"${description}",type:"${type}",recette:${recette},depense:${depense}}){
                _id
                year
                releve{
                  description
                  date
                  type
                  recette
                  depense
                }
                
            }
            }`
        })
    };

    fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
        .then(response => response.json())
        .then(data =>data.errors ? setErrorMessage(data.errors[0].message):setConfirmed(true))
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
                <Title> Modifier relevé</Title>
                <i onClick={()=>setModifyReleve(null)}className="fa-solid fa-xmark x fa-lg" ></i>
               {!confirmed && <InputContainer>

                    <TextField
                        id="outlined-name"
                        label="Date"
                        value={date}
                        onChange={(event)=>setDate(event.target.value)}
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
                <div> { confirmed && <Alert severity="success">Relevé modifié !</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>    }  
                </div>
            </Modal>
        </Bg>
    )

  }