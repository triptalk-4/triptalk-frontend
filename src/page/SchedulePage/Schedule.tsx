import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import SecheduleSelect from '../../component/SecheduleSelect/SecheduleSelect';
import TopButton from '../../component/TopButton/TopButton';
import { GrEdit } from 'react-icons/gr';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsEyeFill } from 'react-icons/bs';
import { BsFileEarmarkCheckFill } from 'react-icons/bs';
import { DEFAULT_FONT_COLOR } from '../../color/color';

function Schedule() {
  const initialData = Array.from({ length: 9 }, (_, index) => ({
    id: index,
  }));

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        const newData = Array.from({ length: 3 }, (_, index) => ({
          id: data.length + index,
        }));

        setData(prevData => [...prevData, ...newData]);
        setIsLoading(false);
      }, 1000);
    }

    if (window.scrollY > 100 && !isLoading) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const handleBeforeUnload = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    window.scrollTo(0, 0);
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
          {data.map(item => (
            <Link to={`/page/${item.id}`} key={item.id}>
              <Post key={item.id}>
                <div className="info-container">
                  <TopContainer>
                    <IconWithCount>
                      <Heart />
                      <Count>30</Count>
                    </IconWithCount>
                    <IconWithCount>
                      <LookUp />
                      <Count>30</Count>
                    </IconWithCount>
                  </TopContainer>
                  <BottomContainer>
                    <Date>23.09.28</Date>
                    <Save />
                  </BottomContainer>
                </div>
              </Post>
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

const Post = styled.div`
  width: 100%;
  height: 350px;
  background-image: url('img/postimg4.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  border-radius: 25px;

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
const Save = styled(BsFileEarmarkCheckFill)`
  width: 30px;
  height: 30px;
  margin-top: 90%;
`;
