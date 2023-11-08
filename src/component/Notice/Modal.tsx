import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
}

interface Notification {
  alertId: number;
  plannerId: number;
  alertContent: string;
  userCheckYn: boolean;
  profile: string;
  alertDt: string;
}

export default function Modal({ onClose }: ModalProps) {
  const token = useSelector((state: RootState) => state.token.token);
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.get(`/address/api/alert/list?page=${page}&pageSize=${itemsPerPage}`, config);
          if (response.data && response.data.content) {
            const data = response.data.content;
            const transformedData = data.map((notification: Notification) => ({
              ...notification
            }));
            setData(transformedData);
            setTotalPages(Math.ceil(transformedData.length / itemsPerPage));
          }
        }
      } catch (error) {
        console.error('API Request Failure:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, page, itemsPerPage]);

  const getPageData = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    setPage(page - 1);
  };

  const handleItemClicked = async (notification: Notification) => {
    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.delete(`/address/api/alert/list/alert/delete/one/${notification.alertId}`, config);
        if (response.status === 200) {
          setData(prevData => prevData.filter(item => item.alertId !== notification.alertId));
          navigate(`/page/${notification.plannerId}`);
          onClose();
        }
      }
    } catch (error) {
      console.error('API Request Failure:', error);
    }
  };

  const handleDeleteItem = async (alertId: number) => {
    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.delete(`/address/api/alert/list/alert/delete/one/${alertId}`, config);
        if (response.status === 200) {
          setData(prevData => prevData.filter(notification => notification.alertId !== alertId));
        }
      }
    } catch (error) {
      console.error('API Request Failure:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.delete('/address/api/alert/list/alert/delete/all', config);
        if (response.status === 200) {
          if (data.length > 0) {
            setData([]);
          }
        }
      }
    } catch (error) {
      console.error('API Request Failure:', error);
    }
  };
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <AllDeleteButton onClick={handleDeleteAll}>전체삭제</AllDeleteButton>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.length === 0 ? (
              <p>알림이 없습니다</p>
            ) : (
              getPageData(currentPage).map((notification, index) => (
                <NotificationItem key={index} onClick={() => handleItemClicked(notification)}>
                  <UserImg src={notification.profile} alt={notification.alertContent} />
                  {notification.alertContent}
                  <FaTimes className="close-icon" onClick={() => handleDeleteItem(notification.alertId)} />
                </NotificationItem>
              ))
            )}
            {data.length > 0 && (
              <Pagination>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                  <PageNumber key={page} active={currentPage === page} onClick={() => handlePageClick(page)}>
                    {page}
                  </PageNumber>
                ))}
              </Pagination>
            )}
          </>
        )}
      </ModalContent>
    </ModalBackdrop>
  );
}

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-right: 20px;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 600px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const NotificationItem = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #d0cfcf;
    .close-icon {
      display: inline-block;
    }
  }

  .close-icon {
    display: none;
    margin-left: auto;
    cursor: pointer;
    color: red;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const PageNumber = styled.button<{ active: boolean }>`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: ${props => (props.active ? MAIN_COLOR : 'transparent')};
  border: 1px solid ${MAIN_COLOR};
  color: ${props => (props.active ? 'white' : MAIN_COLOR)};
  &:hover {
    background-color: ${MAIN_COLOR};
    color: white;
  }
`;

const AllDeleteButton = styled.button`
  border: none;
  background-color: white;
  color: red;
  margin-left: auto;
  cursor: pointer;
`;
