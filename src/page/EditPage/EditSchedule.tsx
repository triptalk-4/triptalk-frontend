import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import FullSchedule from '../../component/DatePicker/ FullSchedule';
import ExcludeTimes from '../../component/DatePicker/ExcludeTimes';
import ScheduleMapLoader from '../../component/ScheduleMap';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { MAIN_COLOR } from '../../color/color';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

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

interface PlannerDetail {
  userId: number;
  plannerDetailId: number;
  date: string;
  startDate: Date | null;
  placeResponse: {
    placeName: string;
    roadAddress: string;
    addressName: string;
    latitude: number;
    longitude: number;
  };
  description: string;
  imagesUrl: string[];
  imagePreviews: [];
}

export default function EditSchedule() {
  const Access_token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [pickImg, setPickImg] = useState('');
  const { plannerId } = useParams();
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateRangeChange = (newDateRange: [Date | null, Date | null]) => {
    setSelectedDateRange(newDateRange);
    console.log(newDateRange);
  };

  const navigate = useNavigate();

  const [coreContainers, setCoreContainers] = useState<CoreContainerData[]>([
    { images: [], imagePreviews: [], startDate: null, review: '', placeInfo: null },
  ]);

  const coreContainers_LIMIT = 5;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedImages = Array.from(e.target.files as FileList);

    if (coreContainers[index].images.length + selectedImages.length > 5) {
      alert('이미지는 최대 5장까지 등록 가능합니다.');
      return;
    }

    const imageUrls = selectedImages.map(image => URL.createObjectURL(image));

    const updatedData = [...coreContainers];
    updatedData[index].images = [...updatedData[index].images, ...selectedImages];
    updatedData[index].imagePreviews = [...updatedData[index].imagePreviews, ...imageUrls];

    setCoreContainers(updatedData);
  };

  const handlePlaceSelected = (placeInfos: PlaceInfo[]) => {
    // setPlaceInfo(placeInfos);
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
    console.log(placeInfos);
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

  //// 작업 ////
  const token = useSelector((state: RootState) => state.token.token);
  useEffect(() => {
    const fetchEditPage = async () => {
      const Access_token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/address/api/plans/${plannerId}/details`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        const plannerData = response.data;
        setTitle(plannerData.title);
        setReview(plannerData.plannerDetailResponse[0].description); // 테스트로 수동적으로 뽑아서 넣음.
        
        const imagesUrlArray = plannerData.plannerDetailResponse.map((detail: PlannerDetail) => detail.imagesUrl);
        setPickImg(imagesUrlArray[0]);

        setSelectedDateRange([response.data.startDate, response.data.plannerData.endDate]);

        const updatedContainers = plannerData.plannerDetailResponse.map((detail: PlannerDetail) => {
          const coreContainer: CoreContainerData = {
            images: [],
            imagePreviews: detail.imagePreviews,
            startDate: detail.date ? new Date(detail.date) : null,
            review: detail.description,
            placeInfo: {
              addressName: detail.placeResponse.addressName,
              position: {
                lat: detail.placeResponse.latitude,
                lng: detail.placeResponse.longitude,
              },
              placeName: detail.placeResponse.placeName,
              roadAddressName: detail.placeResponse.roadAddress,
            },
          };
          return coreContainer;
        });
        setCoreContainers(updatedContainers);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchEditPage();
  }, [token, plannerId]);
  console.log('돼냐?', coreContainers);
  console.log('pickImg', pickImg);

  const handleEditButtonClick = async () => {
    try {
      const formDataArray = coreContainers.map(container => {
        const formData = new FormData();
        container.images.forEach(image => {
          formData.append('files', image);
        });
        return formData;
      });

      if (coreContainers.length === 0) {
        formDataArray.length = 0;
      }

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
        console.log('PlaceInfo in detailRequests', container.placeInfo);
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
          console.log('데이터 전송 완료');
          alert('일정 등록 완료!');
          navigate('/schedule');
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
    navigate('/schedule');
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
                {pickImg && <img src={pickImg} alt="Picked Image" />}
              </ImagePreviews>
              <div>
                <CommentTextArea
                  placeholder="장소리뷰"
                  value={review}
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
        <ButtonContainer>
          <EditButton onClick={handleEditButtonClick}>수정</EditButton>
          <CancelButton onClick={handleBackButtonClick}>취소</CancelButton>
        </ButtonContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.input.attrs({ maxLength: 40 })`
  width: 40%;
  height: 40px;
  border: 2px solid ${MAIN_COLOR};
  border-radius: 4px;
  padding: 8px 0px 8px 4px;
  outline: none;
  margin-right: 355px;
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
  margin-bottom: 50px;
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
  height: 195px;

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
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
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

const EditButton = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 30px;
  border: none;
  background-color: ${MAIN_COLOR};
  border-radius: 25px;
  color: white;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  background-color: gray;
  border-radius: 25px;
  color: white;
  cursor: pointer;
`;
