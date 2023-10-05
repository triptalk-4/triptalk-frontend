import styled from 'styled-components';

export interface SavedItem {
  id: number;
  imgSrc: string;
  title: string;
  schedule: string;
  date: string;
}

export default function MySaved({ item }: { item: SavedItem }) {
  return (
    <BoxWrap>
      <Box>
        <ImgDiv>
          <TextImg src={item.imgSrc} alt="첫번째 이미지" />
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
