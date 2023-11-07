import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import FullSchedule from '../../component/DatePicker/ FullSchedule';
import ExcludeTimes from '../../component/DatePicker/ExcludeTimes';
import ScheduleMapLoader from '../../component/ScheduleMap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { MAIN_COLOR } from '../../color/color';
import Swal from 'sweetalert2';

interface PlaceInfo {
  position: {
    lat: number;
    lng: number;
  };
  addressName: string;
  placeName: string;
  roadAddressName: string;
}

type CoreContainerData = {
  images: File[];
  imagePreviews: string[];
  startDate: Date | null;
  review: string;
  placeInfo: PlaceInfo | null;
};

export default function AddSchedule() {
  const Access_token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  // const [reviews, setReviews] = useState('');
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo[]>([]);
  console.log(placeInfo);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateRangeChange = (newDateRange: [Date | null, Date | null]) => {
    setSelectedDateRange(newDateRange);
  };

  const navigate = useNavigate();

  const [coreContainers, setCoreContainers] = useState<CoreContainerData[]>([
    { images: [], imagePreviews: [], startDate: null, review: '', placeInfo: null },
  ]);

  const coreContainers_LIMIT = 5;

  // 이미지 선택 및 업로드 함수
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedImages = Array.from(e.target.files as FileList);

    const updatedData = [...coreContainers];
    updatedData[index].images = [];
    updatedData[index].imagePreviews = [];

    if (selectedImages.length > 0) {
      if (selectedImages.length > 5) {
        alert('이미지는 최대 5장까지 등록 가능합니다.');
        return;
      }

      const imageUrls = selectedImages.map(image => URL.createObjectURL(image));

      updatedData[index].images = selectedImages;
      updatedData[index].imagePreviews = imageUrls;
    }

    setCoreContainers(updatedData);
  };

  const handlePlaceSelected = (placeInfos: PlaceInfo[]) => {
    setPlaceInfo(placeInfos);
    const updatedContainers = coreContainers.map((container, index) => {
      if (index < placeInfos.length) {
        return {
          ...container,
          placeInfo: placeInfos[index],
        };
      }
      return container;
    });
    setCoreContainers(updatedContainers);
  };

  const handleAddCoreContainer = () => {
    if (coreContainers.length < coreContainers_LIMIT) {
      setCoreContainers(prevContainers => [
        ...prevContainers,
        { images: [], imagePreviews: [], startDate: null, review: '', placeInfo: null },
      ]);
    }
  };
  const handleRemoveCoreContainer = () => {
    if (coreContainers.length > 1) {
      setCoreContainers(prevContainers => prevContainers.slice(0, prevContainers.length - 1));
    }
  };

  const handleEditButtonClick = async () => {
    try {
      const formDataArray = coreContainers.map(container => {
        const formData = new FormData();
        container.images.forEach(image => {
          formData.append('files', image);
        });
        return formData;
      });

      const imageUrlsArray = await Promise.all(
        formDataArray.map(formData =>
          axios.post('/address/api/images', formData, {
            headers: {
              Authorization: `Bearer ${Access_token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
        )
      );

      const imageUrls = imageUrlsArray.map(response => response.data);

      const detailRequests = coreContainers.map((container, index) => {
        return {
          date: container.startDate,
          description: container.review,
          images: imageUrls[index], // 이미지 URL을 사용
          placeInfo: {
            addressName: container.placeInfo?.addressName,
            latitude: container.placeInfo?.position.lat,
            longitude: container.placeInfo?.position.lng,
            placeName: container.placeInfo?.placeName,
            roadAddress: container.placeInfo?.roadAddressName,
          },
        };
      });
      const plannerRequest = {
        description: '',
        endDate: selectedDateRange[1],
        startDate: selectedDateRange[0],
        title: title,
      };

      const dataToSend = {
        plannerDetailListRequests: detailRequests,
        plannerRequest: plannerRequest,
      };

      console.log('dataToSend', dataToSend);

      try {
        const response = await axios.post('/address/api/plans', dataToSend, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '일정 등록 완료',
          });
          navigate('/schedule?sortType=RECENT');
        } else {
          alert('일정 등록 실패');
        }
      } catch (error) {
        console.error('데이터 전송 오류', error);
      }
    } catch (error) {
      console.error('이벤트등록 error', error);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/schedule?sortType=RECENT');
  };

  return (
    <>
      <MainContainer>
        <ScheduleMapLoader onPlacesSelected={(placeInfos: PlaceInfo[]) => handlePlaceSelected(placeInfos)} />
        <TitleContainer>
          <Title
            placeholder="제목 (최대 40자)"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}></Title>
          <FullSchedule selectedDateRange={selectedDateRange} onDateRangeChange={handleDateRangeChange} />
        </TitleContainer>
        {coreContainers.map((container, index) => (
          <CoreContainer key={index}>
            <CoreTopContainer>
              <ExcludeTimes
                startDate={container.startDate}
                setStartDate={(date: Date | null) => {
                  const updatedContainers = [...coreContainers];
                  updatedContainers[index].startDate = date;
                  setCoreContainers(updatedContainers);
                }}
              />
              <div>
                <PlaceName
                  type="text"
                  value={container.placeInfo ? container.placeInfo.placeName : ''}
                  placeholder="위치"
                  readOnly
                />
              </div>
            </CoreTopContainer>
            <ImgContainer>
              <CustomFileInput
                type="file"
                accept="image/*"
                multiple
                name={`images[${index}]`}
                onChange={e => handleImageUpload(e, index)}
                id={`fileInput-${index}`}
              />
              <CustomFileInputLabel htmlFor={`fileInput-${index}`}>이미지 선택 (최대 5장)</CustomFileInputLabel>
              <ImagePreviews>
                {container.imagePreviews.map((preview, imgIndex) => (
                  <img key={imgIndex} src={preview} alt={`Image ${imgIndex}`} />
                ))}
              </ImagePreviews>
              <div>
                <CommentTextArea
                  placeholder="장소리뷰"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const updatedContainers = [...coreContainers];
                    updatedContainers[index].review = e.target.value;
                    setCoreContainers(updatedContainers);
                  }}
                />
              </div>
            </ImgContainer>
            <ButtonContainer>
              {coreContainers.length < 5 && <PlusButton onClick={handleAddCoreContainer}>+</PlusButton>}
              {coreContainers.length > 1 && <MinusButton onClick={handleRemoveCoreContainer}>-</MinusButton>}
            </ButtonContainer>
          </CoreContainer>
        ))}
        <ButtonContainer></ButtonContainer>
        <AddBtn>
          <EditButton onClick={handleEditButtonClick}>등록</EditButton>
          <CancelButton onClick={handleBackButtonClick}>취소</CancelButton>
        </AddBtn>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 50px auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

const Title = styled.input.attrs({ maxLength: 40 })`
  width: 40%;
  height: 40px;
  border: 2px solid ${MAIN_COLOR};
  border-radius: 4px;
  padding: 8px 0px 8px 4px;
  outline: none;
  margin-right: 500px;
`;

const CoreContainer = styled.div`
  width: 100%;
  height: 340px;
  margin-top: 5%;
  background-color: #f7eae4;
  padding: 15px;
  position: relative;
`;

const CoreTopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const PlaceName = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${MAIN_COLOR};
  border-radius: 4px;
  transition: border-color 0.3s;
  outline: none;
  &:focus {
    border-color: ${MAIN_COLOR};
  }
`;

const ImgContainer = styled.div`
  // position: relative;
`;

const ImagePreviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  border: 2px solid ${MAIN_COLOR};
  border-radius: 4px;
  width: 300px;
  height: 190px;

  img {
    max-width: 80px;
    max-height: 80px;
    margin: 7px;
  }
`;

const CustomFileInput = styled.input`
  display: none;
`;

const CustomFileInputLabel = styled.label`
  background-color: #f46222;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 4px;
`;

const CommentTextArea = styled.textarea`
  width: 500px;
  height: 100px;
  border: 2px solid ${MAIN_COLOR};
  outline: none;
  resize: none;
  position: absolute;
  top: 35%;
  right: 15px;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  width: 70px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: ${MAIN_COLOR};
  color: white;
  cursor: pointer;
`;

const MinusButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: ${MAIN_COLOR};
  color: white;
  cursor: pointer;
`;

const EnBbtnStyle = css`
  width: 100px;
  height: 35px;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  border: none;
  margin-bottom: 50px;
`;

const EditButton = styled.button`
  ${EnBbtnStyle}

  background-color: ${MAIN_COLOR};
`;

const CancelButton = styled.button`
  ${EnBbtnStyle}
  background-color: gray;
`;

const AddBtn = styled.div`
  width: 17%;
  margin: 0 auto;
  display: flex;
  gap: 5px;
`;
