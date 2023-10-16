import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Header';
import 'react-datepicker/dist/react-datepicker.css';
import FullSchedule from '../../component/DatePicker/ FullSchedule';
import ExcludeTimes from '../../component/DatePicker/ExcludeTimes';
import ScheduleMapLoader from '../../component/ScheduleMap';
import AddressSearch from '../../component/AddressSearch';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { removeLastAddress } from '../../store/mapAddress';
import axios from 'axios';
import { RootState } from '../../store/store';
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
};

export default function EditSchedule() {
  const [title, setTitle] = useState('');
  const [reviews, setReviews] = useState('');

  const selectedPlace = useSelector((state: RootState) => state.place.selectedPlace);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateRangeChange = (newDateRange: [Date | null, Date | null]) => {
    setSelectedDateRange(newDateRange);
    console.log(newDateRange);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [coreContainers, setCoreContainers] = useState<CoreContainerData[]>([
    { images: [], imagePreviews: [], startDate: null }
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

  const handleAddCoreContainer = () => {
    if (coreContainers.length < coreContainers_LIMIT) {
      setCoreContainers(prevContainers => [...prevContainers, { images: [], imagePreviews: [], startDate: null }]);
      console.log(selectedPlace);
    }
  };

  const handleRemoveCoreContainer = () => {
    if (coreContainers.length > 1) {
      setCoreContainers(prevContainers => prevContainers.slice(0, prevContainers.length - 1));
      dispatch(removeLastAddress());
    }
  };

  const handleEditButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('reviews', reviews);
      coreContainers.forEach((container, index) => {
        container.images.forEach(image => {
          formData.append(`images`, image);
        });
      });

      const response = await axios.post('/address/api/plans', formData);

      if (response.status === 200) {
        alert('일정이 등록 완료');
        navigate('/schedule');
      } else {
        alert('일정 등록 실패');
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
      <Header />
      <MainContainer>
        <ScheduleMapLoader
          onPlacesSelected={function(PlaceInfo: PlaceInfo): void {
            throw new Error('Function not implemented.');
          }}
        />
        <TitleContainer>
          <Title
            placeholder="제목 (최대 40자)"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          ></Title>
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
              {/* <AddressSearch /> */}
            </CoreTopContainer>
            <ImgContainer>
              <CustomFileInput
                type="file"
                accept="image/*"
                multiple
                onChange={e => handleImageUpload(e, index)}
                id={`fileInput-${index}`}
              />
              <CustomFileInputLabel htmlFor={`fileInput-${index}`}>이미지 선택 (최대 5장)</CustomFileInputLabel>
              <ImagePreviews>
                {container.imagePreviews.map((preview, imgIndex) => (
                  <img key={imgIndex} src={preview} alt={`Image ${imgIndex}`} />
                ))}
              </ImagePreviews>
              <CommentTextArea placeholder="장소리뷰" />
            </ImgContainer>
            <ButtonContainer>
              {coreContainers.length < 5 && <PlusButton onClick={handleAddCoreContainer}>+</PlusButton>}
              {coreContainers.length > 1 && <MinusButton onClick={handleRemoveCoreContainer}>-</MinusButton>}
            </ButtonContainer>
          </CoreContainer>
        ))}
        <ButtonContainer></ButtonContainer>
        <ButtonContainer>
          <EditButton>등록</EditButton>
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
`;

const Title = styled.input.attrs({ maxLength: 40 })`
  width: 40%;
  height: 30px;
  border: 2px solid black;
  outline: none;
  margin-right: 36%;
`;

const CoreContainer = styled.div`
  width: 100%;
  height: 340px;
  margin-top: 5%;
  background-color: #f7eae4;
`;

const CoreTopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const ImgContainer = styled.div`
  position: relative;
`;

const ImagePreviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  border: 2px solid black;
  width: 300px;
  height: 227px;

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
`;

const CommentTextArea = styled.textarea`
  width: 500px;
  height: 100px;
  border: 2px solid black;
  outline: none;
  resize: none;
  position: absolute;
  top: 34px;
  left: 47%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const MinusButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const EditButton = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 30px;
  border: none;
  background-color: #f46222;
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
