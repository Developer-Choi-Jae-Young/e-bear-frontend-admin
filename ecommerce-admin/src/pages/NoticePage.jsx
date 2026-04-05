import "./NoticePage.css";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";

const NoticePage = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showDate: true,      // 날짜 검색 
        showCondition: true, // 검색조건 선택 
        showText: true,      // 검색어 입력 
        showDelete: true,    // 삭제 버튼 
        showWrite: true,      // 글쓰기 버튼 
    };

    let pageInfo = {
        searchList: {
            'all': '전체',
            'content': '내용',
            'title': '제목',
            'writer': '작성자'
        }
    }

    // 테이블 헤더 정의
    let headCells = [
        {
            id: 'num',
            numeric: false,
            disablePadding: true,
            label: '번호',
            width: 60,
            align: 'center',
        }, {
            id: 'subject',
            numeric: false,
            disablePadding: false,
            label: '제목',
            width: 400,
            align: 'left',
        },
        {
            id: 'writer',
            numeric: true,
            disablePadding: false,
            label: '작성자',
            width: 100,
            align: 'center',
        },
        {
            id: 'regDt',
            numeric: true,
            disablePadding: false,
            label: '등록일자',
            width: 150,
            align: 'center',
        },
        {
            id: 'viewCnt',
            numeric: true,
            disablePadding: false,
            label: '조회수',
            width: 80,
            align: 'center',
        },
    ];

    const labelConfig = {
        searchLabel: "검색조건"
    };

    const fetchNoticeList = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/notification/list");

            const mappedRows = response.map((item) => ({
                num: item.notificationNo,
                subject: item.title,
                writer: item.writer,
                regDt: item.regDt ? item.regDt.substring(0, 10) : "",
                viewCnt: item.viewCnt,
                notificationNo: item.notificationNo,
            }));

            setRows(mappedRows);
        } catch (err) {
            console.error("공지사항 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("공지사항 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNoticeList();
    }, []);

    const handleDelete = async (selectedIds) => {
        if (!selectedIds || selectedIds.length === 0) {
            alert("삭제할 공지사항을 선택해주세요.");
            return;
        }

        const confirmed = window.confirm("선택한 공지사항을 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
            await api.post("/notification/delete", selectedIds);
            alert("삭제되었습니다.");
            fetchNoticeList();
        } catch (err) {
            console.error("공지사항 삭제 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return <div className="notice-main-section-table">로딩 중...</div>;
    }

    if (error) {
        return <div className="notice-main-section-table">{error}</div>;
    }

    return (
        <div className="notice-main-section-table">
            <DataTable
                pageInfo={pageInfo}
                headCells={headCells}
                rows={rows}
                searchConfig={searchConfig}
                labelConfig={labelConfig}
                writeFunc={() => window.location.href = '/admin/notice/write'}
                deleteFunc={handleDelete} />
        </div>
    );
};

export default NoticePage;