import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MyPost from './MyPost';

const postdata = [
  { id: 1, imgSrc: 'img/postimg1.jpg', title: '궁궐 달빛기행 1', schedule: '23.09.07~23.09.10', date: '23.09.11' },
  { id: 2, imgSrc: 'img/postimg2.jpg', title: '창덕궁 달빛기행 2', schedule: '23.09.13~23.09.15', date: '23.09.12' },
  { id: 3, imgSrc: 'img/postimg3.jpg', title: '경복궁 달빛기행 3', schedule: '23.09.16~23.09.18', date: '23.09.13' },
  { id: 4, imgSrc: 'img/postimg4.jpg', title: '창경궁 달빛기행 4', schedule: '23.09.19~23.09.21', date: '23.09.14' },
  { id: 5, imgSrc: 'img/postimg5.jpg', title: '경희궁 달빛기행 5', schedule: '23.09.22~23.09.24', date: '23.09.15' },
  { id: 6, imgSrc: 'img/postimg6.jpg', title: '덕수궁 달빛기행 6', schedule: '23.09.25~23.09.27', date: '23.09.16' },
  { id: 7, imgSrc: 'img/postimg3.jpg', title: '창덕궁 달빛기행 7', schedule: '23.09.28~23.09.30', date: '23.09.17' },
  { id: 8, imgSrc: 'img/postimg2.jpg', title: '경복궁 달빛기행 8', schedule: '23.10.01~23.10.03', date: '23.09.18' },
  { id: 9, imgSrc: 'img/postimg1.jpg', title: '대한민국 달빛기행 9', schedule: '23.10.04~23.10.06', date: '23.09.19' },
  { id: 10, imgSrc: 'img/postimg2.jpg', title: '창경궁 달빛기행 10', schedule: '23.10.07~23.10.09', date: '23.09.20' },
  { id: 11, imgSrc: 'img/postimg5.jpg', title: '경희궁 달빛기행 11', schedule: '23.09.07~23.09.10', date: '23.09.21' },
  {
    id: 12,
    imgSrc: 'img/postimg1.jpg',
    title: '동경루 오픈 기념 특별관람',
    schedule: '23.09.22~23.09.24',
    date: '23.09.22',
  },
  {
    id: 13,
    imgSrc: 'img/postimg2.jpg',
    title: '국립고궁박물관 고전음악회',
    schedule: '23.09.23~23.09.25',
    date: '23.09.23',
  },
  { id: 14, imgSrc: 'img/postimg3.jpg', title: '서울 아트 쇼', schedule: '23.09.24~23.09.26', date: '23.09.24' },
  {
    id: 15,
    imgSrc: 'img/postimg4.jpg',
    title: '서울 시립 미술관 현대미술관',
    schedule: '23.09.25~23.09.27',
    date: '23.09.25',
  },
  { id: 16, imgSrc: 'img/postimg5.jpg', title: '서울 타워 뷰맛집', schedule: '23.09.26~23.09.28', date: '23.09.26' },
  { id: 17, imgSrc: 'img/postimg6.jpg', title: '서울 쇼핑 투어', schedule: '23.09.27~23.09.29', date: '23.09.27' },
  { id: 18, imgSrc: 'img/postimg1.jpg', title: '테마파크 투어', schedule: '23.09.28~23.09.30', date: '23.09.28' },
  { id: 19, imgSrc: 'img/postimg4.jpg', title: '서울 자전거 투어', schedule: '23.09.29~23.10.01', date: '23.09.29' },
  { id: 20, imgSrc: 'img/postimg5.jpg', title: '한강 물놀이', schedule: '23.09.30~23.10.02', date: '23.09.30' },
];

export default function MyInfoPost() {
  // const [postsData, setPostsData] = useState({
  //   id: '',
  //   imgSrc: '',
  //   title: '',
  //   schedule: '',
  //   date: '',
  // }); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [data, setData] = useState(postdata.slice(0, 6)); // 초기에 게시물 6개 보이게하기
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const targetRef = useRef(null);

  // useEffect(() => {
  //   fetch('/api/myinfo')
  //     .then(res => res.json())
  //     .then(data => setPostsData(data)) // userData 상태를 업데이트
  //     .catch(error => console.error('가짜 API 요청 실패:', error));
  // }, []);

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (postdata.length >= 3) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [postdata]);

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
          const moreData = postdata.slice(startIndex, endIndex);

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
    <PostContainer className={containerClassName}>
      {data.map(item => (
        <MyPost key={item.id} item={item} />
      ))}
      <ObserverTarget ref={targetRef} />
      {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
    </PostContainer>
  );
}

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
