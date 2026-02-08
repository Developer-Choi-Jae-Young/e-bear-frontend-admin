import "./NoticePage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import DataTable from "../components/DataTable"; 

const generateDummyRows = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const day = i < 10 ? `0${i}` : `${i}`;
        const year = 2026;
        const month = (i % 12) + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        
        data.push({
            num: i,
            productName: `오브젝트 ${i}`,
            subject: `공지사항 제목 ${i}입니다.`,
            writer: `고객명${i % 5 + 1}`, 
            regDt: `${year}-${monthStr}-${day}`, 
            answerDt: `${year}-${monthStr}-${day}`, 
            answer: `답변자${i % 5 + 1}`, 
        });
    }
    return data.reverse(); // 역순으로 정렬
};

// 더미 데이터 갯수 할당 및 생성 
const rows = generateDummyRows(105);

const NoticePage = () => {
    let navigation = [
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'}
    ];

    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showDate: false,      // 날짜 검색 
        showCondition: true, // 검색조건 선택 
        showText: true,      // 검색어 입력 
        showDelete: false,    // 삭제 버튼 
        showWrite: false,      // 글쓰기 버튼 
        showDelete: true,      // 삭제 버튼 
    }; 

    let userInfo = {
        name:'이베어',
        email:'ebear@knou.ac.kr'
    }

    let notice = {
        content:'[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    let titleInfo = {
        title : '상품신고',
    }

    const labelConfig = {
        statusLabel: "신고상태",
        searchLabel: "검색조건"
    };

    let pageInfo = {
        statusList : {
            'all': '전체',
            'answerComplete': '답변완료',
            'resiterComplete': '접수완료',
            'process': '처리중'
        },
        searchList : {
            'all': '전체',
            'productName': '제품명',
            'title': '제목',
            'writer': '고객명'
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
        },{
            id: 'productName',
            numeric: false,
            disablePadding: false,
            label: '제품명',
            width: 100,
            align: 'center',
        },{
            id: 'subject',
            numeric: false,
            disablePadding: false,
            label: '제목',
            width: 200,
            align: 'left',
        },
        {
            id: 'writer',
            numeric: false,
            disablePadding: false,
            label: '고객명',
            width: 70,
            align: 'center',
        },
        {
            id: 'writer',
            numeric: false,
            disablePadding: false,
            label: '신고상태',
            width: 70,
            align: 'center',
        },
        {
            id: 'regDt',
            numeric: true,
            disablePadding: false,
            label: '등록일시',
            width: 100,
            align: 'center',
        },
        {
            id: 'answerDt',
            numeric: true,
            disablePadding: false,
            label: '답변일시',
            width: 100,
            align: 'center',
        },
        {
            id: 'answer',
            numeric: false,
            disablePadding: false,
            label: '답변자',
            width: 70,
            align: 'center',
        },
    ];

    return (
        <div className='admin-container'>
            <SideNavigation userInfo={userInfo} navigation={navigation}/>
            <div className='main-container'>
                <Header notice={notice}/>
                <div className='main-section'>
                    <span className="notice-main-section-title">상품신고</span>
                    <hr />
                    {/* 순서대로 게시판 데이터, 표 헤더 데이터, 출력 데이터, 검색조건, selectBox라벨 */}
                    <div className="notice-main-section-table">
                        <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticePage;