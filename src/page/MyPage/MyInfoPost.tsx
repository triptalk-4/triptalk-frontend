import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Post {
  id: number;
  imgSrc: string;
  title: string;
  schedule: string;
  date: string;
}

export default function MyInfoPost() {
  const [postsData, setPostsData] = useState<Post[]>([]); // msw
  //  const [hasMoreData, setHasMoreData] = useState(true); // 초기에는 더 많은 데이터가 있다고 가정
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  // const [defaultPost, setDefaultPost] = useState<Post[]>([]);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPostsData(data.slice(0, 6)); // 처음에 6개게시물만 나오게 설정
      })
      .catch(error => console.error('가짜 API 요청 실패:', error));
  }, []);

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (postsData.length >= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [postsData]);

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
        if (entry && entry.isIntersecting) {
          // 현재 게시물 길이
          const startIndex = postsData.length;

          // 스크롤하면 3개씩 생성
          const endIndex = startIndex + 3;

          // msw를 통해 postsData에 데이터 추가
          fetch(`/api/posts?page=${endIndex / 3 + 1}`)
            .then(res => res.json())
            .then(data => {
              setIsLoading(true);

              // 새로운 데이터를 기존 데이터와 병합
              setPostsData(prevData => [...prevData, ...data.slice(startIndex, endIndex)]);
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
  }, [postsData]);

  return (
    <PostContainer className={containerClassName}>
      {postsData.map(item => (
        <MyPost key={item.id} postsData={item} />
      ))}
      <ObserverTarget ref={targetRef} />
      {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
    </PostContainer>
  );
}

const MyPost = ({ postsData }: { postsData: Post }) => {
  return (
    <BoxWrap>
      <Box>
        <ImgDiv>
          <TextImg src={postsData.imgSrc} alt="첫번째 이미지" />
        </ImgDiv>
        <Info>
          <TitleText>{postsData.title}</TitleText>
          <ScheduleeText>{postsData.schedule}</ScheduleeText>
          <DateText>{postsData.date}</DateText>
        </Info>
      </Box>
    </BoxWrap>
  );
};

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  margin-bottom: 20px;
  align-items: center;

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
