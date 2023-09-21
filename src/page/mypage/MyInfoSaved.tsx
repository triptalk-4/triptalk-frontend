import { useState, useEffect } from 'react';
import styled from 'styled-components';

const postdata = [
  {
    imgSrc: 'img/postimg3.jpg',
    title: '경복궁 달빛기행',
    schedule: '23.09.07~23.09.10',
    date: '23.09.13',
  },
  {
    imgSrc: 'img/postimg1.jpg',
    title: '궁궐 달빛기행',
    schedule: '23.09.07~23.09.10',
    date: '23.09.11',
  },
];

export default function MyInfoSaved() {
  const [containerClassName, setContainerClassName] = useState('flex-start');

  useEffect(() => {
    if (postdata.length <= 2) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [postdata]);

  return (
    <PostContainer className={containerClassName}>
      {postdata.map((item, index) => (
        <BoxWrap key={index}>
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
      ))}
    </PostContainer>
  );
}

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
`;

const Box = styled.div`
  position: relative;
  width: 100%;
  height: auto;
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
