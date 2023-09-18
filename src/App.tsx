import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './page/Main/Main';
import MainLayout from './component/MainLayout';
import LoginContainer from './page/LoginPage/LoginContainer';
import EditMyInfo from './page/mypage/EditMyInfo';
import MyInfo from './page/mypage/MyInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header,Footer 보여주고 싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/myinfo" element={<MyInfo />} />
        </Route>
        {/* Header,Footer을 안 보여주고 싶은 컴포넌트 */}
        <Route path="/editmyinfo" element={<EditMyInfo />} />
        <Route path='/' element={<LoginContainer/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
