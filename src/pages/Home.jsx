import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import './Home.css';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const goToWrite = () => {
        navigate("/write");
    }
    const goToBoard = (id) => {
        navigate(`/board/${id}`);
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ['boards'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/boards`)
            return response.data;
        }
    })

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return <div className="home">
        <h1>게시글 목록</h1>
        <hr />
        <ul className="list">
            {data.map(board => (
                <li key={board.boardId} className="board" onClick={()=>goToBoard(board.boardId)}>
                    <div> {board.boardId} </div>
                    <div> {board.title} </div>
                    <div> {board.content} </div>
                    <div> {board.commentCount} </div>
                    <div> {board.nickname} </div>
                </li>
            ))}
        </ul>
        <button onClick={goToWrite}>글쓰기</button>
    </div>
}
export default Home;