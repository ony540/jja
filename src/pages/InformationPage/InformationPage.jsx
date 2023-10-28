import styled from '@emotion/styled';

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 40px;
`;

const Info = styled.p`
    width: clamp(calc(100% - 240px), calc(100% - 240px), 1200px);
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.large};
    margin: 0 auto;

    strong {
        font-weight: 600;
    }

    &:nth-of-type(1) {
        padding-top: 100px;
    }
    &:nth-of-type(3) {
        padding-bottom: 100px;
    }

    @media screen and (max-width: 1024px) {
        min-width: calc(100vw - 120px);
        font-size: ${({ theme }) => theme.fontSize.medium};
    }
    @media screen and (max-width: 480px) {
        min-width: calc(100vw - 40px);
        font-size: ${({ theme }) => theme.fontSize.base};
    }
`;
export default function InformationPage() {
    return (
        <InfoWrapper>
            <Info>
                <strong>JJA(JsJobs Archive)</strong>는 'Js-Jobs'라는 스터디
                그룹의 활동을 아카이빙하여 지속적인 학습과 지식 공유를 촉진하는
                목적으로 만들어진 책장 속 책 형식의 웹사이트입니다.
            </Info>
            <Info>
                Js-Jobs 스터디 그룹은 코어 자바스크립트 튜토리얼을 기반으로 매주
                정해진 분량을 읽고 학습하며, 그 주제에 따라 스터디원들이 발표를
                진행했습니다. 발표 이후에는 자유로운 토론과 질의응답을 통해
                서로의 의견을 나누고 궁금한 점을 해결하는 시간을 가졌습니다.
            </Info>
            <Info>
                JJA 프로젝트는 이러한 활동을 기록하고 보존함으로써, 스터디
                그룹의 누적된 지식과 경험을 정리하여 온라인 플랫폼에 제공합니다.
                각 주제별로 발표 내용을 정리하여 책장을 구경하듯이 찾아볼 수
                있습니다.
            </Info>
        </InfoWrapper>
    );
}
