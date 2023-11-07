import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = props => {
  const [hasNewLikes, setHasNewLikes] = useState(false);

  useEffect(() => {
    // 서버의 Stomp 엔드포인트 URL
    const socket = new SockJS('YOUR_BACKEND_URL/your-websocket-endpoint');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/topic/likes', function(notification) {
        setHasNewLikes(true);
      });
    });

    return () => {
      if (stompClient) {
        // stompClient.disconnect();
      }
    };
  }, []);

  const handleNotificationClick = () => {
    setHasNewLikes(false);
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
