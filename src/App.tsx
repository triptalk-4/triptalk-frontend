import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Mypage from './page/MyPage/MyInfo';
import Main from './page/Main/Main';
import MainLayout from './MainLayout';
import EditMyInfo from './page/MyPage/EditMyInfo';

function App() {
  return (
    <BrowserRouter>
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
