import './Editor.css'
import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const createBoard = async (newPost) => {
    const response = await axios.post("http://localhost:8080/api/boards", newPost);
    return response.data;
}

const Editor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            alert("성공!")
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({title, content, memberId: 1});
    }

    return <div className="Editor">
        <form className="board-form" onSubmit={handleSubmit}>
            <input className="input-title" type="text" name="title" placeholder="제목을 입력"
            value={title}
                   onChange={(e) => setTitle(e.target.value)} />
            <textarea className="input-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)} />
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "등록 중..." : "제출 하기"}
            </button>
        </form>
    </div>
}

export default Editor;