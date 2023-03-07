import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Update from "./components/Update";
import Write from "./components/Write";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/write/:date' element={<Write />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
