import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Mypage from './page/mypage/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
