import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import TravelPagination from './TravelPagination';
import TravelPopup from './TravelPopup';

interface TravelPostData {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

interface TravelPostsProps {
  travelDatas: TravelPostData[];
}

export default function TravelPosts({ travelDatas }: TravelPostsProps) {
  const [travelPostsData, setTravelPostsData] = useState<TravelPostData[]>([]);
  const [containerClassName, setContainerClassName] = useState('space-between');

  // 페이지네이션
  const itemsPerPage = 4;
  const pageCount = calculatePageCount(travelDatas.length, itemsPerPage); // 한페이지에 보일 데이터에 대한 페이지네이션 수
  const [currentPage, setCurrentPage] = useState(1);

  function calculatePageCount(totalItems: number, itemsPerPage: number) {
    return Math.ceil(totalItems / itemsPerPage);
  }

  // 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState<TravelPostData | null>(null);

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (travelPostsData.length <= 3) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [travelPostsData]);

  console.log(setTravelPostsData);

  function openPopup(data: TravelPostData) {
    setPopupData(data);
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
    setPopupData(null);
  }

  function getPageData(pageNumber: number) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return travelDatas.slice(startIndex, endIndex);
  }

  return (
    <>
      <PostlContainer className={containerClassName}>
        {getPageData(currentPage).map((travelData, index) => (
          <Post key={index} onClick={() => openPopup(travelData)}>
            <Img src={travelData.imgUrl} />
            <TextBox>
              <TopText>
                <Title>{travelData.title}</Title>
                <Nickname>
                  <UserProfile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                  {travelData.nickname}
                </Nickname>
              </TopText>
              <BottomText>
                <Address>{travelData.address}</Address>
                <Date>{travelData.date}</Date>
              </BottomText>
            </TextBox>
          </Post>
        ))}
      </PostlContainer>
      <PaginationDiv>
        <TravelPagination
          pageCount={pageCount} //총 페이지 수
          currentPage={currentPage} //활성화된 페이지
          onPageChange={setCurrentPage}
        />
      </PaginationDiv>

      {/* 팝업부분 */}
      {isPopupOpen && popupData && <TravelPopup data={popupData} onClose={closePopup} />}
    </>
  );
}

const PostlContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;

  margin-top: 20px;

  &.flex-start {
    justify-content: flex-start;
  }

  &.space-between {
    justify-content: space-between;
  }
`;

const Post = styled.div`
  width: 270px;
  height: 350px;
  margin-right: 40px;
  margin-bottom: 80px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  position: relative;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const Img = styled.img`
  border-radius: 25px;
  display: block;
  width: 100%;
  cursor: pointer;
  object-fit: cover;
`;

const TextBox = styled.div`
  position: absolute;

  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 54px;
  width: 100%;
  height: 100%;
  padding: 0 15px 20px;
  border-radius: 25px;
  background: linear-gradient(to top, rgba(0, 0, 0, 100) 0%, rgba(0, 0, 0, 0) 100%);
`;

const TopText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TextColor = css`
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  ${TextColor}
  font-size: 18px;
  margin-right: 20px;
`;

const UserProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #fff;
  margin-right: 10px;
`;

const Nickname = styled.div`
  ${TextColor}
  display: flex;
  align-items: center;
`;

const BottomText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Address = styled.div`
  ${TextColor}
  font-weight: 300;
  margin-right: 20px;
`;

const Date = styled.div`
  ${TextColor}
  font-size: 15px;
  font-weight: 300;
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
`;
