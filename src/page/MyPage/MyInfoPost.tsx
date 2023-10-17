import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { BsEyeFill, BsFillSuitHeartFill } from 'react-icons/bs';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
  plannerId: number;
}

export default function MyInfoPost() {
  const [postsData, setPostsData] = useState<Post[]>([]); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const targetRef = useRef<HTMLDivElement | null>(null);

  const token = useSelector((state: RootState) => state.token.token);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  // const [hasMoreData, setHasMoreData] = useState(true);

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
    const fetchUserPost = async () => {
      try {
        const response = await axios.get(`/address/api/users/planners/byUser?${page}&pageSize=6`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { content } = response.data;
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
          setPage(prevPage => prevPage + 1);
          setPageSize(prevPageSize => prevPageSize + 3);

          setIsLoading(true);

          const Access_token = localStorage.getItem('token');

          axios
            .get(`/address/api/posts?page=${page}&pageSize=${pageSize}`, {
              headers: {
                Authorization: `Bearer ${Access_token}`,
              },
            })
            .then(response => {
              setIsLoading(false);
              const newData = response.data.content;
              setPostsData(prevData => [...prevData, ...newData]);
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
      {postsData.map(item => (
        <MyPost key={item.plannerId} postsData={item} />
      ))}
      <ObserverTarget ref={targetRef} />
      {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
    </PostContainer>
  );
}

const MyPost = ({ postsData }: { postsData: Post }) => {
  return (
    <BoxWrap>
      <Link to={`/page/${postsData.plannerId}`} key={postsData.plannerId}>
        <Box>
          <ImgDiv>
            <TextImg src={postsData.thumbnail} alt="첫번째 이미지" />
          </ImgDiv>
          <Info>
            <TopContainer>
              <IconWithCount>
                <Heart />
                <Count>{postsData.likeCount}</Count>
              </IconWithCount>
              <IconWithCount>
                <LookUp />
                <Count>{postsData.views}</Count>
              </IconWithCount>
            </TopContainer>
            <TitleText>{postsData.title}</TitleText>
            <DateText>{formatDate(postsData.createAt)}</DateText>
          </Info>
        </Box>
      </Link>
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

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const IconWithCount = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Count = styled.div`
  margin-left: 5px;
`;

const Heart = styled(BsFillSuitHeartFill)`
  width: 30px;
  height: 30px;
`;

const LookUp = styled(BsEyeFill)`
  width: 30px;
  height: 30px;
`;

const TitleText = styled.h2`
  margin-top: 10%;
  font-size: 30px;
`;

const DateText = styled.p`
  position: absolute;
  bottom: 15px;
  left: 15px;
`;
