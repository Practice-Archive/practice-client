import Editor from "../components/Editor.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Write = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: createBoard, isPending} = useMutation({
        mutationFn: async (newPost) => {
            await axios.post("http://localhost:8080/api/boards", newPost);
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

    const handleCreate = (formData) => {
        createBoard({...formData, memberId: 1});
    }

    return (
        <Editor
            onSubmit={handleCreate}
            isPending={isPending}
        />
    )
}

export default Write