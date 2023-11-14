import Pagination from '@mui/material/Pagination/Pagination';
import { MAIN_COLOR } from '../../color/color';

interface TravelPaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function TravelPagination({ pageCount, currentPage, onPageChange }: TravelPaginationProps) {
  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={(_event, page) => onPageChange(page)}
      sx={{
        '& .MuiPaginationItem-root': {
          color: 'black',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
          backgroundColor: MAIN_COLOR,
          color: 'white',
        },
      }}
    />
  );
}
