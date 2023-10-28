import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/images/spinner.svg';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const dash = keyframes`
  0% { stroke-dashoffset: 187; }
  50% {
    stroke-dashoffset: 46.75;
    transform:rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform:rotate(450deg);
  }
`;

const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }

`;
const StyledSpinner = styled.div`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        animation: ${rotator} 1s linear infinite;
    }

    circle {
        stroke: ${({ theme }) => theme.colors.lightGray};
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        stroke-width: 6;
        stroke-linecap: round;
        transform-origin: center;
        animation: ${dash} 1s ease-in-out infinite;
    }
`;
export default function Spinner() {
    return (
        <StyledSpinner>
            <SpinnerIcon />
        </StyledSpinner>
    );
}
