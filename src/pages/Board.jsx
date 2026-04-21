import './Board.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const Board = () => {
    const  {boardId} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteBoard = async () => {
        const response = await axios.delete(`http://localhost:8080/api/boards/${boardId}`);
        return response.data;
    }

    const mutation = useMutation({
        mutationFn: deleteBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            queryClient.invalidateQueries({ queryKey: ['board-detail', boardId] });
            alert("성공!")
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleDelete = () => {
        mutation.mutate()
    }

    const goBack = () => {
        navigate(-1);
    }

    const goUpdate = () => {
        navigate(`/edit/${boardId}`);
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
                <li key={reply.replyId} className="reply">
                    <div>{reply.nickname}</div>
                    <div>{reply.content}</div>
                </li>
            ))}
        </ul>
        <button onClick={goBack}>뒤로 가기</button>
        <button onClick={goUpdate}>수정 하기</button>
        <button onClick={handleDelete}>삭제 하기</button>
    </div>
}

export default Board;