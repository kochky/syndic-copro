import React from 'react';
import type { NextPage } from 'next'
import Link from 'next/link'
import styled, { css } from 'styled-components'


type Theme = {
    theme:{
      primary:string,
      secondary:string,
      tertiary:string,
      fourth:string,
    }
  }

const FooterContainer= styled.div `
  width:100%;
  height:150px;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;
  background-color:white;
 
`
const LinkContainer= styled.div `
  width:100%;
  height:2vh;
  display:flex;
  justify-content:space-around;
  align-items:center;
  margin-bottom:0px;
  font-family:"Gotham book" 

`

const Author= styled.div `
  color:${(props:Theme)=>props.theme.tertiary};
  padding:15px 0;

`
const Footer:NextPage = () => {
    return (
        <FooterContainer>
            <LinkContainer>  
                <Link href='mailto:koch.christopher@hotmail.fr'>Contact</Link> 
            </LinkContainer>  
            <Author>Créé par Koch Christopher</Author>


        </FooterContainer>
    )
}

export default Footer