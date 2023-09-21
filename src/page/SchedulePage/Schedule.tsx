import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import SecheduleSelect from '../../component/SecheduleSelect/SecheduleSelect';

function Schedule() {
  // 9개의 길이의 인덱스를 생성 처음에 보여지는 숫자
  const initialData = Array.from({ length: 9 }, (_, index) => ({
    id: index
  }));

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      // 스크롤이 아래로 내려가고 데이터가 현재 로딩 중이 아닌 경우
      setIsLoading(true);

      // 새로운 더미 데이터를 생성하고 리스트에 추가합니다.
      setTimeout(() => {
        const newData = Array.from({ length: 3 }, (_, index) => ({
          id: data.length + index
        }));

        setData(prevData => [...prevData, ...newData]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <Header />
      <MainContainer>
        <TitleContainer>
          <Title>여러분의 일정을 보여주세요!</Title>
          <SelectBox>
            <SecheduleSelect />
          </SelectBox>
        </TitleContainer>
        <GridContainer>
          {data.map(item => (
            <Link to={`/page/${item.id}`} key={item.id}>
              <Post></Post>
            </Link>
          ))}
        </GridContainer>
        {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
      </MainContainer>
    </>
  );
}

export default Schedule;

// 나머지 스타일 및 컴포넌트 정의는 이전 답변과 동일합니다.
const MainContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  margin-top: 40px;
`;

const Title = styled.div`
  margin-right: 30px;
  font-size: 26px;
  font-weight: bold;
  margin-top: 2px;
`;

const SelectBox = styled.div`
  width: 200px;
  height: 100px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Post = styled.div`
  width: 100%;
  height: 350px;
  background-color: #d5d5fa;
`;
const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #333;
`;
