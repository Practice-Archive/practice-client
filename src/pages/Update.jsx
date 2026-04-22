import Editor from "../components/Editor.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const Update = () => {
    const {boardId} = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data, isLoading, error} = useQuery({
        queryKey: ['board-detail', boardId],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/boards/${boardId}`);
            return response.data;
        }
    })

    const {mutate: updateBoard, isPending} = useMutation({
        mutationFn: async (newPost) => {
            await axios.patch(`http://localhost:8080/api/boards/${boardId}`, newPost);
        },
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

    const handleUpdate = (formData) => {
        updateBoard({...formData, memberId: 1});
    }

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생!</div>;

    return (
        <Editor
            onSubmit={handleUpdate}
            initialData={data}
            isPending={isPending}
        />
    )
}

export default Update;