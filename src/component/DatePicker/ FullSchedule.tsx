import React from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import './edit.css';

interface FullScheduleProps {
  selectedDateRange: [Date | null, Date | null];
  onDateRangeChange: (newDateRange: [Date | null, Date | null]) => void;
}

export default function FullSchedule(props: FullScheduleProps) {
  const { selectedDateRange, onDateRangeChange } = props;
  const [startDate, endDate] = selectedDateRange;

  return (
    <DatePicker
      locale={ko}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      onChange={update => {
        onDateRangeChange(update);
      }}
      isClearable={true}
      placeholderText="날짜를 선택하세요"
    />
  );
}
