
import React from "react"
import EnhancedTable from "./Table";
import {Card,Title} from './Finance'

type Props= {
    yearSelected:number
}

const Releve=({yearSelected}:Props)=> {

    return(
        <Card style={{marginTop:'50px',marginBottom:'6px'}}>
            <Title style={{marginBottom:'30px'}}><i className="fa-solid fa-money-bill-transfer"></i> Relevés de compte </Title>
                <EnhancedTable  yearSelected={yearSelected} />
        </Card>
    )   
}

export default Releve