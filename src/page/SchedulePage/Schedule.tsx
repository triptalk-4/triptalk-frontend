import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import SecheduleSelect from '../../component/SecheduleSelect/SecheduleSelect';
import TopButton from '../../component/TopButton/TopButton';
import { GrEdit } from 'react-icons/gr';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsEyeFill } from 'react-icons/bs';
import { DEFAULT_FONT_COLOR } from '../../color/color';
import axios from 'axios';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../../store/store';

interface Item {
  endDate: string;
  likeCount: number;
  plannerId: number;
  startDate: string;
  thumbnail: string;
  title: string;
  views: number;
}

function Schedule() {
  const [data, setData] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]); //첫 로드시 페이지에 나타낼 아이템 갯수
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/plans?lastId=10&limit=2&sortType=RECENT');
  //       const data = response.data;
  //       setHasNext(data.hasNext);
  //       const transformedData = data.plannerListResponses.map((item: any) => ({
  //         endDate: item.endDate,
  //         likeCount: item.likeCount,
  //         plannerId: item.plannerId,
  //         startDate: item.startDate,
  //         thumbnail: item.thumbnail,
  //         title: item.title,
  //         views: item.views,
  //         date: item.startDate
  //       }));
  //       setData(transformedData);
  //       setVisibleItems(transformedData.slice(0, 9));
  //     } catch (error) {
  //       console.error('API Request Failure:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(token);
  // const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(token);
        if (token) {
          const config = {
            headers: {
              Authorization: token,
            },
          };
          const response = await axios.get('/api/plans?lastId=10&limit=2&sortType=RECENT', config);
          const data = response.data;
          setHasNext(data.hasNext);
          const transformedData = data.plannerListResponses.map((item: any) => ({
            endDate: item.endDate,
            likeCount: item.likeCount,
            plannerId: item.plannerId,
            startDate: item.startDate,
            thumbnail: item.thumbnail,
            title: item.title,
            views: item.views,
            date: item.startDate,
          }));
          setData(transformedData);
          setVisibleItems(transformedData.slice(0, 9));
        }
      } catch (error) {
        console.error('API Request Failure:', error);
      }
    };
    fetchData();
  }, [token]);

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
      setAllItemsLoaded(true);
      return;
    } else if (!hasNext || isLoading) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prevItems => [
        ...prevItems,
        ...data.slice(prevItems.length, Math.min(prevItems.length + 6, data.length)),
      ]);
      setIsLoading(false);
      if (visibleItems.length + 6 >= data.length) {
        setAllItemsLoaded(true);
      }
    }, 500);
  };
  const handleSortChange = (sortKey: string) => {
    let sortedData;
    switch (sortKey) {
      case '최신순':
        sortedData = [...data].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case '좋아요':
        sortedData = [...data].sort((a, b) => b.likeCount - a.likeCount);
        break;
      case '조회순':
        sortedData = [...data].sort((a, b) => b.views - a.views);
        break;
      default:
        sortedData = data;
    }
    setData(sortedData);
    setVisibleItems(sortedData.slice(0, 9));
    setAllItemsLoaded(false);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <TitleContainer>
          <Title>여러분의 일정을 보여주세요!</Title>
          <SelectBox>
            <SecheduleSelect onSortChange={handleSortChange} />
          </SelectBox>
          <EditButton to="/editschedule">
            일정등록하기
            <EditIcon />
          </EditButton>
        </TitleContainer>
        <GridContainer>
          {visibleItems.map((item: Item) => (
            <Link to={`/page/${item.plannerId}`} key={item.plannerId}>
              <StyledPost>
                <div className="info-container">
                  <TopContainer>
                    <IconWithCount>
                      <Heart />
                      <Count>{item.likeCount}</Count>
                    </IconWithCount>
                    <IconWithCount>
                      <LookUp />
                      <Count>{item.views}</Count>
                    </IconWithCount>
                  </TopContainer>
                  <BottomContainer>
                    <DateLabel>{item.startDate}</DateLabel>
                  </BottomContainer>
                </div>
                <Img src={item.thumbnail} alt="Post Image" />
              </StyledPost>
            </Link>
          ))}
        </GridContainer>
        {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
        {!isLoading && allItemsLoaded && <EndOfDataMessage>게시물이 더상 존재하지 않습니다.</EndOfDataMessage>}
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

const DateLabel = styled.div`
  font-size: 24px;
  margin-top: 95%;
`;

const EndOfDataMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
