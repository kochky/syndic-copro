import React from 'react'
import type { NextPage } from 'next'
import  Header  from '../components/Header'
import  Banner  from '../components/Banner'
import  Main  from '../components/Main'
import Footer  from '../components/Footer'
import Script from 'next/script'
import Mentions from '../components/Mentions'
import {ThemeProvider} from "styled-components"

export const theme= {
  primary:"#162049",
  secondary:"#4c34ff",
  tertiary:"#959bb1",
  fourth:'#212121'
}

export type Theme = {
  theme:{
    primary:string,
    secondary:string,
    tertiary:string,
    fourth:string
  }
}
const Home: NextPage = () => {

  return (
    <ThemeProvider theme={theme}>
      <Script src="https://kit.fontawesome.com/3b79fd5521.js" strategy="lazyOnload" />
      <Header  />
      <Banner />
      <Main />
      <Mentions />
      <Footer />
    </ThemeProvider>
  )
}

export default Home
