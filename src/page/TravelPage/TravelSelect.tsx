import Select from 'react-select';
import { useState } from 'react';

const options = [
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '경기도', label: '경기도' },
  { value: '강원도', label: '강원도' },
  { value: '충청북도', label: '충청북도' },
  { value: '충청남도', label: '충청남도' },
  { value: '전라북도', label: '전라북도' },
  { value: '전라남도', label: '전라남도' },
  { value: '경상북도', label: '경상북도' },
  { value: '경상남도', label: '경상남도' },
  { value: '제주도', label: '경상남도' },
  { value: '최신순', label: '최신순' },
  { value: '좋아요', label: '좋아요' },
  { value: '조회순', label: '조회순' },
];

export default function TravelSelect() {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null); // 초기 선택값

  //  const [posts, setPosts] = useState([]); // 백엔드에서 받아올 게시물 목록 상태

  return (
    <Select
      placeholder="선택"
      value={selectedOption}
      onChange={newValue => setSelectedOption(newValue)} // newValue = 라이브러리에서 자동으로 생성해주는 매개변수
      options={options}
      isSearchable={false} // 검색 기능 비활성화
    />
  );
}
