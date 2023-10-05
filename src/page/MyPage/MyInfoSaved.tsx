import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MySaved from './MySaved';

const savedata = [
  { id: 1, imgSrc: 'img/postimg1.jpg', title: '궁궐 달빛기행 1', schedule: '23.09.07~23.09.10', date: '23.09.11' },
  { id: 2, imgSrc: 'img/postimg2.jpg', title: '창덕궁 달빛기행 2', schedule: '23.09.13~23.09.15', date: '23.09.12' },
];

export default function MyInfoSaved() {
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [data, setData] = useState(savedata.slice(0, 6)); // 초기에 게시물 6개 보이게하기
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const targetRef = useRef(null);

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (savedata.length >= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [savedata]);

  useEffect(() => {
    // IntersectionObserver 생성및 초기화
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    });

    // 대상 엘리먼트를 관찰
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 현재 게시물 길이
          const startIndex = data.length;

          // 스크롤하면 3개씩 생성
          const endIndex = startIndex + 3;
          const moreData = savedata.slice(startIndex, endIndex);

          setIsLoading(true);

          // 새로운 데이터를 기존 데이터와 병합
          setData(prevData => [...prevData, ...moreData]);
          setIsLoading(false);
        }
      });
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [data]);

  return (
    <SavedContainer className={containerClassName}>
      {data.map(item => (
        <MySaved key={item.id} item={item} />
      ))}
      <ObserverTarget ref={targetRef} />
      {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
    </SavedContainer>
  );
}

const SavedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: auto;
  margin-bottom: 20px;

  &.flex-start {
    justify-content: flex-start;
  }

  &.space-between {
    justify-content: space-between;
  }
`;

const ObserverTarget = styled.div`
  width: 100%;
  height: 1px; /* 교차 영역을 감지할 빈 요소 */
`;

const LoadingMessage = styled.p`
  font-size: 36px;
  font-weight: bold;
`;
