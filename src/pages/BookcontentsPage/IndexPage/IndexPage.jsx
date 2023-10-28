import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    BookSpine,
    BookBox,
    IndexPageWrapper,
    BookCoverFront,
    BookCoverBack,
    PageBox,
    indexMenuButtonCss,
    backButtonCss,
} from './IndexPageStyle';
import chapterList from '../../../db/chapter.json';
import CircleButton from '../../../components/CircleButton/CircleButton';
import Spinner from '../../../components/Spinner/Spinner';

export default function IndexPage() {
    const { state } = useLocation();
    const { bookname } = useParams();
    const realBookname = bookname.replaceAll('-', ' ').replaceAll(',', '/');
    const { id, title, indexData, color } = chapterList.contentList.find(
        item => item.title === realBookname,
    );
    const [isButtonShow, setIsButtonShow] = useState(false);
    const [isMovetoChapter, setIsMovetoChapter] = useState(false);
    const [isBeforeChapter] = useState(state);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isBeforeChapter) {
            const timer = () =>
                setTimeout(() => {
                    setIsButtonShow(true);
                }, 2600);
            timer();
            return clearTimeout(timer);
        } else {
            setIsButtonShow(true);
        }
    }, [isBeforeChapter]);

    const handleClickChapterButton = chapter => {
        setIsMovetoChapter(true);
        const timer = () =>
            setTimeout(() => {
                navigate(`/${bookname}/${chapter.replaceAll(' ', '-')}#1`);
            }, 500);
        timer();
        return clearTimeout(timer);
    };

    // 이미지 프리로드
    const imgPreload = () => {
        const spineImg = new Image();
        spineImg.src = `../img/cover/cover${id}.png`;

        spineImg.onload = () => {
            setIsImageLoaded(true);
        };
    };

    useLayoutEffect(() => {
        imgPreload();
    }, []);

    if (!isImageLoaded) return <Spinner />;

    return (
        <IndexPageWrapper>
            <BookBox
                isMovetoChapter={isMovetoChapter}
                isBeforeChapter={isBeforeChapter}
                isImageLoaded={isImageLoaded}
            >
                <BookSpine bgUrl={`../img/spine/spine${id}.png`}>
                    <button>
                        <span>{String(id).padStart(2, '0')}</span>
                        <h2> {title}</h2>
                    </button>
                </BookSpine>
                <BookCoverFront
                    bgUrl={`../img/cover/cover${id}.png`}
                    color={color}
                    isBeforeChapter={isBeforeChapter}
                    isImageLoaded={isImageLoaded}
                >
                    <li>
                        <h2> {title}</h2>
                        <span>{String(id).padStart(2, '0')}</span>
                    </li>
                    <li>
                        <PageBox>
                            <h2>
                                {`${String(id).padStart(2, '0')} ${title} 목차`}
                            </h2>
                            <ul>
                                {indexData?.map((item, indx) => (
                                    <li
                                        key={indx}
                                        onClick={e => {
                                            handleClickChapterButton(item);
                                        }}
                                    >{`${indx + 1}. ${item}`}</li>
                                ))}
                            </ul>
                            <CircleButton
                                color={color}
                                ariaLabel="콘텐츠 보기 버튼"
                                onClick={e => {
                                    handleClickChapterButton(indexData[0]);
                                }}
                                styledCss={indexMenuButtonCss}
                            />
                        </PageBox>
                    </li>
                </BookCoverFront>
                <BookCoverBack color={color}>
                    <div></div>
                </BookCoverBack>
                {isButtonShow && (
                    <CircleButton
                        color={color}
                        ariaLabel="홈으로 돌아가기 버튼"
                        onClick={() => {
                            navigate('/');
                        }}
                        styledCss={backButtonCss}
                    />
                )}
            </BookBox>
        </IndexPageWrapper>
    );
}
