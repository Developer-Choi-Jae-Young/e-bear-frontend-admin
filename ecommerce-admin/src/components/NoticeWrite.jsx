import "./NoticeWrite.css";
import Editor from "./Editor";
import api from "../api/axios";
import { useState } from "react";

const NoticeWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onClickEvent = async () => {
        try {
            const response = await api.post(
                "/notification/write",
                {
                    title,
                    content,
                }
            );

            console.log("등록 성공:", response.data);
        } catch (err) {
            console.error("등록 실패:", err);
            console.error(err.response?.status);
            console.error(err.response?.data);
        }
    };

    return (
        <>
            <div className="editor-container">
                <div className="editor-wrapper">
                    {/* 제목 입력창 */}
                    <input
                        className="editor-title-input"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* 에디터 */}
                    <Editor
                        value={content}
                        onChange={setContent}
                    />

                    {/* 버튼 영역 */}
                    <div className="editor-actions">
                        <button className="btn cancel">취소</button>
                        <button onClick={onClickEvent} className="btn submit">등록</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoticeWrite;