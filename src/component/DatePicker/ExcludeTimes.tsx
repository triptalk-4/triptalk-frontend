import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { ko } from 'date-fns/esm/locale';

export default function ExcludeTimes() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      locale={ko}
      selected={startDate}
      minDate={new Date()}
      onChange={date => setStartDate(date)}
      showTimeSelect
      excludeTimes={[]}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="날짜와 시간을 선택하세요"
    />
  );
}
