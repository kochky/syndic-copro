/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react"
import  NewYearForm  from "./NewYearForm"
import { NewReleveForm } from "./NewReleveForm"
import  ReleveDelete  from "./ReleveDelete"
import ReleveForm from "./ReleveForm"
import { ModifyReleveForm } from "./ModifyReleveForm"
import { ItemProps } from '../../../pages/dashboard'
import YearPicking from "./YearPicking"
import styled, { css } from 'styled-components'
import {Theme} from '../../../pages/index'
import {Text} from "../../Finance/Finance"
import Spinner from "../../Spinner"

const BigCard=styled.div`
    width:100%;
    height:100%;
    overflow:hidden;
 
`
const CardTitle=styled.h3`
    font-family:"Gotham black";
    color:${(props:Theme)=>props.theme.primary};
    cursor:pointer;
    display:flex;
    align-items:center;
`
const TopTitle=styled.div `
    display:flex;
    justify-content:space-between;
    padding-right: 50px;
    padding-bottom:20px;
    align-items:center;
    border-bottom:1px solid;
    border-color:${(props:Theme)=>props.theme.secondary};
    @media screen and (max-width:525px){
        padding-right:0;
        flex-direction:column;
        row-gap:15px;
    }

`
const CardContent=styled.div`
    background:white;
    padding:15px;
    padding-right:0;
    border-radius:15px;
    margin-bottom:5px;
    max-height:500px;
    min-height:500px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;

    ${(props:ItemProps) => props.primary && css`
        border:1px solid;
        border-color:${(props:Theme)=>props.theme.tertiary};

    `}
    @media screen and (max-width:470px){
        border:none;
        
        border-radius:0;
        box-shadow:none;

        border-color:${(props:Theme)=>props.theme.tertiary};  
    }
`
const AddIcon=styled.div `
    color:${(props:Theme)=>props.theme.tertiary};
    font-size:14px;
    display:flex;
    align-items:center;
    @media screen and (max-width:425px){
        align-self:flex-start
    }

`


type Releve= {
    _id:string,
    date:string,
    description:string,
    type:string,
    recette:number,
    depense:number
}

type Finances= {
    year:number,
    solde:number,
    actuel:number,
    releve:[Releve]
}
type Id= {
    _id:string
}

const AdminFinance= ( )=> {
    
    const [createNewYear, setCreateNewYear] = useState(false);
    const [newYearCreated, setNewYearCreated] = useState(false);
    const [yearSelected, setYearSelected] = useState(0);
    const [financesData, setFinancesData] = useState<[Finances]|null>(null);
    const [sumBegin, setSumBegin] = useState(0);
    const [sumNow, setSumNow] = useState(0);
    const [createReleve, setCreateReleve] = useState(false);
    const [releveCreated, setReleveCreated] = useState(false);
    const [modifyReleve, setModifyReleve] = useState<Releve|null>(null);
    const [deleteReleve, setDeleteReleve] = useState<Id|null>(null);
    const [releveData, setReleveData] = useState<[Releve]>();


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
                query:`{
                finances{
                    year
                    solde
                    actuel
                    releve{
                        _id
                        date
                        description
                        type
                        recette
                        depense
                        }
                    }
                }`
            })
          }
    
        fetch('http://localhost:4000/graphql', requestOptions)
        .then(response => response.json())
        .then(response=>{
            setFinancesData(response.data.finances)
            setYearSelected(response.data.finances[0].year)

        })
        .catch(error=>console.log(error))
    
    }, [releveCreated,newYearCreated])

    useEffect(() => {
      if(financesData){
        
        financesData.map(finance=>{if(finance.year===yearSelected){

            setSumBegin(finance.solde)
            setSumNow(finance.actuel)
            setReleveData(finance.releve)
            } 
        })
        

      }
    }, [yearSelected,financesData])
    
    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      });
    return (
        <div>   
           {createNewYear && <NewYearForm setNewYearCreated={setNewYearCreated} setCreateNewYear={setCreateNewYear}/>}
           {createReleve && <NewReleveForm yearSelected={yearSelected} setReleveCreated={setReleveCreated} setCreateReleve={setCreateReleve}/>}
           {modifyReleve && <ModifyReleveForm  modifyReleve={modifyReleve} yearSelected={yearSelected} setReleveCreated={setReleveCreated} setModifyReleve={setModifyReleve}/>}
           {deleteReleve && <ReleveDelete yearSelected={yearSelected} deleteReleve={deleteReleve} setReleveCreated={setReleveCreated} setDeleteReleve={setDeleteReleve}/>}
            {financesData ?<BigCard>
                <CardContent>
                    <TopTitle>
                        <CardTitle>Finances</CardTitle>
                        <YearPicking financesData={financesData} setYearSelected={setYearSelected} yearSelected={yearSelected} />
                        <AddIcon onClick={()=>setCreateReleve(true)}><i className="fa-solid fa-plus blue"></i>&nbsp;  Ajout relevé</AddIcon>
                        <AddIcon onClick={()=>setCreateNewYear(true)}><i className="fa-solid fa-plus blue"></i>&nbsp;  Ajout nouvel année</AddIcon>

                    </TopTitle>
                    <TopTitle style={{display:'flex',justifyContent:"space-evenly",padding:'30px'}}>
                        <span style={{display:'flex'}}> <Text tertiary>Montant départ:</Text><Text> &nbsp;{euro.format(sumBegin)}</Text></span>
                        <span style={{display:'flex'}}><Text tertiary>Montant restant:</Text><Text> &nbsp;{euro.format(sumNow)}</Text></span>
                   </TopTitle>
               {releveData ? <ReleveForm releveData={releveData} setReleveCreated={setReleveCreated}  setDeleteReleve={setDeleteReleve} setModifyReleve={setModifyReleve}/>:<Spinner />}
                </CardContent>
            </BigCard>: 
            <CardContent>
                <Spinner />
            </CardContent>

            }

        </div>
    )
}

export default AdminFinance