import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return <PrevArrowButton onClick={onClick}>{'<'}</PrevArrowButton>;
}

function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return <NextArrowButton onClick={onClick}>{'>'}</NextArrowButton>;
}

function MainCarousel() {
  const data = [
    {
      title: '양양 2박 여행',
      nickname: '제로베이스',
      schedule: '2023~09.15~2023.09.17',
      imageUrl: 'img/Carousel.png',
    },
    {
      title: '속초 2박 여행',
      nickname: '프론트',
      schedule: '2023~09.22~2023.09.25',
      imageUrl: 'img/Carousel.png',
    },
    {
      title: '제주 2박 여행',
      nickname: '백엔드',
      schedule: '2023~09.01~2023.09.03',
      imageUrl: 'img/Carousel.png',
    },
    {
      title: '광주 2박 여행',
      nickname: '리액트',
      schedule: '2023~08.21~2023.08.23',
      imageUrl: 'img/Carousel.png',
    },
    {
      title: '부산 2박 여행',
      nickname: '스프링',
      schedule: '2023~07.23~2023.08.25',
      imageUrl: 'img/Carousel.png',
    },
    {
      title: '대구 2박 여행',
      nickname: '마리아DB',
      schedule: '2023~09.15~2023.09.17',
      imageUrl: 'img/Carousel.png',
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Card key={index}>
            <Image src={item.imageUrl} alt="img" />
            <DescriptionTitle>{item.title}</DescriptionTitle>
            <DescriptionNickName>{item.nickname}</DescriptionNickName>
            <DescriptionSchedule>{item.schedule}</DescriptionSchedule>
          </Card>
        ))}
      </Slider>
    </Container>
  );
}

export default MainCarousel;

const Container = styled.div`
  width: 100%;
  height: 400px;
`;

const Card = styled.div`
  width: 300px;
  height: 400px;
  margin: 0 10px;
`;

const PrevArrowButton = styled.div`
  width: 50px;
  height: 50px;
  color: black;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 2%;
  top: 35%;
  z-index: 100;
`;

const NextArrowButton = styled.div`
  width: 50px;
  height: 50px;
  color: black;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 5%;
  top: 35%;
  z-index: 100;
`;

const Image = styled.img`
  width: 270px;
  height: 300px;
`;

const DescriptionTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const DescriptionNickName = styled.div`
  font-size: 16px;
  color: gray;
`;
const DescriptionSchedule = styled.div`
  font-size: 16px;
  color: gray;
`;
