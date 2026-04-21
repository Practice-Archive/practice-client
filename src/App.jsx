import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import './App.css';
import Board from "./pages/Board.jsx";
import Write from "./pages/Write.jsx"
import Update from "./pages/Update.jsx";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/edit/:boardId" element={<Update />} />
    </Routes>
  )
}

export default App
