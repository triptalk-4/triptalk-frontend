import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Header';
import 'react-datepicker/dist/react-datepicker.css';
import FullSchedule from '../../component/DatePicker/ FullSchedule';
import ExcludeTimes from '../../component/DatePicker/ExcludeTimes';
import ScheduleMapLoader from '../../component/ScheduleMap';
import AddressSearch from '../../component/AddressSearch';
import { useNavigate } from 'react-router';

export default function EditSchedule() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [coreContainers, setCoreContainers] = useState(1);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files as FileList);

    // 이미지가 5장을 초과하는 경우 경고 메시지를 표시하고 업로드를 중단
    if (images.length + selectedImages.length > 6) {
      alert('이미지는 최대 6장까지 등록 가능합니다.');
      return;
    }

    // 이미지 URL 배열 업데이트
    const imageUrls = selectedImages.map(image => URL.createObjectURL(image));

    // 이미지 상태 업데이트
    setImages(prevImages => [...prevImages, ...selectedImages]);

    // 이미지 미리보기 업데이트
    setImagePreviews(prevPreviews => [...prevPreviews, ...imageUrls]);
  };

  const handleAddCoreContainer = () => {
    if (coreContainers < 5) {
      setCoreContainers(prevContainers => prevContainers + 1);
    }
  };

  const handleRemoveCoreContainer = () => {
    if (coreContainers > 1) {
      setCoreContainers(prevContainers => prevContainers - 1);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/schedule'); // 이전 페이지로 이동
  };

  return (
    <>
      <Header />
      <MainContainer>
        <ScheduleMapLoader />
        <TitleContainer>
          <Title placeholder="제목 (최대 40자)"></Title>
          <FullSchedule />
        </TitleContainer>
        {Array.from({ length: coreContainers }).map((_, index) => (
          <CoreContainer key={index}>
            <CoreTopContainer>
              <ExcludeTimes />
              <AddressSearch />
            </CoreTopContainer>
            <ImgContainer>
              <CustomFileInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                id={`fileInput-${index}`}
              />
              <CustomFileInputLabel htmlFor={`fileInput-${index}`}>이미지 선택 (최대 5장)</CustomFileInputLabel>
              <ImagePreviews>
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Image ${index}`} />
                ))}
              </ImagePreviews>
              <CommentTextArea placeholder="장소리뷰" />
            </ImgContainer>
          </CoreContainer>
        ))}
        <ButtonContainer>
          {coreContainers < 5 && <PlusButton onClick={handleAddCoreContainer}>+</PlusButton>}
          {coreContainers > 1 && <MinusButton onClick={handleRemoveCoreContainer}>-</MinusButton>}
        </ButtonContainer>
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
  margin-top: 10px;
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
  margin-top: 10px;
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
