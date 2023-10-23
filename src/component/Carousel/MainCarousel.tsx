import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

interface Item {
  startDate: number;
  endDate: number;
  plannerId: number;
  thumbnail: string;
  title: string;
  nickname: string;
  views: number;
  likeCount: number;
}

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
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    if (Access_token) {
      dispatch(setToken(Access_token));
    }
    const fetchData = async () => {
      try {
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get('/address/api/main', config);
          const data = response.data;
          const transformedData = data.map((item: Item) => {
            const { startDate, endDate, likeCount, plannerId, thumbnail, views, title, nickname } = item;
            return { startDate, endDate, likeCount, plannerId, thumbnail, views, title, nickname };
          });
          setData(transformedData);
        }
      } catch (error) {
        console.error('API Request Failure:', error);
      }
    };
    fetchData();
  }, [token]);

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
            <Badge>{index + 1}등</Badge>
            <Link to={`/page/${item.plannerId}`} key={item.plannerId}>
              <Image src={item.thumbnail} alt="img" />
            </Link>
            <DescriptionTitle>{item.title}</DescriptionTitle>
            <DescriptionNickName>{item.nickname}</DescriptionNickName>
            <DescriptionSchedule>
              {formatDate(item.startDate)} ~ {formatDate(item.endDate)}
            </DescriptionSchedule>
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
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
`;

const DescriptionTitle = styled.div`
  margin-top: 10px;
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
const Badge = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${MAIN_COLOR};
  padding: 10px;
  color: white;
  font-size: 18px;
  position: absolute;
  margin: 10px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
