
import React from "react"
import {Card,CardTitle,CardSection,CardDiv,Text} from './Finance'
import  Chart  from "./Chart"
import { CoproData } from "../../pages/dashboard";
import { CoProType} from '../../pages/dashboard'


const Budget=()=> {
    const value = React.useContext (CoproData) as CoProType;
    const date= new Date()
    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      });

    return (
        <Card >
        <CardTitle><i className="fa-solid fa-piggy-bank"></i>  Budget</CardTitle>
        <CardSection>
            <CardDiv>
                <Text size={14}tertiary={true}>Début année</Text>
                { value?.data?.finances && value.data.finances.map((finance)=>(finance.year===date.getFullYear() )&& <Text size={16}>{euro.format(finance.solde)}</Text> ) }
            </CardDiv>
            <CardDiv style={{alignSelf:"flex-end"}}>
                <Text size={14} tertiary={true}>Actuel</Text>
                { value?.data?.finances && value.data.finances.map((finance)=>finance.year===date.getFullYear() && <Text secondary size={24}>{euro.format(finance.actuel)}</Text> ) }
            </CardDiv>
          <Chart />
        </CardSection> 
    </Card>
    )
}
export default Budget