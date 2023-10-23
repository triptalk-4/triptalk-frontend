import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice';
import { RootState } from '../../store/store';
import Header from '../../component/Header';
import SecheduleSelect from '../../component/SecheduleSelect/SecheduleSelect';
import TopButton from '../../component/TopButton/TopButton';
import { GrEdit } from 'react-icons/gr';
import styled from 'styled-components';
import { DEFAULT_FONT_COLOR } from '../../color/color';
import axios from 'axios';
import ItemCard from '../../component/Sechedule/ItemCard';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortType = searchParams.get('sortType') || 'RECENT';
  const [sortType, setSortType] = useState(initialSortType);
  const [data, setData] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);
  const [page, setPage] = useState(0);
  const previousToken = useRef<string | null>(null);
  const previousPage = useRef<number | null>(null);
  const previousSortType = useRef<string | null>(null);

  useEffect(() => {
    if (token === null) {
      const Access_token = localStorage.getItem('token');
      if (Access_token) {
        dispatch(setToken(Access_token));
      }
      return;
    }
    if (previousToken.current === token && previousPage.current === page && previousSortType.current === sortType) {
      return;
    }
    previousToken.current = token;
    previousPage.current = page;
    previousSortType.current = sortType;

    setIsLoading(true);

    const fetchData = async () => {
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
    setSearchParams({ sortType: newSortType });
  };

  useEffect(() => {
    const currentSortType = searchParams.get('sortType');
    if (currentSortType && ['RECENT', 'LIKES', 'VIEWS'].includes(currentSortType)) {
      setSortType(currentSortType);
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <MainContainer>
        <TitleContainer>
          <Title>여러분의 일정을 보여주세요!</Title>
          <SelectBox>
            <SecheduleSelect onSortChange={handleSortChange} currentSortType={sortType} />
          </SelectBox>
          <EditButton to="/addSchedule">
            일정등록하기
            <EditIcon />
          </EditButton>
        </TitleContainer>
        <GridContainer>
          {data.map(item => (
            <ItemCard key={item.plannerId} item={item} />
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
  user-select: none;
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

const EndOfDataMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
