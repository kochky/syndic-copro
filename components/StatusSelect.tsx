import  React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type IdType ={
    id:string,
    status:string,
    type:string
}

export default function BasicSelect({id,status,type}:IdType) {
  const [value, setValue] = React.useState(status);

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };


  useEffect(() => {
    const user= JSON.parse(localStorage.getItem("user")||'')
    const token="Bearer " + user.token
    const headers = {
      "content-type": "application/json",
        "Authorization": token,
    };
    let requestOptions
    {type==="incidents" ? (requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
            query:` mutation{
            changeStatusIncident(incidents:{_id:"${id}",status:"${value}"}){
                _id
                description
                status
                }
            }`
        })
      }
      ):(
        requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ 
              query:` mutation{
              changeStatusInfos(infos:{_id:"${id}",status:"${value}"}){
                  _id
                  description
                  status
                  }
              }`
          })
        }

      )
    }

    fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
    .then(response => response.json())
    .catch(error=>console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value={"En attente"}>En attente</MenuItem>
          <MenuItem value={"Publié"}>Publié</MenuItem>
 
        </Select>
      </FormControl>
    </Box>
  );
}