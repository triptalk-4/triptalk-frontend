import Select from 'react-select';
import { useState } from 'react';

const options = [
  { value: '최신순', label: '최신순' },
  { value: '좋아요', label: '좋아요' },
  { value: '조회순', label: '조회순' }
];

function SecheduleSelect() {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null); // 초기 선택값

  const [posts, setPosts] = useState([]); // 백엔드에서 받아올 게시물 목록 상태

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

export default SecheduleSelect;
