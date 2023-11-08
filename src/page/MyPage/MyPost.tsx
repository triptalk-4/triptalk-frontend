import styled from 'styled-components';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { BsEyeFill, BsFillSuitHeartFill } from 'react-icons/bs';

interface Post {
  id: number;
  thumbnail: string;
  title: string;
  createAt: number;
  likeCount: number;
  views: number;
  plannerId: number;
}

export default function MyPost({ postsData }: { postsData: Post }) {
  return (
    <BoxWrap>
      <Link to={`/page/${postsData.plannerId}`}>
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
}

const BoxWrap = styled.div`
  margin-right: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;

  &:nth-child(4n) {
    margin-right: 0;
  }
  @media (max-width: 1400px) {
    margin-right: 20px;
  }
  @media (max-width: 1250px) {
    margin-bottom: 20px;
  }
  @media (max-width: 1200px) {
    margin-right: 15px;
    margin-bottom: 15px;
  }
  @media (max-width: 1100px) {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 1050px) {
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(4n) {
      margin-right: 10px;
    }
  }
  @media (max-width: 1000px) {
    margin-right: 8px;
    margin-bottom: 8px;
    &:nth-child(4n) {
      margin-right: 8px;
    }
  }
  @media (max-width: 950px) {
    margin-right: 6px;
    margin-bottom: 6px;
    &:nth-child(4n) {
      margin-right: 6px;
    }
  }
  @media (max-width: 740px) {
    margin-right: 4px;
    margin-bottom: 4px;
    &:nth-child(4n) {
      margin-right: 4px;
    }
  }
`;

const Box = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const ImgDiv = styled.div`
  width: 275px;
  height: 350px;
  @media (max-width: 1400px) {
    width: 253px;
    height: 339px;
  }
  @media (max-width: 1250px) {
    width: 223px;
    height: 316px;
  }
  @media (max-width: 1150px) {
    width: 212px;
    height: 304px;
  }
  @media (max-width: 1100px) {
    width: 207px;
    height: 304px;
  }
  @media (max-width: 1050px) {
    width: 263px;
    height: 335px;
  }
  @media (max-width: 1030px) {
    width: 259px;
    height: 335px;
  }
  @media (max-width: 1000px) {
    width: 254px;
    height: 335px;
  }
  @media (max-width: 950px) {
    width: 232px;
    height: 300px;
  }
  @media (max-width: 900px) {
    width: 211px;
    height: 261px;
  }
  @media (max-width: 820px) {
    width: 195px;
    height: 249px;
  }
  @media (max-width: 740px) {
    width: 172px;
    height: 232px;
  }
  @media (max-width: 500px) {
    width: 124px;
    height: 161px;
  }
  @media (max-width: 430px) {
    width: 110px;
    height: 140px;
  }
  @media (max-width: 420px) {
    width: 105px;
    height: 131px;
  }
  @media (max-width: 390px) {
    width: 99px;
    height: 133px;
  }
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
  @media (max-width: 1100px) {
    width: 28px;
    height: 28px;
  }
  @media (max-width: 850px) {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 510px) {
    width: 16px;
    height: 16px;
  }
`;

const LookUp = styled(BsEyeFill)`
  width: 30px;
  height: 30px;
  @media (max-width: 1100px) {
    width: 28px;
    height: 28px;
  }
  @media (max-width: 850px) {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 510px) {
    width: 16px;
    height: 16px;
  }
`;

const TitleText = styled.h2`
  margin-top: 10%;
  font-size: 30px;
  @media (max-width: 1350px) {
    font-size: 26px;
  }
  @media (max-width: 1100px) {
    font-size: 22px;
  }
  @media (max-width: 850px) {
    font-size: 18px;
  }
  @media (max-width: 510px) {
    font-size: 14px;
  }
`;

const DateText = styled.p`
  position: absolute;
  bottom: 15px;
  left: 15px;
  @media (max-width: 1100px) {
    font-size: 14px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
  }
  @media (max-width: 510px) {
    font-size: 6px;
  }
`;
