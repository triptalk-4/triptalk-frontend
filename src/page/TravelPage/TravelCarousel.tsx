import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';

export default function TravelCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        <ImgContainer>
          <ImgDiv to="/schedule">
            <TravelImg src="img/Travelimg1.jpg" alt="여행이미지" />
          </ImgDiv>
          <TextDiv>
            <TitleText>디저트 여행</TitleText>
            <AddressText>디저트 여행</AddressText>
            <InfoText>디저트 여행</InfoText>
            <DataText>디저트 여행</DataText>
          </TextDiv>
        </ImgContainer>
        <ImgContainer>
          <h3>2</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>3</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>4</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>5</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>6</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>7</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>8</h3>
        </ImgContainer>
        <ImgContainer>
          <h3>9</h3>
        </ImgContainer>
      </Slider>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ImgContainer = styled.div`
  margin: 0 15px;
`;

const ImgDiv = styled(Link)``;

const TravelImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
`;

const TextStyled = css`
  color: #fff;
`;

const TitleText = styled.h2`
  ${TextStyled}
`;
const AddressText = styled.h2`
  ${TextStyled}
`;
const InfoText = styled.h2`
  ${TextStyled}
`;
const DataText = styled.h2`
  ${TextStyled}
`;
