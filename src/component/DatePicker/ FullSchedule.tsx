import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import './edit.css';

export default function FullSchedule() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      locale={ko}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      onChange={update => {
        setDateRange(update);
      }}
      isClearable={true}
      placeholderText="날짜를 선택하세요"
    />
  );
}
