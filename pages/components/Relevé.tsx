
import React, { useEffect, useState } from "react"
import EnhancedTable from "./Table";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CoproData } from "../dashboard";
import {Card,Title} from './Finance'
import { CoProType } from "../dashboard";
import { MenuContext } from "../dashboard";
import { State } from "../dashboard";

export const Releve=()=> {
    const copro = React.useContext (CoproData) as CoProType;
    const value = React.useContext (MenuContext) as State;

    const [monthSelected,setMonthSelected]=useState<string|null>()
    
    useEffect(() => {
        if(copro.data && copro.data.finances){
            setMonthSelected(Object.keys(copro.data.finances.relevé[copro.data.finances.relevé.length-1]).toString())
        }
    }, [])
    
    function changeMonth(month:object) {
        setMonthSelected(Object.keys(month).toString()) 
    }
    const handleChange = (event: any) => {
        setMonthSelected(event.target.value);
      };
    return(
        <Card style={{marginTop:'50px',marginBottom:'6px'}}>
            <Title style={{marginBottom:'30px'}}><i className="fa-solid fa-money-bill-transfer"></i>    Relevé de compte </Title>
                {value.windowSize >768 ?<ButtonGroup style={{alignSelf:'flex-start',marginBottom:'30px'}}variant="outlined" aria-label="outlined button group">
                    {(copro.data && copro.data.finances) && copro.data.finances.relevé.map((month:object,index:number)=><Button variant={monthSelected===Object.keys(month).toString() ?"contained" : "outlined"} onClick={()=>changeMonth(month)} key={index}>{Object.keys(month)as Array<keyof typeof month>[0]}</Button>)}
                </ButtonGroup>:
                <FormControl sx={{ m: 1, minWidth: 120,alignSelf:'flex-start' }}>
                    <InputLabel >Mois</InputLabel>
                    <Select
                    value={monthSelected}
                    label="Month"
                    onChange={handleChange}
                    >
                    {(copro.data && copro.data.finances) && copro.data.finances.relevé.map((month:object,index:number)=><MenuItem key={index} value={Object.keys(month).toString()}>{Object.keys(month)as Array<keyof typeof month>[0]}</MenuItem>)}


                    </Select>
                </FormControl>}
                {monthSelected && <EnhancedTable monthSelected={monthSelected} />}
        </Card>
    )
    
}