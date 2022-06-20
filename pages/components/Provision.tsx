
import React from "react"
import {Card,CardTitle,Text,Flex} from './Finance'
import { UserType } from "../dashboard";
import { UserData } from "../dashboard";


export const Provision=()=> {

    const value = React.useContext (UserData) as UserType;

    return (
        <Card>
                <CardTitle><i className="fa-solid fa-hand-holding-dollar"></i>  Provision </CardTitle>
                <Flex style={{marginBottom:'20px'}}>
                    <Text tertiary={true}>Année</Text>
                    <Text tertiary={true}>Montant</Text>
                    <Text tertiary={true} >Status</Text>
                </Flex>
                
                {(value.user && value.user.provision )&& value.user.provision.map((provision:object,index:number)=>(
                    <Flex key={index}>
                        <Text>{Object.keys(provision)}</Text>
                        <Text secondary={true}>{provision[Object.keys(provision)as Array<keyof typeof provision>[0]]['montant']}€</Text>
                        {provision[Object.keys(provision)as Array<keyof typeof provision>[0]]['paid'] ?<Text style={{color:"#00C49F"}}>payé</Text>: <Text style={{color:"red"}}>non payé</Text>  }
                    </Flex> 
                    )  
                )}
            </Card>
    )
}