import styled from 'styled-components';

interface TravelPostData {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

interface TravelPopupProps {
  data: TravelPostData | null;
  onClose: () => void;
}

export default function TravelPopup({ data, onClose }: TravelPopupProps) {
  if (!data) {
    return null;
  }

  return (
    <Popup>
      <PopupContent>
        <PopupImgDiv>
          <PopupImg src={data.imgUrl} />
        </PopupImgDiv>
        <PopupInfo>
          <Top>
            <PopupTitle>{data.title}</PopupTitle>
            <PopupNickname>
              <UserProfile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
              {data.nickname}
            </PopupNickname>
          </Top>
          <Middle>
            <PopupReview>
              죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다. 별을 노래하는
              마음으로 모든 죽어가는 것을 사랑해야지 그리고 나한테 주어진 길을 걸어가야겠다. 오늘 밤에도 별이 바람에
              스치운다.
            </PopupReview>
          </Middle>
          <Button>
            <PopupAddress>{data.address}</PopupAddress>
            <PopupDate>{data.date}</PopupDate>
          </Button>
        </PopupInfo>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupContent>
    </Popup>
  );
}

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`;

const PopupContent = styled.div`
  background: #fff;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
`;

const PopupImg = styled.img`
  max-height: 400px;
  max-width: 400px;
  object-fit: cover;
`;

const PopupInfo = styled.div`
  width: 100%;
  margin: 25px 0 0;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Middle = styled.div`
  display: flex;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PopupTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px;
`;

const UserProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #fff;
  margin-right: 10px;
`;

const PopupNickname = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0 0 10px;
`;

const PopupReview = styled.div`
  margin: 15px 0;
  font-size: 16px;
`;

const PopupAddress = styled.div`
  font-size: 16px;
  margin: 0 0 10px;
`;

const PopupDate = styled.div`
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
