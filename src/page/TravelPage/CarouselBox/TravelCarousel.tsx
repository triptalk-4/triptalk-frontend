import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';
import CustomNextArrow from './CustomNextArrow';
import CustomPrevArrow from './CustomPrevArrow';
import { useState } from 'react';

interface PostItem {
  id: number;
  imgSrc: string;
  title: string;
  address: string;
  date: string;
  nickname: string;
}

const postdata: PostItem[] = [
  {
    id: 1,
    imgSrc: 'img/Travelimg1.jpg',
    title: '디저트 여행',
    address: '대전광역시 중구 대종로 480번길 15',
    date: '23.09.11',
    nickname: '도토리',
  },
  {
    id: 2,
    imgSrc: 'img/Travelimg2.jpg',
    title: '디저트 여행2',
    address: '대전광역시 중구 대종로 480번길 15',
    date: '23.09.12',
    nickname: '도토리12',
  },
  {
    id: 3,
    imgSrc: 'img/Travelimg5.jpg',
    title: '디저트 여행3',
    address: '대전광역시 중구 대종로 480번길 15',
    date: '23.09.13',
    nickname: '도토리23',
  },
  {
    id: 4,
    imgSrc: 'img/Travelimg2.jpg',
    title: '디저트 여행',
    address: '대전광역시 중구 대종로 480번길 15',
    date: '23.09.14',
    nickname: '도토리34',
  },
  {
    id: 5,
    imgSrc: 'img/Travelimg5.jpg',
    title: '디저트 여행2',
    address: '대전광역시 중구 대종로 480번길 15',
    date: '23.09.15',
    nickname: '도토리45',
  },
  {
    id: 6,
    imgSrc: 'img/Travelimg1.jpg',
    title: '디저트 여행3',
    address: '대전광역시 중구 대종로 480번길 15',
    date: '23.09.16',
    nickname: '도토리56',
  },
];

export default function TravelCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: (
      <CustomNextArrow
        disabled={currentSlide === postdata.length - 3}
        onClick={() => setCurrentSlide(currentSlide + 1)}
      />
    ),
    prevArrow: <CustomPrevArrow disabled={currentSlide === 0} onClick={() => setCurrentSlide(currentSlide - 1)} />,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {postdata.map(item => (
          <ImgContainer key={item.id}>
            <ImgDiv>
              <ImgLink to="/schedule">
                <TravelImg src={item.imgSrc} alt="여행이미지" />
              </ImgLink>
            </ImgDiv>
            <TextDiv>
              <TitleText>{item.title}</TitleText>
              <InfoText>{item.nickname}</InfoText>
              <AddressText>{item.address}</AddressText>
              <DataText>{item.date}</DataText>
            </TextDiv>
          </ImgContainer>
        ))}
      </Slider>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImgContainer = styled.div`
  padding: 30px;
  position: relative;
`;

const ImgDiv = styled.div``;

const ImgLink = styled(Link)``;

const TravelImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextDiv = styled.div`
  position: absolute;
  display: grid;
  justify-items: stretch;
  text-align: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  bottom: 0;
  width: 320px;
`;

const TextStyled = css`
  color: #fff;
`;

const TitleText = styled.h2`
  ${TextStyled}
  font-size: 25px;
  font-weight: 700;
`;
const AddressText = styled.h2`
  ${TextStyled}
  text-align: left;
`;
const InfoText = styled.p`
  ${TextStyled}
`;
const DataText = styled.p`
  ${TextStyled} font-weight: 300;
`;
