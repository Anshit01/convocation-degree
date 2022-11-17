import Homepage from "./components/homepage/homepage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Faqs from "./components/faqs/faqs";
import Degree from "./components/degree/degree";
import Admin from "./components/admin/admin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/faqs" element={<Faqs />}></Route>
          <Route path="/degree/:rollno" element={<Degree/>}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
