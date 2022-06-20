import React from 'react';
import { useRouter } from 'next/router'
import {Theme} from '../index'
import { Button } from './Button';
import styled from 'styled-components'



const Wrapper= styled.div `
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:5vh;
  min-height:100px;
  @media screen and (max-width:425px) {
  flex-direction:column;
  padding-bottom:10px;
  }
`
const Welcome= styled.span `
  color: #333;
  font-size: 14px;
  margin-right: 10px;
`
const Title= styled.h1 `
  color:${(props:Theme)=>props.theme.primary};
  @media screen and (max-width:768px) {
    font-size:22px;
  }
`  

export const Header = () => {

  
  const router = useRouter()


  return(
    <header>
      <Wrapper>
        <div>
          <Title>Ma Copro&apos;</Title>
        </div>
        <div style={{alignSelf:"flex-end"}}> 
          <Button primary size="small" onClick={()=>router.push('/dashboard')} label="Accès au dashboard" />  
        </div>
      </Wrapper>
    </header>
)};