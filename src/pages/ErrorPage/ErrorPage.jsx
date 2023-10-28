import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const ErrorPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    width: 100%;
    height: 60vh;
    gap: 40px;

    h2 {
        font-size: ${({ theme }) => theme.fontSize.xl};
        font-weight: 600;
    }

    button {
        width: 160px;
        height: 36px;
        background-color: white;
        font-size: ${({ theme }) => theme.fontSize.small};
        color: ${({ theme }) => theme.colors.black};
        margin-right: 20px;

        &:hover {
            border: 0.6px solid white;
            background-color: transparent;
            color: white;
        }
    }
`;
export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <ErrorPageWrapper>
                <h2>404 Not Found</h2>
                <div>
                    <button
                        type="button"
                        ariaLabel="홈 페이지 버튼"
                        onClick={() => navigate('/')}
                    >
                        홈으로
                    </button>
                    <button
                        type="button"
                        ariaLabel="이전 페이지 버튼"
                        onClick={() => navigate(-1)}
                    >
                        이전 페이지로
                    </button>
                </div>
            </ErrorPageWrapper>
        </>
    );
}
