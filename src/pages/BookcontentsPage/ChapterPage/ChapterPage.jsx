import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import {
    Title,
    Script,
    ChapterPageWrapper,
    menuButtonCss,
    LeftPage,
    PageNum,
    RightPage,
    prevButtonCss,
    BookBox,
    PptImgBox,
    ScriptBox,
} from './ChapterPageStyle';
import pptImg from '../../../db/pptImg.json';
import content from '../../../db/content.json';
import chapterList from '../../../db/chapter.json';
import CircleButton from '../../../components/CircleButton/CircleButton';
import Spinner from '../../../components/Spinner/Spinner';
import debounce from '../../../utils/debounce';

export default function ChapterPage() {
    const navigate = useNavigate();
    const { hash } = useLocation();
    const { bookname, chapter } = useParams();
    const realChapter = chapter.replaceAll('-', ' ');
    const [pageNumber, setPageNumber] = useState(parseInt(hash.slice(1)));

    const selectedColor = useMemo(
        () =>
            chapterList.contentList.find(item =>
                item.indexData.includes(realChapter),
            )?.color,
        [realChapter],
    );
    const pptImgString = new Map(Object.entries(pptImg)).get(realChapter);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [pptImgData, setPptImgData] = useState([]);
    const contentData = new Map(Object.entries(content)).get(realChapter);

    const [isMovetoIndex, setIsMovetoIndex] = useState(false);
    const scriptBoxRef = useRef();
    const paragraphRef = useRef([]);
    const [isLooped, setIsLooped] = useState(false);

    // 이미지 프리로드
    const pptImgPreload = () => {
        for (let i = 0; i < pptImgString.length; i++) {
            const pptImg = new Image();
            pptImg.src = pptImgString[i];
            if (i === 0) {
                pptImg.onload = () => {
                    setFirstImageLoaded(true);
                };
            }
            setPptImgData(prev => [...prev, pptImg]);
        }
    };

    useLayoutEffect(() => {
        pptImgPreload();
    }, []);

    // 반응형 확인
    const [isPC, setIsPC] = useState(window.innerWidth > 1024);

    const handleResize = debounce(() => {
        setIsPC(window.innerWidth > 1024);
    }, 100);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 해시, 스크롤 이동
    useEffect(() => {
        if (!isPC) {
            navigate(`#${pageNumber}`);
            if (isLooped) {
                paragraphRef.current[pageNumber - 1].scrollIntoView({
                    block: 'start',
                });
                setIsLooped(false);
            } else {
                paragraphRef.current[pageNumber - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    }, [pageNumber, isPC]);

    //스크롤에 따른 PageNumber 지정
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = paragraphRef.current.indexOf(
                            entry.target,
                        );
                        if (index !== -1) {
                            setPageNumber(index + 1);
                        }
                    }
                });
            },
            {
                root: scriptBoxRef.current,
                rootMargin: '0px 0px -95% 0px',
            },
        );

        paragraphRef.current.forEach(el => observer.observe(el));
        return () => {
            if (paragraphRef.current instanceof Element) {
                paragraphRef.current.forEach(el => observer.unobserve(el));
            }
        };
    }, []);

    const onClickMenu = () => {
        setIsMovetoIndex(true);
        const timer = () =>
            setTimeout(() => {
                navigate(`/${bookname}/index`, {
                    state: true,
                });
            }, 400);
        timer();
        return clearTimeout(timer);
    };

    const onClickNextButton = () => {
        if (pageNumber < pptImgString.length) {
            setPageNumber(pageNumber + 1);
        } else {
            setPageNumber(1);
            setIsLooped(true);
        }
    };
    const onClickPrevButton = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        } else {
            setPageNumber(pptImgString.length);
            setIsLooped(true);
        }
    };

    return (
        <ChapterPageWrapper>
            <BookBox color={selectedColor} isMovetoIndex={isMovetoIndex}>
                <LeftPage color={selectedColor}>
                    <CircleButton
                        type="menu"
                        color={selectedColor}
                        ariaLabel="목차 확인 버튼"
                        onClick={onClickMenu}
                        styledCss={menuButtonCss}
                    />
                </LeftPage>
                <RightPage>
                    <Title>{realChapter}</Title>
                    {!isPC && (
                        <PptImgBox>
                            {firstImageLoaded ? (
                                <img
                                    src={pptImgData[pageNumber - 1].src}
                                    draggable="false"
                                    alt="ppt 장표"
                                />
                            ) : (
                                <Spinner />
                            )}
                        </PptImgBox>
                    )}

                    <ScriptBox ref={scriptBoxRef}>
                        {isPC ? (
                            <Script>{contentData[pageNumber - 1]} </Script>
                        ) : (
                            contentData.map((paragraph, index) => (
                                <Script
                                    key={index}
                                    ref={el =>
                                        (paragraphRef.current[index] = el)
                                    }
                                >
                                    {paragraph}
                                </Script>
                            ))
                        )}
                    </ScriptBox>
                    <PageNum>
                        {pageNumber}/{pptImgString.length}
                    </PageNum>
                    <nav>
                        <CircleButton
                            color={selectedColor}
                            ariaLabel="다음 단락 버튼"
                            onClick={onClickNextButton}
                        />
                        <CircleButton
                            color={selectedColor}
                            ariaLabel="이전 단락 버튼"
                            onClick={onClickPrevButton}
                            styledCss={prevButtonCss}
                        />
                    </nav>
                </RightPage>
                {isPC && (
                    <Rnd
                        default={{
                            x: 300,
                            y: 430,
                            width: 620,
                            height: 348,
                        }}
                        minWidth={500}
                        minHeight={270}
                        maxWidth={830}
                        maxHeight={480}
                        bounds="window"
                    >
                        <PptImgBox>
                            {firstImageLoaded ? (
                                <img
                                    src={pptImgData[pageNumber - 1].src}
                                    draggable="false"
                                    alt="ppt 장표"
                                />
                            ) : (
                                <Spinner />
                            )}
                        </PptImgBox>
                    </Rnd>
                )}
            </BookBox>
        </ChapterPageWrapper>
    );
}
