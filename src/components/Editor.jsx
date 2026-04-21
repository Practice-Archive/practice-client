import './Editor.css'
import {useState} from "react";

const Editor = ({ onSubmit, initialData, isPending }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({title, content});
    }

    return <div className="Editor">
        <form className="board-form" onSubmit={handleSubmit}>
            <input className="input-title" type="text" name="title" placeholder="제목을 입력"
            value={title}
                   onChange={(e) => setTitle(e.target.value)} />
            <textarea className="input-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)} />
            <button type="submit" disabled={isPending}>
                {isPending ? "등록 중..." : "제출 하기"}
            </button>
        </form>
    </div>
}

export default Editor;