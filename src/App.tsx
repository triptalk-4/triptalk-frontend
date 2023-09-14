import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Mypage from './page/MyPage/MyInfo';
import Main from './page/Main/Main';
import MainLayout from './MainLayout';  


function App() {
  return (
    <BrowserRouter>
        <Login />
      <Routes>
        {/* Header,Footer 보여주고 싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/myinfo" element={<Mypage />} />
        </Route>
        {/* Header,Footer을 안 보여주고 싶은 컴포넌트 */}
        <Route path="/editmyinfo" element={<EditMyInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
