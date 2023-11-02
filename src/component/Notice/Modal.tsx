import { useState } from 'react';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';

interface ModalProps {
  onClose: () => void;
}

interface Notification {
  type: 'comment' | 'like' | 'save';
  username: string;
  content?: string;
  avatarUrl: string;
}

export default function Modal({ onClose }: ModalProps) {
  const [notifications] = useState<Notification[]>([
    { type: 'comment', username: 'OOO', content: '댓글 내용입니다.', avatarUrl: 'public/favicon.ico' },
    { type: 'like', username: 'XXX', avatarUrl: 'public/favicon.ico' },
    { type: 'save', username: 'ZZZ', avatarUrl: 'public/favicon.ico' },
    { type: 'comment', username: 'OOO', content: '댓글 내용입니다.', avatarUrl: 'public/favicon.ico' },
    { type: 'like', username: 'XXX', avatarUrl: 'public/favicon.ico' },
    { type: 'save', username: 'ZZZ', avatarUrl: 'public/favicon.ico' },
    { type: 'comment', username: 'OOO', content: '댓글 내용입니다.', avatarUrl: 'public/favicon.ico' },
    { type: 'like', username: 'XXX', avatarUrl: 'public/favicon.ico' },
    { type: 'save', username: 'ZZZ', avatarUrl: 'public/favicon.ico' },
    { type: 'comment', username: 'OOO', content: '댓글 내용입니다.', avatarUrl: 'public/favicon.ico' },
    { type: 'like', username: 'XXX', avatarUrl: 'public/favicon.ico' },
    { type: 'save', username: 'ZZZ', avatarUrl: 'public/favicon.ico' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const currentNotifications = notifications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {currentNotifications.map((notification, index) => (
          <NotificationItem key={index}>
            <UserImg src={notification.avatarUrl} alt={notification.username} />
            {notification.type === 'comment' && (
              <>
                <strong>{notification.username}</strong>님이 댓글을 달았습니다: {notification.content}
              </>
            )}
            {notification.type === 'like' && (
              <>
                <strong>{notification.username}</strong>님이 좋아요를 눌렀습니다.
              </>
            )}
            {notification.type === 'save' && (
              <>
                <strong>{notification.username}</strong>님이 저장했습니다.
              </>
            )}
          </NotificationItem>
        ))}
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
            <PageNumber key={page} active={currentPage === page} onClick={() => handlePageClick(page)}>
              {page}
            </PageNumber>
          ))}
        </Pagination>
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
`;

const NotificationItem = styled.div`
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
