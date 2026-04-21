import Editor from "../components/Editor.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const createBoard = async (newPost) => {
    const response = await axios.post("http://localhost:8080/api/boards", newPost);
    return response.data;
}

const Write = () => {
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

    const handleCreate = (formData) => {
        mutation.mutate({...formData, memberId: 1});
    }

    return (
        <Editor
            onSubmit={handleCreate}
            isPending={mutation.isPending}
        />
    )
}

export default Write