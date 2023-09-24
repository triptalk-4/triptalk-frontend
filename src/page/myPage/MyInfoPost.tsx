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
  { id: 1, imgSrc: 'img/postimg1.jpg', title: '궁궐 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.11' },
  { id: 2, imgSrc: 'img/postimg2.jpg', title: '창덕궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.12' },
  { id: 3, imgSrc: 'img/postimg3.jpg', title: '경복궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.13' },
  { id: 4, imgSrc: 'img/postimg4.jpg', title: '창경궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.14' },
  { id: 5, imgSrc: 'img/postimg5.jpg', title: '경희궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.15' },
  { id: 6, imgSrc: 'img/postimg6.jpg', title: '덕수궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.16' },
  { id: 7, imgSrc: 'img/postimg3.jpg', title: '경복궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.17' },
  { id: 8, imgSrc: 'img/postimg2.jpg', title: '창덕궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.18' },
  { id: 9, imgSrc: 'img/postimg1.jpg', title: '궁궐 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.19' },
  { id: 10, imgSrc: 'img/postimg2.jpg', title: '창덕궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.20' },
  { id: 11, imgSrc: 'img/postimg5.jpg', title: '경희궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.21' },
  { id: 12, imgSrc: 'img/postimg1.jpg', title: '궁궐 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.22' },
  { id: 13, imgSrc: 'img/postimg2.jpg', title: '창덕궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.23' },
  { id: 14, imgSrc: 'img/postimg3.jpg', title: '경복궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.24' },
  { id: 15, imgSrc: 'img/postimg4.jpg', title: '창경궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.25' },
  { id: 16, imgSrc: 'img/postimg5.jpg', title: '경희궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.26' },
  { id: 17, imgSrc: 'img/postimg6.jpg', title: '덕수궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.27' },
  { id: 18, imgSrc: 'img/postimg1.jpg', title: '궁궐 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.28' },
  { id: 19, imgSrc: 'img/postimg4.jpg', title: '창경궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.29' },
  { id: 20, imgSrc: 'img/postimg5.jpg', title: '경희궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.30' },
  { id: 21, imgSrc: 'img/postimg6.jpg', title: '덕수궁 달빛기행', schedule: '23.09.07~23.09.10', date: '23.09.31' },
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

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (postdata.length <= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [postdata]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      // 스크롤이 아래로 내려가고 데이터가 현재 로딩 중이 아닌 경우
      setIsLoading(true);

      // 새로운 더미 데이터를 생성하고 리스트에 추가
      const newData = Array.from({ length: 3 }, (_, index) => ({
        id: data.length + index,
        imgSrc: `img/postimg5.jpg`,
        title: `게시물 ${data.length + index} 제목`,
        schedule: `일정: 23.09.${data.length + index}~23.09.${data.length + index + 1}`, // 일정 설정
        date: `날짜: 23.09.${data.length + index}`,
      }));

      setData(prevData => [...prevData, ...newData]);
      setIsLoading(false);
    }
  };

  return (
    <PostContainer className={containerClassName}>
      {data.map(item => (
        <Post key={item.id} item={item} />
      ))}
      {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
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
  font-size: 20px;
`;
