import  React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type User={
    name:string
}
type Props= {
    value:string|null,
    setValue:(value:string|null)=>void,

}
export default function PersonSelect({value,setValue}:Props) {
  const [users, setUsers] = useState<[User]|null>();

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
    
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
            query:` {
            users{
                name
              
            }
            }`
        })
    };
    fetch('http://localhost:4000/graphql', requestOptions)
    .then(response => response.json())
    .then(response=>setUsers(response.data.users))
    .catch(error=>console.log(error))
  }, [])
  

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
            {users && users.map(user=><MenuItem key={user.name} value={user.name}>{user.name}</MenuItem>)}
 
        </Select>
      </FormControl>
    </Box>
  );
}