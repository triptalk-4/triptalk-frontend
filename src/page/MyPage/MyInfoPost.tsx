import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { BsEyeFill, BsFillSuitHeartFill } from 'react-icons/bs';
import formatDate from '../../utils/formatDate';
import { Link, useParams } from 'react-router-dom';
import AnotherPlanner from './AnotherPlanner';
import MyPost from './MyPost';

interface Post {
  id: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
  plannerId: number;
}

interface AnotherPost {
  plannerId: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
}

const PAGE_SIZE = 3;

export default function MyInfoPost() {
  const [postsData, setPostsData] = useState<Post[]>([]); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isEndPage, setIsEndPage] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const token = useSelector((state: RootState) => state.token.token);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const { userId } = useParams();
  const [userUniqueId, setUserUniqueId] = useState('');
  const [anotherUserId, setAnotherUserId] = useState('');
  const [anotherPlanners, setAnotherPlanners] = useState<AnotherPost[]>([]);

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
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/address/api/users/profile', {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { userId } = response.data;
          setUserUniqueId(userId);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(내정보):', error);
      }
    };

    fetchUserInfo();
  }, [token]);

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
          const { userId, planners } = response.data;
          setAnotherUserId(userId);
          setAnotherPlanners(planners);
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
    const Access_token = localStorage.getItem('token');
    const fetchUserPost = async () => {
      try {
        const response = await axios.get(`/address/api/users/planners/byUser?${page}&pageSize=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { content } = response.data;
          if (content > PAGE_SIZE) {
            setIsEndPage(true);
          }
          setPostsData(content);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(포스트):', error);
      }
    };
    console.log('게시물', postsData);
    fetchUserPost();
  }, [token, page, pageSize]);

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
      threshold: 1,
    });

    // 대상 엘리먼트를 관찰
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry && entry.isIntersecting) {
          const nextPage = page + 1;
          //const nextPageSize = pageSize + 3;
          setPageSize(prevPageSize => prevPageSize + PAGE_SIZE);

          setIsLoading(true);

          const Access_token = localStorage.getItem('token');

          axios
            .get(`/address/api/users/planners/byUser?page=${nextPage}&pageSize=${pageSize}`, {
              headers: {
                Authorization: `Bearer ${Access_token}`,
              },
            })
            .then(response => {
              setIsLoading(true);
              const newData = response.data.content;
              const ThreeItems = newData.slice(0, PAGE_SIZE);
              setPostsData(prevData => [...prevData, ...ThreeItems]);
              setPage(nextPage);
              // setPageSize(nextPageSize);
            })
            .catch(error => console.error('데이터 요청 실패:', error));
        }
      });
      console.log('postsData', postsData);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

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
      {userUniqueId === anotherUserId
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
