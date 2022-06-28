
import React from "react"
import EnhancedTable from "./Table";
import {Card,Title} from './Finance'

export const Releve=()=> {

    
  
    return(
        <Card style={{marginTop:'50px',marginBottom:'6px'}}>
            <Title style={{marginBottom:'30px'}}><i className="fa-solid fa-money-bill-transfer"></i>    Relevé de compte </Title>

                <EnhancedTable  />
        </Card>
    )
    
}