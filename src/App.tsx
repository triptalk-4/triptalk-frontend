import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyPage from "./page/mypage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
