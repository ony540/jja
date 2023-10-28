import React, { useState } from 'react';
import data from '../../db/chapter.json';
import bookShelfImg from '../../assets/images/bookShelf.png';
import { useNavigate } from 'react-router-dom';
import { BookItem, BookList, MainWrapper } from './MainPageStyle';

export default function MainPage() {
    const navigate = useNavigate();
    const [isFadeOut, setIsFadeOut] = useState(false);
    const [selectedBook, setSelectedBook] = useState(0);

    const handleClickBookOpen = (content, index) => {
        setIsFadeOut(true);
        setSelectedBook(index);
        const timer = () =>
            setTimeout(() => {
                navigate(
                    `/${content.title
                        .replaceAll(' ', '-')
                        .replaceAll('/', ',')}/index`,
                );
            }, 500);
        timer();
        return () => {
            clearTimeout(timer);
        };
    };

    return (
        <>
            <MainWrapper bookShelfImg={bookShelfImg} isFadeOut={isFadeOut}>
                <BookList bookShelfImg={bookShelfImg} isFadeOut={isFadeOut}>
                    {data.contentList.map((content, index) => (
                        <BookItem
                            key={content.id}
                            bgUrl={`./img/spine/spine${content.id}.png`}
                            onClick={e =>
                                handleClickBookOpen(content, index + 1)
                            }
                            isFadeOut={isFadeOut}
                            selectedBook={selectedBook}
                        >
                            <button>
                                <span>
                                    {String(content.id).padStart(2, '0')}
                                </span>
                                <h2> {content.title}</h2>
                            </button>
                        </BookItem>
                    ))}
                </BookList>
            </MainWrapper>
        </>
    );
}
