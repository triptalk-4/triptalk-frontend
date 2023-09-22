import { useNavigate } from 'react-router';

import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { FaArrowLeft } from 'react-icons/fa';



const SearchHead = () => {
  const navigator = useNavigate();

  return(
    <>
      <Container>
        <BackBtn onClick={() => navigator(-1)}/>
        <HeadWrap>
          <Input type="text" placeholder='여행지 검색'/>
          <SearchBtn />
        </HeadWrap>
      </Container>
    </>
  )
}

export default SearchHead

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`

const BackBtn = styled(FaArrowLeft)`
  margin-right: 30px;
  font-size: 1.5rem;
  cursor: pointer;
`

const HeadWrap = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${MAIN_COLOR};
`

const Input = styled.input`
  width: 70%;
  height: 40px;
  &:focus{
    outline: none;
  }
`
const SearchBtn = styled(BiSearch)`
  font-size: 1.5rem;
`