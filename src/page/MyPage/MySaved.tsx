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
  margin-right: 64px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  @media (max-width: 1200px) {
    margin-right: 44px;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 1000px) {
    margin-right: 30px;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 983px) {
    margin-right: 30px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: 980px) {
    margin-right: 30px;
    &:nth-child(2n) {
      margin-right: 30px;
    }
  }

  @media (max-width: 768px) {
    margin-right: 30px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: 375px) {
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
  width: 275px;
  height: 350px;

  @media (max-width: 1200px) {
    width: 270px;
    height: 350px;
  }

  @media (max-width: 1130px) {
    width: 260px;
    height: 350px;
  }

  @media (max-width: 1092px) {
    width: 255px;
    height: 350px;
  }

  @media (max-width: 1074px) {
    width: 250px;
    height: 350px;
  }

  @media (max-width: 1054px) {
    width: 245px;
    height: 350px;
  }

  @media (max-width: 1036px) {
    width: 240px;
    height: 350px;
  }

  @media (max-width: 1036px) {
    width: 240px;
    height: 350px;
  }

  @media (max-width: 983px) {
    width: 375px;
    height: 450px;
  }

  @media (max-width: 980px) {
    width: 360px;
    height: 450px;
  }

  @media (max-width: 979px) {
    width: 355px;
    height: 450px;
  }

  @media (max-width: 967px) {
    width: 345px;
    height: 450px;
  }

  @media (max-width: 942px) {
    width: 335px;
    height: 450px;
  }

  @media (max-width: 780px) {
    width: 280px;
    height: 450px;
  }

  @media (max-width: 430px) {
    width: 340px;
    height: 450px;
  }

  @media (max-width: 375px) {
    width: 250px;
    height: 320px;
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
