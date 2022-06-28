
import React from "react"
import {Card,CardTitle,Text,Flex} from '../Finance/Finance'
import { UserType } from "../../dashboard";
import { UserData } from "../../dashboard";

type Provision= {
    montant:number,
    paid:boolean,
    year:number
}
export const Provision=()=> {

    const value = React.useContext (UserData) as UserType;
    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      });

    return (
        <Card>
                <CardTitle><i className="fa-solid fa-hand-holding-dollar"></i>  Provision </CardTitle>
                <Flex style={{marginBottom:'20px'}}>
                    <Text tertiary={true}>Année</Text>
                    <Text tertiary={true}>Montant</Text>
                    <Text tertiary={true} >Status</Text>
                </Flex>
                
                {(value.user && value.user.provision )&& value.user.provision.map((provision:Provision,index:number)=>(
                    <Flex key={index}>
                        <Text>{provision.year}</Text>
                        <Text secondary={true}>{euro.format(provision.montant)}</Text>
                        {provision.paid ?<Text style={{color:"#00C49F"}}>payé</Text>: <Text style={{color:"red"}}>non payé</Text>  }
                    </Flex> 
                    )  
                )}
            </Card>
    )
}