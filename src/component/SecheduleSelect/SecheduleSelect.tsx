import Select from 'react-select';
import { useState, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '최신순', label: '최신순' },
  { value: '좋아요', label: '좋아요' },
  { value: '조회순', label: '조회순' }
];

interface SecheduleSelectProps {
  onSortChange: (sortKey: string) => void;
  currentSortType: string;
}

function SecheduleSelect({ onSortChange, currentSortType }: SecheduleSelectProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Initialize the selected option based on the currentSortType prop.
  useEffect(() => {
    const matchingOption = options.find(option => option.value === currentSortType);
    setSelectedOption(matchingOption || options[0]);
  }, [currentSortType]);

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    if (option) {
      onSortChange(option.value);
    }
  };

  return <Select value={selectedOption} onChange={handleChange} options={options} isSearchable={false} />;
}

export default SecheduleSelect;
