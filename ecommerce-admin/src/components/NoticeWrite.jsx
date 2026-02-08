import "./NoticeWrite.css";
import Editor from "./Editor";
import api from "../api/axios";

const NoticeWrite = () => {
    function onClickEvent() {
        try {
            // GET 요청 예시
            const data = api.get('/write');
        } catch (err) {
            console.error("로딩 실패:", err);
        }
    }

    return (
        <>
            <div className="editor-container">
                <div className="editor-wrapper">
                    {/* 제목 입력창 */}
                    <input
                        className="editor-title-input"
                        placeholder="제목을 입력해주세요"
                    />

                    {/* 에디터 */}
                    <Editor />

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