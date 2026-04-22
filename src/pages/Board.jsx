import './Board.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

const Board = () => {
    const [reply, setReply] = useState("");
    const  {boardId} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: deleteBoard, isPending: isPendingDelete} = useMutation({
        mutationFn: async ()=> {
            await axios.delete(`http://localhost:8080/api/boards/${boardId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            alert("성공!")
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const {mutate: createReply, isPending: isPendingReply} = useMutation({
        mutationFn: async (newReply)=> {
            console.log(newReply);
            await axios.post(`http://localhost:8080/api/replies`, newReply)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board-detail', boardId] });
            alert("성공!");
            setReply("");
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleCreateReply = (e) => {
        e.preventDefault();
        createReply({ content: reply, memberId: 1, boardId: boardId });
    }

    const goBack = () => {
        navigate(`/`);
    }

    const goUpdate = () => {
        navigate(`/edit/${boardId}`);
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ['board-detail', boardId],
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
        <form className="reply-input" onSubmit={handleCreateReply}>
            <input type="text" name="reply"
                   value={reply}
                   onChange={(e)=>setReply(e.target.value)} />
            <button type="submit" disabled={isPendingReply}>{isPendingReply? "작성 중.." : "작성"}</button>
        </form>
        <button onClick={goBack}>뒤로 가기</button>
        <button onClick={goUpdate}>수정 하기</button>
        <button onClick={deleteBoard} disabled={isPendingDelete}>{isPendingDelete ? "삭제 중..." : "삭제 하기"}</button>
    </div>
}

export default Board;