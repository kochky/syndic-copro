
import React from "react"
import {Card,CardTitle,CardSection,CardDiv,Text} from './Finance'
import { Chart } from "./Chart"
import { CoproData } from "../dashboard";
import { CoProType} from '../dashboard'


export const Budget=()=> {
    const value = React.useContext (CoproData) as CoProType;


    return (
        <Card >
        <CardTitle><i className="fa-solid fa-piggy-bank"></i>  Budget</CardTitle>
        <CardSection>
            <CardDiv>
                <Text size={14}tertiary={true}>Début année</Text>
                <Text size={16}>{value.data?.finances?.solde}€</Text>
            </CardDiv>
            <CardDiv style={{alignSelf:"flex-end"}}>
                <Text size={14} tertiary={true}>Actuel</Text>
                <Text secondary={true} size={24}>{value.data?.finances?.actuel}€</Text>
            </CardDiv>
          <Chart />
        </CardSection> 
    </Card>
    )
}