import "./NoticeDetail.css";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthorIcon, CalendarIcon, EyeIcon } from "../components/CustomTag";

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { notificationNo } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNoticeDetail = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/notification/detail/${notificationNo}`);
                setNotice(response.data);
            } catch (err) {
                console.error("공지사항 상세 조회 실패:", err);
                console.error("status:", err.response?.status);
                console.error("data:", err.response?.data);
                setError("공지사항 상세 정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchNoticeDetail();
    }, [notificationNo]);

    const handleDelete = async () => {
        const confirmed = window.confirm("이 공지사항을 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
            await api.post("/notification/delete", [Number(notificationNo)]);
            alert("공지사항이 삭제되었습니다.");
            navigate("/notice");
        } catch (err) {
            console.error("공지사항 삭제 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return <div className="body-container">로딩 중...</div>;
    }

    if (error) {
        return <div className="body-container">{error}</div>;
    }

    if (!notice) {
        return <div className="body-container">공지사항이 없습니다.</div>;
    }

    return (
        <div className='body-container'>
            <span className="notice-main-section-title">공지사항</span>
            <hr />

            <div className='notice-name'>
                {notice.title}
            </div>

            <div className="post-meta-container">
                <div className="meta-item">
                    <AuthorIcon className="meta-icon" />
                    <span>{notice.writer}</span>
                </div>

                <div className="meta-item">
                    <CalendarIcon className="meta-icon" />
                    <span>{notice.regDt ? notice.regDt.substring(0, 10).replaceAll("-", ".") : "-"}</span>
                </div>

                <div className="meta-item">
                    <EyeIcon className="meta-icon" />
                    <span>{notice.viewCnt}</span>
                </div>
            </div>

            <div
                className="notice_content"
                dangerouslySetInnerHTML={{ __html: notice.content }}
            />

            <div className="notice-buttons">
                <button className="notice-btn notice-btn-modify">수정</button>
                <button
                    className="notice-btn notice-btn-delete"
                    onClick={handleDelete}
                >삭제</button>
                <button
                    className="notice-btn notice-btn-list"
                    onClick={() => navigate("/notice")}
                >목록</button>
            </div>
        </div>
    );
};

export default NoticeDetail;