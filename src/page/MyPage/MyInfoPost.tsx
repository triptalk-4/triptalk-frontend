import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import AnotherPlanner from './AnotherPlanner';
import MyPost from './MyPost';

interface userInfoDate {
  userId: number;
  name: string;
  profile: string;
  nickname: string;
  email: string;
  password: string;
  aboutMe: string;
  username: string;
  plannerId: number;
  id: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
}

interface AnotherPost {
  plannerId: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
}

interface anotheruserInfoDate {
  userId: number;
  nickname: string;
  aboutMe: string;
  profile: string;
  planners: PlannerDetails[];
}

interface PlannerDetails {
  plannerId: number;
  title: string;
  thumbnail: string;
  views: number;
  likeCount: number;
}

const PAGE_SIZE = 3;

export default function MyInfoPost({ userInfo }: { userInfo: userInfoDate }) {
  const [postsData, setPostsData] = useState<userInfoDate[]>([]); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isEndPage, setIsEndPage] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const token = useSelector((state: RootState) => state.token.token);
  const [page, setPage] = useState(0);

  const { userId } = useParams();
  const [anotherUserInfo, setAnotherUserInfo] = useState<anotheruserInfoDate>({
    userId: 0,
    nickname: '',
    aboutMe: '',
    profile: '',
    planners: [],
  });

  const anotherPlanners = anotherUserInfo.planners.map((planner: PlannerDetails) => ({
    plannerId: planner.plannerId,
    thumbnail: planner.thumbnail,
    title: planner.title,
    createAt: 0, // 임시 값
    likeCount: planner.likeCount,
    views: planner.views,
  }));
  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then(res => res.json())
  //     .then(data => {
  //       setPostsData(data.slice(0, 6)); // 처음에 6개게시물만 나오게 설정
  //     })
  //     .catch(error => console.error('가짜 API 요청 실패:', error));
  // }, []);

  
  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchSerch = async () => {
      try {
        const response = await axios.get(`/address/api/search/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          setAnotherUserInfo(response.data);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(내정보):', error);
      }
    };

    fetchSerch();
  }, [token, userId]);

  useEffect(() => {
    const fetchUserPost = async () => {
      if (isEndPage || isLoading) return;
      setIsLoading(true);
      const Access_token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/address/api/users/planners/byUser?${page}&pageSize=${PAGE_SIZE}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        setIsLoading(false);
        const newData = response.data.content;
        if (newData.length === 0) {
          setIsEndPage(true);
        } else {
          setPostsData(prevData => [...prevData, ...newData]);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('데이터 요청 실패:', error);
      }
    };
    console.log('게시물', postsData);
    fetchUserPost();
  }, [page, isEndPage]);

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (postsData.length >= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [postsData]);

  useEffect(() => {
    // IntersectionObserver 생성 및 초기화
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    observerRef.current = observer;
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

  // useEffect(() => {
  //   // IntersectionObserver 생성및 초기화
  //   const observer = new IntersectionObserver(handleIntersection, {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 1,
  //   });

  //   // 대상 엘리먼트를 관찰
  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }

  //   function handleIntersection(entries: IntersectionObserverEntry[]) {
  //     entries.forEach(entry => {
  //       if (entry && entry.isIntersecting) {
  //         // 현재 게시물 길이
  //         const startIndex = postsData.length;

  //         // 스크롤하면 3개씩 생성
  //         const endIndex = startIndex + 3;

  //         // msw를 통해 postsData에 데이터 추가
  //         fetch(`/api/posts?page=${endIndex / 3 + 1}`)
  //           .then(res => res.json())
  //           .then(data => {
  //             setIsLoading(true);

  //             // 새로운 데이터를 기존 데이터와 병합
  //             setPostsData(prevData => [...prevData, ...data.slice(startIndex, endIndex)]);
  //             setIsLoading(false);
  //           })
  //           .catch(error => console.error('데이터 요청 실패:', error));
  //       }
  //     });
  //   }

  //   return () => {
  //     if (targetRef.current) {
  //       observer.unobserve(targetRef.current);
  //     }
  //   };
  // }, [postsData]);

  return (
    <PostContainer className={containerClassName}>
      {userInfo.userId === anotherUserInfo.userId
        ? postsData.map(item => <MyPost key={item.plannerId} postsData={item} />)
        : anotherPlanners.map((aontherItem: AnotherPost) => (
            <AnotherPlanner key={aontherItem.plannerId} plannerData={aontherItem} />
          ))}
      {!isEndPage && <ObserverTarget ref={targetRef} />}
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
