
import React from "react"
import {PieChart, Pie,Cell,ResponsiveContainer} from "recharts"
import styled, { css } from 'styled-components'
import { theme } from "../../pages/index"
import {Theme} from '../../pages/index'
import { CoproData } from "../../pages/dashboard";
import { CoProType } from "../../pages/dashboard";


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

const Chart=()=>{
    const COLORS = ['rgba(76,52,255,0.3', theme.secondary];
    const value = React.useContext (CoproData) as CoProType;
    const date=new Date()

    return (
        <>
       {(value.data && value.data.finances )&& <CharContainer>
        <ResponsiveContainer width='100%' height="100%">
            <PieChart>
              {value.data.finances.map(finance=>finance.year===date.getFullYear()&&  <Pie  data={[{name:"reste",value:finance.actuel},{name:"total",value:finance.solde-finance.actuel}]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius='60%' outerRadius='80%' fill={COLORS[0]}>
                    <Cell  fill={COLORS[1]} /> 
                </Pie>)}
            </PieChart>
            </ResponsiveContainer>
           {value.data.finances.map(finance=>finance.year===date.getFullYear()&&<ResultPie>{Math.round(finance.actuel/finance.solde *100)}% restant</ResultPie>) }
        </CharContainer>}
        </>
    )
}

export default Chart