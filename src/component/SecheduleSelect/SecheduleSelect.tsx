import Select from 'react-select';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '최신순', label: '최신순' },
  { value: '좋아요', label: '좋아요' },
  { value: '조회순', label: '조회순' }
];

function SecheduleSelect({ onSortChange }: { onSortChange: (sortKey: string) => void }) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(options[0]);

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    if (option) {
      onSortChange(option.value);
    }
  };

  return <Select value={selectedOption} onChange={handleChange} options={options} isSearchable={false} />;
}

export default SecheduleSelect;
