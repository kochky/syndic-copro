import React from 'react';
import type { NextPage } from 'next'

import styled, { css } from 'styled-components'


const Img = styled.div `
    width:100%;
    height:500px;
    background-image:url("/tierra-mallorca-JXI2Ap8dTNc-unsplash.jpg");
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    @media screen and (max-width:768px) {
        height:200px;
    }
    @media screen and (max-width:425px) {
        height:150px;
    }

`
const Opacity = styled.div `
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    display:flex;
    justify-content:center;
    align-items:center;
    padding:50px;
    flex-direction:column;
`
const Title = styled.h1 `
    color:white;
    font-family:"Gotham black";
    @media screen and (max-width:768px) {
        font-size:22px
    };
    @media screen and (max-width:425px) {
        font-size:16px
    }

`
const Description = styled.h2 `
    color:white;
    font-family:"Gotham book";
    margin-top:20px;

    @media screen and (max-width:768px) {
        font-size:16px
    };
    @media screen and (max-width:425px) {
        font-size:14px;
        margin-top:10px;
    }
`
const Banner: NextPage  = () => {

    return (
        <Img >
            <Opacity>
                <Title>
                    Ma Copro&apos;: accéder à votre copro&apos; à distance gratuitement !
                </Title>
                <Description>
                    Une solution innovante pour le syndic et les copropriétaires
                </Description>
            </Opacity>
        </Img>
    )
  }
;

export default Banner
