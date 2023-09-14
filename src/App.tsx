import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Mypage from './page/MyPage/MyPage';
import Main from './page/MainPage/Main';
import Login from './page/LoginPage/Login';

function App() {
  return (
    <BrowserRouter>
        <Login />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
