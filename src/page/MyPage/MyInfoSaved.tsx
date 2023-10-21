import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import axios from 'axios';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { BsEyeFill, BsFillSuitHeartFill } from 'react-icons/bs';

interface Save {
  id: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
  plannerId: number;
}

export default function MyInfoSaved() {
  const [savedData, setSavedData] = useState<Save[]>([]); // msw
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const targetRef = useRef<HTMLDivElement | null>(null);

  const token = useSelector((state: RootState) => state.token.token);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  // useEffect(() => {
  //   fetch('/address/api/saved')
  //     .then(res => res.json())
  //     .then(data => {
  //       setSavedData(data.slice(0, 6));
  //     })
  //     .catch(error => console.error('가짜 API 요청 실패:', error));
  // }, []);

  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchUserPost = async () => {
      try {
        const response = await axios.get(`/address/api/users/planners/userSave?${page}&pageSize=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { content } = response.data;
          setSavedData(content);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(저장함):', error);
      }
    };
    console.log('저장함', savedData);
    fetchUserPost();
  }, [token, page, pageSize]);

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
          const nextPage = page + 1;

          setPageSize(prevPageSize => prevPageSize + 3);

          setIsLoading(true);

          const Access_token = localStorage.getItem('token');

          axios
            .get(`/address/api/users/planners/userSave?page=${nextPage}&pageSize=${pageSize}`, {
              headers: {
                Authorization: `Bearer ${Access_token}`,
              },
            })
            .then(response => {
              console.log(response.data);
              setIsLoading(false);
              const newData = response.data.content;
              const ThreeItems = newData.slice(0, 3);
              setSavedData(prevData => [...prevData, ...ThreeItems]);
              setPage(nextPage);
              // setPageSize(nextPageSize);
            })
            .catch(error => console.error('데이터 요청 실패:', error));
        }
      });
    }
    console.log('savedData', savedData);
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
      {!isLoading && <ObserverTarget ref={targetRef} />}
      {!isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
    </SavedContainer>
  );
}

const MySaved = ({ savedData }: { savedData: Save }) => {
  return (
    <BoxWrap>
      <Link to={`/page/${savedData.plannerId}`} key={savedData.plannerId}>
        <Box>
          <ImgDiv>
            <TextImg src={savedData.thumbnail} alt="첫번째 이미지" />
          </ImgDiv>
          <Info>
            <TopContainer>
              <IconWithCount>
                <Heart />
                <Count>{savedData.likeCount}</Count>
              </IconWithCount>
              <IconWithCount>
                <LookUp />
                <Count>{savedData.views}</Count>
              </IconWithCount>
            </TopContainer>
            <TitleText>{savedData.title}</TitleText>
            <ScheduleeText>{savedData.title}</ScheduleeText>
            <DateText>{formatDate(savedData.createAt)}</DateText>
          </Info>
        </Box>
      </Link>
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
