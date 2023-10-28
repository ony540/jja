import styled from '@emotion/styled';
import { BookItem } from '../../MainPage/MainPageStyle';
import { css, keyframes } from '@emotion/react';

const selectedColor = p => css`
    background-color: ${p.theme.colors[p.color]};
`;

export const IndexPageWrapper = styled.div`
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media screen and (min-height: 925px) {
        height: calc(100vh - 104px);
        width: 100vw;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
    }
`;

const bookRotate = keyframes`
    0%{
        transform: rotateY(90deg);
    }
    100%{
        transform: rotateY(0deg);
    }
`;

const bookOpen = keyframes`
    0%{
        transform: translateX(0);
    }
    100%{
        transform: translateX(1098px);
    }
`;

const mobileBookOpen = keyframes`
    0%{
        transform: translateX(0);
    }
    100%{
        transform: translateX(100%);
    }
`;
const bookRotateOpenAnimation = p => css`
    animation: ${p.isImageLoaded &&
    css`
        ${bookRotate} 1.2s ease-in-out forwards,
        ${bookOpen} 1.5s 1.2s forwards;
    `};
`;
const mobileBookRotateOpenAnimation = p => css`
    animation: ${p.isImageLoaded &&
    css`
        ${bookRotate} 1.2s ease-in-out forwards,
        ${mobileBookOpen} 1.5s 1.2s forwards;
    `};
`;

const bookSlide = keyframes`
    0%{
        transform: translateX(1098px);
    }
    100%{
        transform: translateX(64px);
    }
`;

const mobileBookSlide = keyframes`
    0%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0px);
    }
`;

const bookSlideAnimate = p => css`
    animation: ${p.isMovetoChapter &&
    css`
        ${bookSlide} 0.5s forwards;
    `};
`;
const mobileBookSlideAnimate = p => css`
    animation: ${p.isMovetoChapter &&
    css`
        ${mobileBookSlide} 0.5s forwards;
    `};
`;

const nonAnimateBox = p => css`
    animation: ${p.isBeforeChapter &&
    css`
        ${bookRotate} 0s forwards,
        ${mobileBookOpen} 0s forwards;
    `};
`;

export const BookBox = styled.div`
    position: relative;
    margin: 60px auto;
    width: 1098px;
    height: 680px;
    transform-style: preserve-3d;
    transform: rotateY(90deg);

    ${bookRotateOpenAnimation}
    ${nonAnimateBox}
    ${bookSlideAnimate}

    @media (max-width: 1024px) {
        width: 480px;
        height: 700px;
        display: flex;
        justify-content: center;
        align-items: center;

        ${mobileBookRotateOpenAnimation}
        ${nonAnimateBox}
        ${mobileBookSlideAnimate}
    }

    @media (max-width: 480px) {
        width: calc(100vw - 15%);
        height: 76vh;
    }
`;

const perspectiveSetting = css`
    position: absolute;
    top: 0;
    left: 0;
    transform-style: preserve-3d;
`;

/* 옆면 */
export const BookSpine = styled(BookItem.withComponent('div'))`
    ${perspectiveSetting}
    display: block;
    margin: 0;
    &:hover {
        transform: scale(1);
    }
    button {
        cursor: default;
    }
    transform: rotateY(-90deg) translateZ(50px);

    @media (max-width: 1024px) {
        button {
            display: none;
        }
        height: 100%;
        transform: rotateY(-90deg) translateZ(52px);
    }

    @media (max-width: 480px) {
        transform: rotateY(-90deg) translateZ(42px);
    }
`;

const coverFrontOpen = keyframes`
    0%{
        transform: rotateY(0deg);
    }
    100%{
        transform: rotateY(-180deg);
    }
`;

const coverFrontOpenAnimation = p => css`
    animation: ${p.isImageLoaded &&
    css`
        ${coverFrontOpen} 2s 1.2s forwards;
    `};
`;

const nonAnimateCover = p => css`
    animation: ${p.isBeforeChapter &&
    css`
        ${coverFrontOpen} 0s forwards
    `};
`;

export const BookCoverFront = styled.ul`
    width: 100%;
    height: 100%;
    ${perspectiveSetting}

    & > li {
        ${perspectiveSetting}
        width: 100%;
        height: 100%;
    }
    transform: translate3d(0, 0, 50px);
    transform-origin: left top;

    ${coverFrontOpenAnimation}
    ${nonAnimateCover}

    /* 앞면 */
    & > li:first-of-type {
        background: url(${({ bgUrl }) => bgUrl}) no-repeat top / contain;
        text-align: center;
        font-weight: 600;
        backface-visibility: hidden;

        @media (max-width: 1024px) {
            background: url(${({ bgUrl }) => bgUrl}) no-repeat top left / cover;
            border-radius: 12px;
        }

        h2 {
            position: relative;
            padding: 126px 0 30px;
            font-size: ${({ theme }) => theme.fontSize.xxl};
            @media (max-width: 1024px) {
                font-size: ${({ theme }) => theme.fontSize.xl};
            }
            @media (max-width: 480px) {
                font-size: ${({ theme }) => theme.fontSize.medium};
            }
        }

        h2::after {
            position: absolute;
            content: '';
            height: 4px;
            width: 74px;
            background-color: black;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%);
            @media (max-width: 1024px) {
                width: 55px;
            }
            @media (max-width: 480px) {
                width: 50px;
            }
        }

        span {
            font-size: ${({ theme }) => theme.fontSize.medium};
            @media (max-width: 1024px) {
                font-size: ${({ theme }) => theme.fontSize.base};
            }
            @media (max-width: 480px) {
                font-size: ${({ theme }) => theme.fontSize.small};
            }
        }
    }

    //뒷면(목차)
    & > li:nth-of-type(2) {
        transform: rotateY(180deg) translateZ(1px);
        ${selectedColor}
        border-radius: 12px 0 0 12px;
        padding: 20px 0 20px 26px;
        @media (max-width: 1024px) {
            border-radius: 6px 0 0 6px;
            padding: 10px 0 10px 10px;
        }
    }
`;

export const PageBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow:
        inset 0px -1px 4px rgba(50, 50, 50, 0.1),
        inset -1px 0px 4px rgba(150, 150, 150, 0.2),
        -6px 0px 14px rgba(50, 50, 50, 0.2);
    padding: 74px 90px;
    font-weight: 600;

    @media (max-width: 1024px) {
        border-radius: 6px 0 0 6px;
        padding: 10px 0 10px 10px;
    }
    &::after {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        width: 40px;
        height: 100%;
        background: linear-gradient(
            270deg,
            rgba(217, 217, 217, 0.3) 0%,
            rgba(217, 217, 217, 0) 100%
        );
    }

    h2 {
        font-size: ${({ theme }) => theme.fontSize.xl};
        margin-bottom: 42px;

        @media (max-width: 1024px) {
            font-size: ${({ theme }) => theme.fontSize.large};
            padding: 25px;
            margin-bottom: 0;
        }
        @media (max-width: 480px) {
            font-size: ${({ theme }) => theme.fontSize.medium};
            padding: 25px;
            margin-bottom: 0;
        }
    }

    ul {
        font-size: ${({ theme }) => theme.fontSize.large};
        line-height: 1.8;

        @media (max-width: 1024px) {
            font-size: ${({ theme }) => theme.fontSize.medium};
            padding: 0px 25px 25px 25px;
            line-height: 2;
        }

        @media (max-width: 480px) {
            font-size: ${({ theme }) => theme.fontSize.base};
            padding: 0px 25px 25px 25px;
            line-height: 2;
        }

        li {
            cursor: pointer;
        }

        li:hover {
            text-decoration: underline;
        }
    }
`;

export const BookCoverBack = styled.div`
    width: 100%;
    height: 100%;
    ${perspectiveSetting}
    z-index: -1;
    ${selectedColor}
    border-radius: 0 12px 12px 0;
    padding: 20px 26px 20px 0;

    @media (max-width: 1024px) {
        border-radius: 0 6px 6px 0;
        padding: 10px 13px 10px 0;
    }

    div {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: white;
        box-shadow:
            inset 0px -1px 4px rgba(50, 50, 50, 0.1),
            inset -1px 0px 4px rgba(150, 150, 150, 0.2),
            0px 0px 14px rgba(50, 50, 50, 0.2);
        padding: 74px 38px;

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 40px;
            height: 100%;
            background: linear-gradient(
                90deg,
                rgba(217, 217, 217, 0.3) 0%,
                rgba(217, 217, 217, 0) 100%
            );
        }
    }
`;

export const indexMenuButtonCss = css`
    position: absolute;
    top: 74px;
    right: 34px;
    transform: translateZ(2px);

    @media (max-width: 1024px) {
        top: auto;
        bottom: 20px;
        right: 34px;
    }
`;
export const backButtonCss = css`
    position: absolute;
    top: 50%;
    left: -1186px;
    z-index: 100;
    transform: rotate(180deg) translate3d(0, 50%, 2px);

    @media (max-width: 1024px) {
        left: -540px;
    }

    @media (max-width: 480px) {
        display: none;
    }
`;
