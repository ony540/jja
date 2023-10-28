import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const fadeOutBackground = keyframes`
    from{
    }
    to{
        background: transparent bottom / 100% 85px;
    }
`;

const fadeOutBgAnimate = p => css`
    animation: ${p.isFadeOut &&
    css`
        ${fadeOutBackground} 0.25s forwards;
    `};
`;

const rotateBook = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(90deg);
    }
`;

export const MainWrapper = styled.div`
    background: url(${({ bookShelfImg }) => bookShelfImg}) no-repeat bottom /
        100% 85px;
    ${fadeOutBgAnimate}
    @media screen and (min-height: 925px) {
        height: calc(100vh - 104px);
    }

    @media (max-width: 1024px) {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background: none;
    }
`;

export const BookList = styled.ul`
    position: relative;
    width: max-content;
    margin: 0 auto;
    background: url(${({ bookShelfImg }) => bookShelfImg}) no-repeat bottom /
        100% 85px;
    padding: 0 80px 0 30px;
    ${fadeOutBgAnimate}

    @media screen and (min-height: 925px) {
        display: flex;
        align-content: end;
        flex-wrap: wrap;
        height: calc(100vh - 104px);
    }

    @media (max-width: 1024px) {
        flex-direction: row-reverse;
        transform-origin: center;
        transform: rotate(-90deg);
        background: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        margin-top: 50px;
    }
    @media (max-width: 480px) {
        margin-top: 0px;
    }
    @media screen and (max-height: 925px) {
        margin-top: 240px;
    }
`;

const fadeOutBooks = keyframes`
    0%{
        opacity: 1;
    }
    90%{
        opacity: 0;
    }
    100%{
        opacity: 0;
        display: none;
    }
`;

const fadeInBook = keyframes`
    0%{
        transform: scale(1.1) rotate(0);
    }
    100%{
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scale(1.0);
    }
`;

const fadeInBookForLongHeight = keyframes`
    0%{
        transform: scale(1.1) rotate(0);
    }
    100%{
        position: absolute;
        left: 50%;
        top: 43%;
        transform: translate(-50%,-50%) scale(1.0);
    }
`;

export const BookItem = styled.li`
    display: inline-block;
    margin: 60px 2px 80px 0;
    width: 100px;
    height: 680px;
    background: url(${({ bgUrl }) => bgUrl}) no-repeat top / contain;
    transition: all 0.5s;

    @media (max-width: 1024px) {
        width: unset;
        height: 510px;
        margin: 0 20px 0 0;
        aspect-ratio: 10 / 68;
    }

    @media (max-width: 480px) {
        height: calc(100vw - 40px);
    }

    &:nth-of-type(3) {
        transform: rotate(16deg);
        margin: 0 90px 0 88px;

        @media screen and (min-height: 925px) {
            transform: rotate(16deg) translate(16px, 60px);
            &:hover {
                transform: scale(1.1) translate(16px, 50px);
            }
        }

        @media (max-width: 1024px) {
            transform: rotate(8deg);
            margin: 0 50px 0 30px;
            &:hover {
                transform: scale(1.1) translate(0px, 0px);
            }
        }
    }

    &:nth-of-type(7) {
        @media (max-width: 1024px) {
            transform: rotate(-8deg);
            margin: 0 50px 0 30px;
        }
    }
    &:nth-of-type(9) {
        transform: rotate(-11deg);
        margin-left: 63px;

        @media (max-width: 1024px) {
            transform: rotate(0deg);
            margin: 0 16px;
        }
    }

    &:nth-of-type(${({ selectedBook }) => selectedBook}) {
        margin: 60px 0 80px;

        ${({ isFadeOut }) =>
            isFadeOut &&
            css`
                animation: ${fadeInBook} 0.5s forwards;
                @media screen and (min-height: 925px) {
                    animation: ${fadeInBookForLongHeight} 0.5s forwards;
                }
            `};

        @media (max-width: 1024px) {
            transform: center;
            animation: ${rotateBook} 0.5s ease-in-out forwards;
        }
    }

    &:hover {
        transform: scale(1.1);
    }

    &:not(:nth-of-type(${({ selectedBook }) => selectedBook})) {
        ${({ isFadeOut }) =>
            isFadeOut &&
            css`
                animation: ${fadeOutBooks} 0.3s forwards;
            `};
    }

    button {
        width: 680px;
        height: 100px;
        transform: rotate(90deg) translateX(-100px);
        transform-origin: 0% 100%;
        font-weight: 600;
        padding: 0 44px;
        display: flex;
        align-items: center;
        gap: 52px;

        @media (max-width: 1024px) {
            aspect-ratio: 68 / 10;
            height: unset;
            width: 510px;
            padding: 0 50px;

            gap: 30px;
        }

        @media (max-width: 480px) {
            width: calc(100vw - 40px);
            height: unset;
            padding: 0px 15vw;
            gap: 6vw;
        }
    }

    span {
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.xl};
        transform: rotate(-90deg);

        @media (max-width: 1024px) {
            font-size: ${({ theme }) => theme.fontSize.large};
        }

        @media (max-width: 480px) {
            font-size: ${({ theme }) => theme.fontSize.medium};
        }
    }

    h2 {
        font-size: ${({ theme }) => theme.fontSize.large};
        line-height: 160%;
        font-weight: 600;
        @media (max-width: 1024px) {
            font-size: ${({ theme }) => theme.fontSize.medium};
            white-space: nowrap;
        }
        @media (max-width: 480px) {
            font-size: ${({ theme }) => theme.fontSize.base};
        }
    }
`;
