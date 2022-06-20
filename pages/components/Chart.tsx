
import React, {useState,useEffect} from "react"
import {PieChart, Pie,Cell,ResponsiveContainer} from "recharts"
import styled, { css } from 'styled-components'
import { theme } from "../index"
import {Theme} from '../index'
import { CoproData } from "../dashboard";
import { CoProType } from "../dashboard";


const ResultPie=styled.div `
    position:absolute;
    top:90px;
    left:55px;
    @media screen and (max-width:500px){
        font-size:12px;  
        top:70px;
        left:40px;         
    }

`
const CharContainer=styled.div `
    position:absolute;
    width:200px;
    height:200px;
    color:${(props:Theme)=>props.theme.tertiary};
    @media screen and (max-width:500px){
        width:150px;
        height:150px;           
    }
`

export const Chart=()=>{
    const COLORS = [theme.tertiary, theme.secondary];
    const value = React.useContext (CoproData) as CoProType;

   


    
    return (
        <>
       {(value.data && value.data.finances )&& <CharContainer>
        <ResponsiveContainer width='100%' height="100%">
            <PieChart>
                <Pie  data={[{name:"reste",value:value.data.finances.actuel},{name:"total",value:value.data.finances.solde}]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius='60%' outerRadius='80%' fill={COLORS[0]}>
                    <Cell  fill={COLORS[1]} /> 
                </Pie>
            </PieChart>
            </ResponsiveContainer>
            <ResultPie>{value.data.finances.actuel/value.data.finances.solde *100}% restant</ResultPie>
        </CharContainer>}
        </>
    )
}