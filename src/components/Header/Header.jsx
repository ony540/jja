import github from '../../assets/images/github.svg';
import logo from '../../assets/images/JJA.svg';
import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';

const Wrapper = styled.nav`
    width: clamp(calc(100% - 240px), calc(100% - 240px), 1200px);
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 58px;
    z-index: 10;
    position: relative;

    @media screen and (max-width: 1024px) {
        min-width: calc(100vw - 120px);
    }
    @media screen and (max-width: 480px) {
        min-width: calc(100vw - 40px);
    }
`;

const Logo = styled.img`
    width: 90px;
    cursor: pointer;

    @media screen and (max-width: 480px) {
        width: 56px;
    }
`;

const TextBtn = styled.button`
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 600;
    margin-right: 56px;

    @media screen and (max-width: 1024px) {
        margin-right: 40px;
    }

    @media screen and (max-width: 480px) {
        font-size: ${({ theme }) => theme.fontSize.xs};
        margin-right: 18px;
    }
`;

const ImgBtn = styled.button`
    width: 46px;

    @media screen and (max-width: 480px) {
        width: 30px;
    }
`;

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    function goHome() {
        navigate('/');
    }

    function goInfo() {
        if (location.pathname === '/info') {
            navigate(-1);
        } else {
            navigate('/info');
        }
    }

    function goGithub() {
        const githubURL = 'https://github.com/Jobs-Js/JavaScript-Study';
        window.open(githubURL, '_blank');
    }

    return (
        <Wrapper>
            <h1>
                <Logo src={logo} alt="JJA Logo" onClick={goHome} />
            </h1>
            <div>
                <TextBtn onClick={goInfo}>
                    {location.pathname === '/info' ? 'CLOSE' : 'INFO'}
                </TextBtn>
                <ImgBtn onClick={goGithub}>
                    <img src={github} alt="GitHub" />
                </ImgBtn>
            </div>
        </Wrapper>
    );
}
