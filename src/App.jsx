import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import './App.css';
import Board from "./pages/Board.jsx";
import Write from "./pages/Write.jsx"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board/:boardId" element={<Board />} />
    </Routes>
  )
}

export default App
