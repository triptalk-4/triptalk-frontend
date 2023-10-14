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
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice';
import formatDate from '../../utils/formatDate';

interface Item {
  createAt: number;
  likeCount: number;
  plannerId: number;
  thumbnail: string;
  views: number;
  title: string;
}

function Schedule() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState('RECENT');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsLoading(true);
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`/address/api/plans?page=${page}&size=6&sortType=${sortType}`, config);
          const fetchedData = response.data;
          setHasNext(fetchedData.hasNext);
          const transformedData = fetchedData.plannerListResponses.content.map((item: Item) => {
            const { likeCount, plannerId, thumbnail, views, createAt, title } = item;
            return { likeCount, plannerId, thumbnail, views, createAt, title };
          });
          setData(prevData => [...prevData, ...transformedData]);
          setVisibleItems(prevItems => [...prevItems, ...transformedData.slice(0, 6)]);
          if (!fetchedData.hasNext) {
            setAllItemsLoaded(true);
          }
        }
      } catch (error) {
        console.error('API Request Failure:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, page, sortType]);

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
    if (!hasNext) {
      setAllItemsLoaded(true);
      return;
    }
    setPage(prevPage => prevPage + 1);
  };

  const handleSortChange = (sortKey: string) => {
    let newSortType;
    switch (sortKey) {
      case '최신순':
        newSortType = 'RECENT';
        break;
      case '좋아요':
        newSortType = 'LIKES';
        break;
      case '조회순':
        newSortType = 'VIEWS';
        break;
      default:
        newSortType = 'RECENT';
    }
    setSortType(newSortType);
    setData([]);
    setVisibleItems([]);
    setPage(0);
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
                  <MiddleTitleContainer>{item.title}</MiddleTitleContainer>
                  <BottomContainer>
                    <DateLabel> {formatDate(item.createAt)} </DateLabel>
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

const MiddleTitleContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 20%;
  font-size: 24px;
  font-weight: bold;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateLabel = styled.div`
  font-size: 24px;
`;

const EndOfDataMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
