import React from 'react';
import styled, { css } from 'styled-components'
import {Theme} from '../index'

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}



/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
    const Bouton = styled.button `
      font-family: 'Gotham book';
      font-weight: 700;
      border: 0;
      border-radius: 3em;
      cursor: pointer;
      display: inline-block;
      line-height: 1;
      ${(props:ButtonProps) => props.primary && css`
        color: white;
        background-color: ${(props:Theme)=>props.theme.secondary};
      `}
      ${(props:ButtonProps) => !props.primary && css`
      color: #333;
      background-color: transparent;
      box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
      `}
      ${(props:ButtonProps) => props.size==='small' && css`
      font-size: 12px;
      padding: 10px 16px;
      @media screen and (max-width:425px){
        padding:5px;
      }
      `}
      ${(props:ButtonProps) => props.size==='medium' && css`
      font-size: 14px;
      padding: 11px 20px;
      `}
      ${(props:ButtonProps) => props.size==='large' && css`
      font-size: 16px;
      padding: 12px 24px;
      `}
    `

  return (
    <>
   <Bouton primary={primary} size={size}  style={{ backgroundColor }}{...props}>{label}</Bouton>
   </>
  );
};
