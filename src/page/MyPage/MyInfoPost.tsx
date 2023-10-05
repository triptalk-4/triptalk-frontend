import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PostItem {
  id: number;
  imgSrc: string;
  title: string;
  schedule: string;
  date: string;
}

const postdata: PostItem[] = [
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

// 게시물 컴포넌트
function Post({ item }: { item: PostItem }) {
  return (
    <BoxWrap>
      <Box>
        <ImgDiv>
          <TextImg src={item.imgSrc} alt="대표이미지" />
        </ImgDiv>
        <Info>
          <TitleText>{item.title}</TitleText>
          <ScheduleeText>{item.schedule}</ScheduleeText>
          <DateText>{item.date}</DateText>
        </Info>
      </Box>
    </BoxWrap>
  );
}

function MyInfoPost() {
  const [containerClassName, setContainerClassName] = useState('flex-start');
  const [data, setData] = useState(postdata.slice(0, 6)); // 초기에 게시물 6개 보이게하기
  const [isLoading, setIsLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (postdata.length <= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [postdata]);

  useEffect(() => {
    // 스크롤 감지
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      // 스크롤이 아래로 내려가고 데이터가 현재 로딩 중이 아닌 경우
      setIsLoading(true);

      // 보이는 데이터의 끝 인덱스 계산
      const endIndex = data.length + 3;

      // 끝 인덱스가 전체 데이터의 길이를 넘어가지 않도록 확인
      if (endIndex <= postdata.length) {
        const moreData = postdata.slice(data.length, endIndex);
        setData(prevData => [...prevData, ...moreData]);
      } else {
        // 모든 데이터를 로드한 경우
        setAllDataLoaded(true);
      }

      setIsLoading(false);
    }
  };

  return (
    <PostContainer className={containerClassName}>
      {data.map(item => (
        <Post key={item.id} item={item} />
      ))}
      {isLoading && !allDataLoaded && <LoadingMessage>Loading...</LoadingMessage>}
    </PostContainer>
  );
}

export default MyInfoPost;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  margin-bottom: 20px;

  &.flex-start {
    justify-content: flex-start;
  }

  &.space-between {
    justify-content: space-between;
  }
`;

const BoxWrap = styled.div`
  margin-right: 20px;
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

const LoadingMessage = styled.p`
  font-size: 50px;
`;
