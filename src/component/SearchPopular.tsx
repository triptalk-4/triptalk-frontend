import styled from 'styled-components';
import { MAIN_COLOR } from '../color/color';

const list = [{ place: '서울' }, { place: '부산' }, { place: '인천' }, { place: '제주' }];
// 나중에 useEffect로 받아와야 하지 않을까... 라는 생각을 적어봅니다.
const SearchPopular = () => {
  return (
    <Container>
      <Title>인기 검색</Title>
      <Ul>
        {list.map((place, index) => (
          <List key={index}>{place.place}</List>
        ))}
      </Ul>
    </Container>
  );
};

export default SearchPopular;

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 500;
`;

const Ul = styled.ul`
  display: flex;
  width: 40%;
  color: #fff;
`;

const List = styled.li`
  width: 116px;
  margin-top: 16px;
  margin-right: 20px;
  border-radius: 5px;
  background-color: ${MAIN_COLOR};
  padding: 10px;
  text-align: center;
`;
