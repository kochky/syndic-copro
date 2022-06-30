/* eslint-disable react-hooks/exhaustive-deps */
import  React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


type Finances= {
  year:number,
  solde:number,
  actuel:number,
  releve:[Releve]
}

type Releve= {
  _id:string,
  date:string,
  description:string,
  type:string,
  recette:number,
  depense:number
}

type Props ={
    yearSelected:number,
    setYearSelected:(value:number)=>void
    financesData:[Finances]|null
}


export default function YearPicking({financesData,yearSelected,setYearSelected}:Props) {

  const handleChange = (event:any) => {
    setYearSelected(event.target.value);
  };


  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={yearSelected}
         
          onChange={handleChange}
        >
        {financesData && financesData.map(année=><MenuItem key={année.year} value={année.year}>{année.year}</MenuItem>
)}
          
        </Select>
      </FormControl>
    </Box>
  );
}