import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

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
    <DatePicker
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
