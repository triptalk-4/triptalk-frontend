import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import './edit.css';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';

interface FullScheduleProps {
  selectedDateRange: [Date | null, Date | null];
  onDateRangeChange: (newDateRange: [Date | null, Date | null]) => void;
}

export default function FullSchedule(props: FullScheduleProps) {
  const { selectedDateRange, onDateRangeChange } = props;
  const [startDate, endDate] = selectedDateRange;

  return (
    <StyledDatePicker
      locale={ko}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={update => {
        onDateRangeChange(update);
      }}
      isClearable={true}
      placeholderText="날짜를 선택하세요"
    />
  );
}

const StyledDatePicker = styled(DatePicker)`
  border-radius: 4px;
  margin-top: 8px;
  border: 2px solid ${MAIN_COLOR} !important;
  font-size: 14px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
