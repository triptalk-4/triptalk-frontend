import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { GRAY_COLOR } from '../../color/color';

function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <PrevArrowButton onClick={onClick}>
      <MdOutlineKeyboardArrowLeft />
    </PrevArrowButton>
  );
}

function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <NextArrowButton onClick={onClick}>
      <MdOutlineKeyboardArrowRight />
    </NextArrowButton>
  );
}

function MainCarousel() {
  const data = [
    {
      title: '양양 2박 여행',
      nickname: '제로베이스',
      schedule: '2023~09.15~2023.09.17',
      imageUrl: 'img/Carousel.png'
    },
    {
      title: '속초 2박 여행',
      nickname: '프론트',
      schedule: '2023~09.22~2023.09.25',
      imageUrl: 'img/Carousel.png'
    },
    {
      title: '제주 2박 여행',
      nickname: '백엔드',
      schedule: '2023~09.01~2023.09.03',
      imageUrl: 'img/Carousel.png'
    },
    {
      title: '광주 2박 여행',
      nickname: '리액트',
      schedule: '2023~08.21~2023.08.23',
      imageUrl: 'img/Carousel.png'
    },
    {
      title: '부산 2박 여행',
      nickname: '스프링',
      schedule: '2023~07.23~2023.08.25',
      imageUrl: 'img/Carousel.png'
    },
    {
      title: '대구 2박 여행',
      nickname: '마리아DB',
      schedule: '2023~09.15~2023.09.17',
      imageUrl: 'img/Carousel.png'
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1
        }
      }
    ]
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

const BtnStyle = css`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  color: rgba(0, 0, 0, 0.9);
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  z-index: 100;
  box-shadow: 0px 0px 4px ${GRAY_COLOR};
  top: 30%;
`;

const PrevArrowButton = styled.div`
  ${BtnStyle}
  left: -2%;
`;

const NextArrowButton = styled.div`
  ${BtnStyle}
  right: 1%;
`;

const Image = styled.img`
  width: 270px;
  height: 300px;
  cursor: pointer;
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
