import "./NoticePage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { href } from "react-router-dom";

const generateDummyRows = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const day = i < 10 ? `0${i}` : `${i}`;
        const year = 2024;
        const month = (i % 12) + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;

        data.push({
            num: i,
            subject: `공지사항 제목 ${i}입니다.`,
            writer: `관리자${i % 5 + 1}`,
            regDt: `${year}-${monthStr}-${day}`,
            viewCnt: Math.floor(Math.random() * 500) + 50,
            testNum: Math.floor(Math.random() * 100) + 1,
        });
    }
    return data.reverse(); // 역순으로 정렬
};

// 더미 데이터 갯수 할당 및 생성 
const rows = generateDummyRows(105);

const NoticePage = () => {
    let navigation = [
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' }
    ];

    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showDate: true,      // 날짜 검색 
        showCondition: true, // 검색조건 선택 
        showText: true,      // 검색어 입력 
        showDelete: true,    // 삭제 버튼 
        showWrite: true,      // 글쓰기 버튼 
    };

    let userInfo = {
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    }

    let notice = {
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    let titleInfo = {
        title: '공지사항',
    }

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

    return (
        // <span className="notice-main-section-title">공지사항</span>
        //             <hr />
        <div className="notice-main-section-table">
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => window.location.href='/admin/notice/write'} />
        </div>
    );
};

export default NoticePage;