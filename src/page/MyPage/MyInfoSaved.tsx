import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MySaved from './MySaved';

interface Save {
  id: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
  plannerId: number;
}

const PAGE_SIZE = 3; // 3개씩 들고오게하기위해

export default function MyInfoSaved() {
  const [savedData, setSavedData] = useState<Save[]>([]); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isEndPage, setIsEndPage] = useState(false); // 페이지 끝 상태
  const targetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   fetch('/address/api/saved')
  //     .then(res => res.json())
  //     .then(data => {
  //       setSavedData(data.slice(0, 6));
  //     })
  //     .catch(error => console.error('가짜 API 요청 실패:', error));
  // }, []);

  useEffect(() => {
    const fetchUserSaved = async () => {
      if (isEndPage || 0 === page) return;
      setIsLoading(true);
      const Access_token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/address/api/users/planners/userSave?page=${page}&pageSize=${PAGE_SIZE}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        setIsLoading(false);
        const newData = response.data.content;
        if (newData.length === 0) {
          setIsEndPage(true);
        } else {
          const threeItems = newData.slice(0, PAGE_SIZE);
          setSavedData(prevData => [...prevData, ...threeItems]);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('데이터 요청 실패:', error);
      }
    };

    fetchUserSaved();
  }, [page, isEndPage]);

  useEffect(() => {
    if (savedData.length >= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [savedData]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });
    observerRef.current = observer; // useRef로 observer 저장
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [page, isLoading]);

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isLoading) {
        setPage(prevPage => {
          if (!isLoading) {
            return prevPage + 1;
          }
          return prevPage;
        });
        if (targetRef.current && observerRef.current) {
          observerRef.current.unobserve(targetRef.current);
        }
      }
    });
  }

  return (
    <SavedContainer className={containerClassName}>
      {savedData.map(item => (
        <MySaved key={item.plannerId} savedData={item} />
      ))}
      {!isEndPage && <ObserverTarget ref={targetRef} />}
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
