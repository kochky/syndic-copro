import  React, {useState,useEffect} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Props={
  name:string,
  montant:number,
  paid:boolean
}

export default function StatusProvision({name,montant,paid}:Props) {
  const [value, setValue] = React.useState(paid);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };


  useEffect(() => {
    setIsLoaded(true)
    if(isLoaded){
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
                modifyProvisionStatus(user:{name:"${name}"montant:${montant},paid:${value}}){
                  _id
                  provision {
                    paid
                  }
                  
                  }
              }`
          })
        }
      fetch(process.env.NEXT_PUBLIC_API_URL, requestOptions)
      .then(response => response.json())
      .catch(error=>console.log(error))
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  

  return (

      <FormControl size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value={true as any} >Payé</MenuItem>
          <MenuItem value={false as any}>Non payé</MenuItem>

        </Select>
      </FormControl>
  )
}