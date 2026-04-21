import './Board.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const Board = () => {
    const  {boardId} = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ['board-detail'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/boards/${boardId}`);
            return response.data;
        }
    })

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return <div className="board-container">
        <h1>{data.title}</h1>
        <hr/>
        <div className="content">
            {data.content}
        </div>
        <ul className="replies">
            {data.replies.map(reply => (
                <li key={reply.id} className="reply">
                    <div>{reply.nickname}</div>
                    <div>{reply.content}</div>
                </li>
            ))}
        </ul>
        <button onClick={goBack}>뒤로 가기</button>
    </div>
}

export default Board;