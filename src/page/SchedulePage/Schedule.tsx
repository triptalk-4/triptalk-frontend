import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import SecheduleSelect from '../../component/SecheduleSelect/SecheduleSelect';
import TopButton from '../../component/TopButton/TopButton';
import { GrEdit } from 'react-icons/gr';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsEyeFill } from 'react-icons/bs';
import { DEFAULT_FONT_COLOR } from '../../color/color';

interface Item {
  id: number;
  img: string;
  heartCount: number;
  lookUpCount: number;
  date: string;
}

function Schedule() {
  const [data, setData] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    fetch('/api/schedule')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setVisibleItems(data.slice(0, 9));
      })
      .catch(error => console.error('API Request Failure:', error));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems, isLoading]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      loadMoreItems();
    }

    if (window.scrollY > 100 && !isLoading) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const loadMoreItems = () => {
    if (visibleItems.length >= data.length) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prevItems => [
        ...prevItems,
        ...data.slice(prevItems.length, Math.min(prevItems.length + 6, data.length))
      ]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <TitleContainer>
          <Title>여러분의 일정을 보여주세요!</Title>
          <SelectBox>
            <SecheduleSelect />
          </SelectBox>
          <EditButton to="/editschedule">
            일정등록하기
            <EditIcon />
          </EditButton>
        </TitleContainer>
        <GridContainer>
          {visibleItems.map((item: Item) => (
            <Link to={`/page/${item.id}`} key={item.id}>
              <StyledPost>
                <div className="info-container">
                  <TopContainer>
                    <IconWithCount>
                      <Heart />
                      <Count>{item.heartCount}</Count>
                    </IconWithCount>
                    <IconWithCount>
                      <LookUp />
                      <Count>{item.lookUpCount}</Count>
                    </IconWithCount>
                  </TopContainer>
                  <BottomContainer>
                    <Date>{item.date}</Date>
                  </BottomContainer>
                </div>
                <Img src={item.img} alt="Post Image" />
              </StyledPost>
            </Link>
          ))}
        </GridContainer>
        {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
        {showTopButton && <TopButton />}
      </MainContainer>
    </>
  );
}

export default Schedule;

const MainContainer = styled.div`
  width: 100%;
  padding: 0 10%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const SelectBox = styled.div`
  width: 200px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StyledPost = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  overflow: hidden;

  .info-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 25px;
    display: none;
    color: white;
  }

  &:hover .info-container {
    display: block;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #333;
`;

const EditButton = styled(Link)`
  width: 200px;
  height: 50px;
  color: ${DEFAULT_FONT_COLOR};
  background-color: inherit;
  margin-left: 150px;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

const EditIcon = styled(GrEdit)`
  margin-left: 20px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Heart = styled(BsFillSuitHeartFill)`
  width: 30px;
  height: 30px;
`;

const LookUp = styled(BsEyeFill)`
  width: 30px;
  height: 30px;
`;

const IconWithCount = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Count = styled.div`
  margin-left: 5px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Date = styled.div`
  font-size: 24px;
  margin-top: 95%;
`;
