import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';

interface ExcludeTimesProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

export default function ExcludeTimes(props: ExcludeTimesProps) {
  const { startDate, setStartDate } = props;

  const handleDatePickerChange = (date: Date | null) => {
    setStartDate(date);
    console.log('선택날짜 :', date);
  };

  return (
    <StyledDatePicker
      locale={ko}
      selected={startDate}
      onChange={handleDatePickerChange}
      showTimeSelect
      excludeTimes={[]}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="날짜와 시간을 선택하세요"
    />
  );
}

const StyledDatePicker = styled(DatePicker)`
  @media (max-width: 800px) {
    width: 220px;
    font-size: 12px;
    border: 2px solid ${MAIN_COLOR} !important;
    border-radius: 4px;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
