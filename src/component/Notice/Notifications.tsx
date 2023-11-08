import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface NotificationsProps {
  // 프롭스 타입 정의
}

const Notifications: React.FC<NotificationsProps> = props => {
  const [hasNewLikes, setHasNewLikes] = useState(false);

  useEffect(() => {
    // 서버의 Stomp 엔드포인트 URL
    const socket = new SockJS('YOUR_BACKEND_URL/your-websocket-endpoint');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);

      // 서버에서 메시지를 보낼 때 사용하는 destination을 구독합니다.
      stompClient.subscribe('/topic/likes', function(notification) {
        // 좋아요 알림을 받으면 UI를 업데이트합니다.
        setHasNewLikes(true);
      });
    });

    // 컴포넌트가 언마운트될 때 연결을 끊습니다.
    return () => {
      if (stompClient) {
        // stompClient.disconnect();
      }
    };
  }, []);

  // 알림 아이콘 클릭 핸들러
  const handleNotificationClick = () => {
    // 알림을 확인했으므로 빨간 점을 숨깁니다.
    setHasNewLikes(false);
    // 여기서 알림 모달을 열거나 알림 페이지로 리다이렉트할 수 있습니다.
  };

  return (
    <div>
      <div onClick={handleNotificationClick}>
        <i className="fas fa-heart"></i>
        {hasNewLikes && <span className="notification-dot"></span>}
      </div>
    </div>
  );
};

export default Notifications;
