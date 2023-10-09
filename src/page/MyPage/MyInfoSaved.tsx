import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Save {
  id: number;
  imgSrc: string;
  title: string;
  schedule: string;
  date: string;
}

export default function MyInfoSaved() {
  const [savedData, setSavedData] = useState<Save[]>([]); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const targetRef = useRef(null);

  useEffect(() => {
    fetch('/api/saved')
      .then(res => res.json())
      .then(data => {
        setSavedData(data.slice(0, 6));
      })
      .catch(error => console.error('가짜 API 요청 실패:', error));
  }, []);

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
      threshold: 1,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const startIndex = savedData.length;

          const endIndex = startIndex + 3;

          fetch(`/api/saved?page=${endIndex / 3 + 1}`)
            .then(res => res.json())
            .then(data => {
              setIsLoading(true);

              setSavedData(prevData => [...prevData, ...data.slice(startIndex, endIndex)]);
              setIsLoading(false);
            })
            .catch(error => console.error('데이터 요청 실패:', error));
        }
      });
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [savedData]);

  return (
    <SavedContainer className={containerClassName}>
      {savedData.map(item => (
        <MySaved key={item.id} savedData={item} />
      ))}
      <ObserverTarget ref={targetRef} />
      {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
    </SavedContainer>
  );
}

const MySaved = ({ savedData }: { savedData: Save }) => {
  return (
    <BoxWrap>
      <Box>
        <ImgDiv>
          <TextImg src={savedData.imgSrc} alt="첫번째 이미지" />
        </ImgDiv>
        <Info>
          <TitleText>{savedData.title}</TitleText>
          <ScheduleeText>{savedData.schedule}</ScheduleeText>
          <DateText>{savedData.date}</DateText>
        </Info>
      </Box>
    </BoxWrap>
  );
};

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

const BoxWrap = styled.div`
  margin-right: 30px;
  margin-bottom: 20px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  /* @media screen {
    &:nth-child(2n) {
      margin-right: 0;
    }
  } */
`;

const Box = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const ImgDiv = styled.div`
  width: 300px;
  height: 350px;
`;
const TextImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 30px;
  border-radius: 15px;
`;

const Info = styled.div`
  color: #fff;
  position: absolute;
  border-radius: 15px;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.35s ease-in-out;

  ${Box}:hover & {
    opacity: 1;
  }
`;

const TitleText = styled.h2`
  font-size: 30px;
`;

const ScheduleeText = styled.h5`
  font-size: 20px;
  font-weight: 500;
`;

const DateText = styled.p`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;
