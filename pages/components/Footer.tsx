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
  height:5vh;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center
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
  color:${(props:Theme)=>props.theme.tertiary}

`
export const Footer:NextPage = () => {
    return (
        <FooterContainer>
            <LinkContainer>  
                <Link href='/'>Contact</Link>
                <Link href='/'>CGU</Link>
                <Link href='/'>Mentions légales</Link>   
            </LinkContainer>  
            <Author>Créée par Koch Christopher</Author>


        </FooterContainer>
    )
}