import { useNavigate } from 'react-router';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBody = () => {
  const navigator = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [filteredResults, setFilteredResults] = useState<
    {
      profile: string;
      nickname: string;
      aboutMe: string;
      userId: number;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (keyword !== '') {
      timerId = setTimeout(async () => {
        const Access_token = localStorage.getItem('token');
        if (Access_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${Access_token}`,
            },
          };
          try {
            const response = await axios.get(
              `/address/api/search?keyword=${encodeURIComponent(keyword)}&pageNumber=1&pageSize=2`,
              config
            );
            if (response.status === 200) {
              setFilteredResults(response.data);
            } else {
              console.error('API 호출 실패:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
          }
        } else {
          console.error('토큰이 없습니다.');
        }
      }, 100);
    } else {
      setFilteredResults([]);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [keyword]);

  const paginatedResults = filteredResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  return (
    <>
      <Container>
        <BackBtn onClick={() => navigator(-1)} />
        <HeadWrap>
          <Input type="text" placeholder="닉네임을 입력해주세요" onChange={e => setKeyword(e.target.value)} />
          <SearchBtn />
        </HeadWrap>
      </Container>
      <BodyContainer>
        {paginatedResults.length > 0 ? (
          paginatedResults.map((result, index) => (
            <Link
              to={`/myinfo/${result.userId}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
              key={result.userId}>
              <ResultContainer key={index}>
                <ProfileAndName>
                  <ProfileImage src={result.profile} alt={`${result.nickname}의 프로필 사진`} />
                  <ResultItem>{result.nickname}</ResultItem>
                </ProfileAndName>
                <ResultDescription>{result.aboutMe}</ResultDescription>
              </ResultContainer>
            </Link>
          ))
        ) : (
          <NoResultContainer>검색 결과가 없습니다.</NoResultContainer>
        )}
        {filteredResults.length > resultsPerPage && (
          <Pagination>
            {Array.from({ length: Math.ceil(filteredResults.length / resultsPerPage) }, (_, index) => (
              <PageNumber
                key={index + 1}
                $isActive={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PageNumber>
            ))}
          </Pagination>
        )}
      </BodyContainer>
    </>
  );
};

export default SearchBody;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const BackBtn = styled(FaArrowLeft)`
  margin-right: 30px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const HeadWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${MAIN_COLOR};
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  &:focus {
    outline: none;
  }
`;
const SearchBtn = styled(BiSearch)`
  font-size: 1.5rem;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 800px;
  margin: 50px auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageNumber = styled.button<{ $isActive: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${props => (props.$isActive ? MAIN_COLOR : 'transparent')};
  border: 1px solid ${MAIN_COLOR};
  color: ${props => (props.$isActive ? 'white' : MAIN_COLOR)};
  &:hover {
    background-color: ${MAIN_COLOR};
    color: white;
  }
`;

const ProfileAndName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${MAIN_COLOR};
    color: white;
    border-radius: 25px;
  }
`;

const ResultItem = styled.div`
  padding: 0 8px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  &:hover {
    background-color: transparent;
    color: inherit;
  }
`;

const ResultDescription = styled.div`
  padding: 8px 12px;
  font-size: 16px;
  color: grey;
  margin-left: 60px;
`;

const NoResultContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
  border: 1px solid black;
`;
