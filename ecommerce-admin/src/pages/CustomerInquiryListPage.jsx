import "./CustomerInquiryListPage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import DataTable from "../components/DataTable";

const PRODUCT_NAMES = [
    "오브제 헤어 드라이기 UN-B1919N",
    "에어팟 프로 2세대",
    "갤럭시 버즈3 프로",
]

const generateDummyRows = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const productName = PRODUCT_NAMES[i % PRODUCT_NAMES.length];
        const day = i < 10 ? `0${i}` : `${i}`;
        const year = 2024;
        const month = (i % 12) + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        const isResponded = i % 3 === 0 ? "N" : "Y";

        data.push({
            num: i,
            productName,
            subject: `고객문의 제목 ${i}입니다.`,
            customer: '김철수',
            regDt: `${year}-${monthStr}-${day}`,
            respondDt: isResponded === "Y" ? `${year}-${monthStr}-${day}` : null,
            responder: isResponded === "Y" ? "김영희" : null,
            isResponded,
        });
    }
    return data.reverse(); // 역순으로 정렬
};

// 더미 데이터 갯수 할당 및 생성 
const rows = generateDummyRows(105);

const CustomerInquiryListPage = () => {
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
        title: '고객문의',
    }

    const labelConfig = {
        statusLabel: "답변유무",
        searchLabel: "검색조건"
    };

    let pageInfo = {
        searchList: {
            all: "전체",
            productName: "제품명",
            title: "제목",
        },
        statusList: {
            all: "전체",
            Y: "답변완료",
            N: "미답변",
        },
    };

    // 테이블 헤더 정의
    let headCells = [
        {
            id: 'num',
            numeric: false,
            disablePadding: true,
            label: '번호',
            width: 60,
            align: 'center',
        },
        {
            id: 'productName',
            numeric: false,
            disablePadding: false,
            label: '제품명',
            width: 200,
            align: 'center',
        },
        {
            id: 'subject',
            numeric: false,
            disablePadding: false,
            label: '제목',
            width: 320,
            align: 'left',
        },
        {
            id: 'customer',
            numeric: true,
            disablePadding: false,
            label: '고객명',
            width: 70,
            align: 'center',
        },
        {
            id: 'regDt',
            numeric: true,
            disablePadding: false,
            label: '등록일자',
            width: 90,
            align: 'center',
        },
        {
            id: 'respondDt',
            numeric: true,
            disablePadding: false,
            label: '답변일자',
            width: 90,
            align: 'center',
        },
        {
            id: 'responder',
            numeric: false,
            disablePadding: false,
            label: '답변자',
            width: 70,
            align: 'center',
        },
    ];

    return (
        // <span className="inquiry-main-section-title">고객문의</span>
        // <hr />
        <div className="inquiry-main-section-table">
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')} selectFunc={() => console.log('')}/>
        </div>
    );
};

export default CustomerInquiryListPage;