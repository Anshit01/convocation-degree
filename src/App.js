import Homepage from "./components/homepage/homepage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Faqs from "./components/faqs/faqs";
import Degree from "./components/degree/degree";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/faqs" element={<Faqs />}></Route>
          <Route path="/getDegree" element={<Degree name = "Induja Kala" rollNo = "195013" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
