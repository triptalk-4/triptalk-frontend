import { useEffect } from 'react';
import styled from 'styled-components';
import { YELLOW_COLOR } from '../../../color/color';

interface RegionButtonProps {
  selectedRegion: string | null;
  onRegionChange: (region: string) => void;
}

export default function RegionButton({ selectedRegion, onRegionChange }: RegionButtonProps) {
  const regions = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기도',
    '강원도',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주도',
  ];

  useEffect(() => {
    console.log('selectedRegion:', selectedRegion);
  }, [selectedRegion]);

  return (
    <ButtonContainer>
      <RegionBtnDiv>
        {regions.map(region => (
          <RegionBtn
            key={region}
            value={region}
            isSelected={selectedRegion === region}
            onClick={() => onRegionChange(region)}>
            {region}
          </RegionBtn>
        ))}
      </RegionBtnDiv>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  margin: 15px 0;
`;

const RegionBtnDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const RegionBtn = styled.button<{ isSelected: boolean }>`
  width: 100px;
  height: 55px;
  border: 1px solid #000;
  border: ${props => (props.isSelected ? 'none' : '1px solid #000')};
  background-color: ${props => (props.isSelected ? YELLOW_COLOR : '#fff')};
  color: ${props => (props.isSelected ? '#fff' : '#000')};
  border-radius: 15px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 5px;
`;
