import React from 'react';
import type { NextPage } from 'next'
import {Theme} from '../pages/index'

import styled, { css } from 'styled-components'

const Container = styled.div `
    width:100%;
    padding:5%;
    background-color:white;
    display:flex;
    flex-direction:column;
    @media screen and (max-width:768px) {
    align-items:center;

    };

`

const CardContainer = styled.div `
    width:100%;
    display:flex;
    padding:5% 0;
    justify-content:space-evenly;


`
const Title = styled.h1 `
    font-family:"Gotham black";
    color:${(props:Theme)=>props.theme.primary};
    @media screen and (max-width:768px) {
        font-size:22px;

    };
    @media screen and (max-width:425px) {
        font-size:16px;
    }
`
const Card = styled.div `
    width:60 %;
    height:400px;
    color:${(props:Theme)=>props.theme.fourth};
    background-color:whitesmoke;
    padding:50px;
    border-radius:15px;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
    @media screen and (max-width:768px) {
        background-color:whitesmoke;
        box-shadow:none;


    }

`
const List = styled.ul `
    height:100%;
    display:flex;
    justify-content:space-evenly;
    flex-direction:column;
    align-items:flex-start;
    font-size:18px
`

const Main:NextPage = () => {

    return (
        <Container>
            <Title>Une application complète pour accéder à votre copropriété en temps réel</Title>
            <CardContainer> 
                <Card>
                    <List>
                        <li><i className="fa-solid fa-check blue"/>&nbsp; L&apos;actu de la copro</li>
                        <li><i className="fa-solid fa-check blue"/> &nbsp;Votre syndic à portée de clic</li>
                        <li><i className="fa-solid fa-check blue"/> &nbsp;Un suivi facile des incidents</li>
                        <li><i className="fa-solid fa-check blue"/> &nbsp;Les comptes de la copro </li>
                        <li><i className="fa-solid fa-check blue"/> &nbsp;Vos informations disponibles en ligne</li>
                    </List>
                </Card>

            </CardContainer>
        </Container>
    )
}

export default Main