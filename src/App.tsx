import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Mypage from './page/MyPage/MyPage';
import Main from './page/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
