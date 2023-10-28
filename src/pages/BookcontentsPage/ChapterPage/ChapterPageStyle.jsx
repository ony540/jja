import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export const ChapterPageWrapper = styled.div`
    @media screen and (min-height: 925px) {
        height: calc(100vh - 104px);
        width: 100vw;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
    }
`;

const bookSlide = keyframes`
    0%{
        transform: translateX(64px);
    }
    100%{
        transform: translateX(1098px);
    }
`;

const mobileBookSlide = keyframes`
    0%{
        transform: translateX(0px);
    }
    100%{
        transform: translateX(100%);
    }
`;

const bookSlideAnimate = p => css`
    animation: ${p.isMovetoIndex &&
    css`
        ${bookSlide} 0.4s forwards;
    `};
`;
const mobileBookSlideAnimate = p => css`
    animation: ${p.isMovetoIndex &&
    css`
        ${mobileBookSlide} 0.4s forwards;
    `};
`;

export const BookBox = styled.div`
    position: relative;
    margin: 60px auto;
    width: 1098px;
    height: 680px;
    padding: 20px 26px 20px 0;
    background-color: ${p => p.theme.colors[p.color]};
    border-radius: 0px 12px 12px 0px;
    transform: translateX(64px);
    ${bookSlideAnimate};

    @media (max-width: 1024px) {
        width: 480px;
        height: 700px;
        transform: translateX(0px);
        ${mobileBookSlideAnimate};
        border-radius: 0px 6px 6px 0px;
        padding: 10px 10px 10px 0px;
    }
    @media (max-width: 480px) {
        width: calc(100vw - 15%);
        height: 76vh;
    }
`;

const PageBox = styled.section`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow:
        inset 0px -1px 4px rgba(50, 50, 50, 0.1),
        inset -1px 0px 4px rgba(150, 150, 150, 0.2),
        0px 0px 14px rgba(50, 50, 50, 0.2);
`;

export const LeftPage = styled(PageBox)`
    position: absolute;
    height: calc(100% - 40px);
    right: 100%;

    @media (max-width: 1024px) {
        height: calc(100% - 20px);
    }

    &::before {
        position: absolute;
        content: '';
        top: -20px;
        width: 100%;
        height: calc(100% + 40px);
        background: ${p => p.theme.colors[p.color]};
        border-radius: 12px 0 0 12px;
        z-index: -1;
        @media (max-width: 1024px) {
            top: -10px;
            border-radius: 6px 0 0 6px;
            height: calc(100% + 20px);
        }
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
`;

export const RightPage = styled(PageBox)`
    position: relative;
    padding: 74px 116px;

    @media (max-width: 1024px) {
        padding: 40px 32px;
    }
    @media (max-width: 480px) {
        padding: 32px 20px;
    }

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

    nav {
        position: absolute;
        top: 74px;
        right: 68px;

        button {
            display: block;
            margin-bottom: 4px;
        }

        @media (max-width: 1024px) {
            top: unset;
            bottom: 6px;
            right: 32px;
            display: flex;
            flex-direction: row-reverse;
        }
        @media (max-width: 480px) {
            right: 20px;
        }
    }
`;

export const highlight = p => css`
    ::selection {
        background-color: ${p.theme.colors.yellow};
    }
`;
export const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 600;
    ${highlight}

    @media (max-width: 1024px) {
        font-size: ${({ theme }) => theme.fontSize.medium};
    }
`;

export const ScriptBox = styled.div`
    width: 800px;
    margin-top: 42px;
    scroll-snap-type: y mandatory;
    @media (max-width: 1024px) {
        width: unset;
        margin-top: 20px;
        height: 274px;
        overflow-y: scroll;

        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    @media (max-width: 480px) {
        height: calc(47vh - 132px);
    }
`;

export const Script = styled.p`
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 160%;
    margin-bottom: 20px;
    scroll-snap-align: start;

    @media (max-width: 1024px) {
        font-size: ${({ theme }) => theme.fontSize.small};
    }
    &:last-of-type {
        padding-bottom: 180px;
    }
    ${highlight}
`;

export const PageNum = styled.p`
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 600;
    position: absolute;
    bottom: 74px;

    @media screen and (max-width: 1024px) {
        bottom: 22px;
    }
`;

export const PptImgBox = styled.article`
    box-shadow: 0px 0px 14px rgba(50, 50, 50, 0.2);
    aspect-ratio: 16 / 9;

    @media screen and (max-width: 1024px) {
        margin-top: 18px;
        width: 100%;
    }
`;

export const menuButtonCss = css`
    position: absolute;
    top: 74px;
    right: 34px;
`;

export const prevButtonCss = css`
    transform: rotate(180deg);
`;
