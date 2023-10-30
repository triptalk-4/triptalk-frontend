import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './page/MainPage/Main';
import MainLayout from './component/MainLayout';
import LoginContainer from './page/LoginPage/LoginContainer';
import EditMyInfo from './page/MyPage/EditInfo/EditMyInfo';
import MyInfo from './page/MyPage/MyInfo';
import SignupForm from './page/LoginPage/SignupForm';
import Schedule from './page/SchedulePage/Schedule';
import SearchPage from './page/SearchPage';
import SecheduleDetail from './page/DetailPage/SecheduleDetail';
import AddSchedule from './page/EditPage/AddSchedule';
import Travel from './page/TravelPage/TravelMap';
import AuthHandler from './component/SocialLogin/AuthHandler';
import GoogleLogin from './component/SocialLogin/GoogleLogin';
import EditSchedule from './page/EditPage/EditSchedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header,Footer 보여주고 싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/travelmap" element={<Travel />} />
          <Route path="/myinfo/:userId" element={<MyInfo />} />
          <Route path="/page/:plannerId" element={<SecheduleDetail />} />
          <Route path="/EditSchedule/:plannerId" element={<EditSchedule />} />
          <Route path="/addSchedule" element={<AddSchedule />} />
        </Route>
        {/* Header,Footer을 안 보여주고 싶은 컴포넌트 */}
        <Route path="/editmyinfo" element={<EditMyInfo />} />
        <Route path="/" element={<LoginContainer />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/auth" Component={AuthHandler} />
        <Route path="/auth/google" Component={GoogleLogin} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
