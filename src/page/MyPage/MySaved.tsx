import styled from 'styled-components';
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

export default function MySaved({ savedData }: { savedData: Save }) {
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
            <DateText>{formatDate(savedData.createAt)}</DateText>
          </Info>
        </Box>
      </Link>
    </BoxWrap>
  );
}

const BoxWrap = styled.div`
  margin-right: 27px;
  margin-bottom: 20px;
  border: 1px solid #c1c1c1;
  border-radius: 15px;

  &:nth-child(3n) {
    margin-right: 0;
  }
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
