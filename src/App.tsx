import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './page/MainPage/Main';
import MainLayout from './component/MainLayout';
import LoginContainer from './page/LoginPage/LoginContainer';
import EditMyInfo from './page/myPage/EditInfo/EditMyInfo';
import MyInfo from './page/myPage/MyInfo';
import SignupForm from './page/LoginPage/SignupForm';
import LookMap from './page/reviewMap/LookMap';
import Schedule from './page/SchedulePage/Schedule';
import SearchPage from './page/SearchPage';
import SecheduleDetail from './page/DetailPage/SecheduleDetail';
import EditSchedule from './page/EditPage/EditSchedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header,Footer 보여주고 싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/lookmap" element={<LookMap />} />
        </Route>
        {/* Header,Footer을 안 보여주고 싶은 컴포넌트 */}
        <Route path="/editmyinfo" element={<EditMyInfo />} />
        <Route path="/" element={<LoginContainer />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/editschedule" element={<EditSchedule />} />
        <Route path="/schedule/:id" element={<SecheduleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
