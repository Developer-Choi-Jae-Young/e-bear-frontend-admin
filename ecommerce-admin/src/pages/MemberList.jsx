import "./MemberList.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { Button } from "@mui/material";

const generateDummyRows = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const day = i < 10 ? `0${i}` : `${i}`;
        const year = 2024;
        const month = (i % 12) + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;

        data.push({
            num: i,
            ID: `KimID`,
            name: `이동균`,
            address: `서울특별시 서초구 우면동`,
            phone: '010-1234-1234',
            memberAccess: '판매자',
            modify: <div class="modify"><Button variant="outlined" color="black">수정</Button></div>
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
        showDate: false,      // 날짜 검색 
        showCondition: true, // 검색조건 선택 
        showText: true,      // 검색어 입력 
        showDelete: true,    // 삭제 버튼 
        showWrite: false,      // 글쓰기 버튼 
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
            'ID': '아이디',
            'name': '이름',
            'access': '권한'
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
            id: 'ID',
            numeric: false,
            disablePadding: false,
            label: '아이디',
            width: 100,
            align: 'left',
        },
        {
            id: 'name',
            numeric: true,
            disablePadding: false,
            label: '이름',
            width: 100,
            align: 'center',
        },
        {
            id: 'address',
            numeric: true,
            disablePadding: false,
            label: '주소',
            width: 500,
            align: 'center',
        },
        {
            id: 'phone',
            numeric: true,
            disablePadding: false,
            label: '연락처',
            width: 80,
            align: 'center',
        },
        {
            id: 'memberAccess',
            numeric: true,
            disablePadding: false,
            label: '회원권한',
            width: 80,
            align: 'center',
        },
        {
            id: 'modify',
            numeric: true,
            disablePadding: false,
            label: '수정',
            width: 100,
            align: 'center',
        },
    ];

    const labelConfig = {
        searchLabel: "검색조건"
    };

    return (
        // <Header notice={notice} titleInfo={titleInfo}/>
        <div className='main-section'>
            {/* 순서대로 게시판 데이터, 표 헤더 데이터, 출력 데이터, 검색조건 */}
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')}/>
        </div>
    );
};

export default NoticePage;