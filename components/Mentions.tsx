import React from 'react';
import type { NextPage } from 'next'
import {Theme} from '../pages/index'

import styled, { css } from 'styled-components'

const Container = styled.div `
    width:100%;
    padding:5%;
    background-color:whitesmoke;
    display:flex;
    flex-direction:column;
    @media screen and (max-width:768px) {
        align-items:center;
        padding:0;

    };

`


const Title = styled.h1 `
    font-family:"Gotham black";
    width:100%;
    margin-bottom:50px;
    color:${(props:Theme)=>props.theme.primary};
    @media screen and (max-width:768px) {
        font-size:22px;
        padding-top:5%;
        padding-left:5%;

    };
    @media screen and (max-width:425px) {
        font-size:16px;
    }
`

const Paragraph=styled.div `
    font-family:"Gotham book";
    font-size:18px;


`
const ParagraphSection=styled.div `
    display:flex;
    margin-bottom:30px;
    align-items:center;
    justify-content:space-around;
    padding:30px;
    min-height:250px;
    border-radius:15px;
    background-color:white;
    box-shadow: rgb(159 162 191 / 18%) 0px 0px 5px, rgb(159 162 191 / 32%) 0px 0px 2px;


`
const Icon=styled.div`
    width:100%;
    height:100px;
    filter: invert(100%);
    @media screen and (max-width:768px) {
        height:75px;
      
    }
    @media screen and (max-width:425px) {
        height:50px;
     
    }


`
const IconContainer=styled.div`
    background-color:${(props:Theme)=>props.theme.secondary};
    height:150px;
    min-width:150px;
    display:flex;
    align-items:center;
    border-radius:40px;
    margin:0 10%;
    @media screen and (max-width:768px) {
        height:100px;
        min-width:100px;
        border-radius:30px;

    }

    @media screen and (max-width:425px) {
        height:75px;
        min-width:75px;
        border-radius:20px;

    }

`

const Text= styled.p `
    font-size:18px;
    line-height:40px;

    @media screen and (max-width:768px) {
        font-size:16px;
        line-height:30px;

    }

    @media screen and (max-width:425px) {
        font-size:14px;
    }

`

const Mentions:NextPage = () => {

    return (
        <Container>
            <Title>Mise en place gratuitement </Title>
            <Paragraph>
                <ParagraphSection >
                    <Text>Cette plateforme a ??t?? cr???? et mis en place sans but commercial pour la copropri??t?? Villa Laure.<br/>
                    Aucune obligation d'utilisation est demand??e par la copro b??n??vole.<br/>
                    </Text>
                    <IconContainer>
                        <Icon style={{background:" center/contain no-repeat url('/free.png') "}} />
                    </IconContainer>
                </ParagraphSection>
                <ParagraphSection >
                    <IconContainer>
                        <Icon style={{background:" center/contain no-repeat url('/key.png') "}} />
                    </IconContainer>
                    <Text> Le site est heberg?? sur netlify et heroku.<br/>
                    Les donn??es sont s??curis??es et h??berg??es sur AWS via MongoDB.<br/>
                    </Text>
                </ParagraphSection>
                <ParagraphSection >
                    <Text> 
                    Les donn??es utilis??es sont seulement publics aux copropri??taires tel que le budget,
                    l'appel de provision, les relev??s de compte ...<br/>
                    </Text>
                    <IconContainer>
                        <Icon style={{background:" center/contain no-repeat url('/data.png') "}} />
                    </IconContainer>
                </ParagraphSection>
                <ParagraphSection >
                    <IconContainer>
                        <Icon style={{background:" center/contain no-repeat url('/controle-dacces.png') "}} />
                     </IconContainer>
                    <Text> L'acc??s au dashboard se fait avec un email et un mot de passe.<br/>
                    Votre acc??s sera cr???? par l'administrateur avec votre accord, avec un mot de passe provisoire, modifiable dans le dashboard.<br/>
                    </Text>
                </ParagraphSection>
                <ParagraphSection >
                    <Text> Ne partager pas des informations sensibles sur la messagerie avec les autres utilisateurs.<br/>
                    </Text>
                    <IconContainer>
                        <Icon style={{background:" center/contain no-repeat url('/confidentiel.png') "}} />
                    </IconContainer>
                </ParagraphSection>
                <ParagraphSection >
                    <IconContainer>
                        <Icon style={{background:" center/contain no-repeat url('/working.png') "}} />
                    </IconContainer>
                    <Text>  L'administrateur du site est Koch Christopher, pr??sident b??n??vole de la copropri??t?? Villa Laure.
                    </Text>
                </ParagraphSection>
            </Paragraph>
        </Container>
    )
}

export default Mentions