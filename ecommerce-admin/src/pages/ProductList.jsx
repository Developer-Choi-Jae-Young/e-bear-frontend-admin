import "./ProductList.css";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { func } from "prop-types";


const ProductList = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        showCondition: true,  // 검색조건 선택 
        showText: true,       // 검색어 입력 
        showDelete: true,     // 삭제 버튼 
        showWrite: true,      // 글쓰기 버튼 
        showDownload: true,   // 다운로드 버튼 
    };

    let userInfo = {
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    }

    let notice = {
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    let titleInfo = {
        title: '상품관리',
    }

    const labelConfig = {
        searchLabel: "검색조건"
    };

    let pageInfo = {
        searchList: {
            'all': '전체',
            'title': '제품명',
            'seq': '번호',
            'seller': '판매자',
        }
    }

    // 테이블 헤더 정의
    let headCells = [
        {
            id: 'num',
            numeric: false,
            disablePadding: true,
            label: '번호',
            width: 50,
            align: 'center',
        }, {
            id: 'subject',
            numeric: false,
            disablePadding: false,
            label: '제품명',
            width: 200,
            align: 'center',
        },{
            id: 'writer',
            numeric: false,
            disablePadding: false,
            label: '판매자명',
            width: 50,
            align: 'center',
        }, {
            id: 'regDt',
            numeric: false,
            disablePadding: false,
            label: '게시일',
            width: 70,
            align: 'center',
        }, {
            id: 'saleStatusValue',
            numeric: false,
            disablePadding: false,
            label: '판매상태',
            width: 50,
            align: 'center',
        }, {
            id: 'modifyBtn',
            numeric: false,
            disablePadding: false,
            label: '수정유무',
            width: 50,
            align: 'center',
        }
    ];

    const fetchProductList = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/product/list");
            const mappedRows = response.data.map((item) => ({
                num: item.productId,
                subject: item.productName,
                writer: item.seller,
                regDt: item.regDttm,
                saleStatusValue: item.productStatus,
                modifyBtn: (
                    <Button variant="outlined" sx={{ backgroundColor: '#000', color: 'white' }}>수정하기</Button>
                ),
            }));

            setRows(mappedRows);
        } catch (err) {
            console.error("상품 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("상품 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    function selectProduct(key) {
        location.href='http://localhost:5174/user/product/view/' + key
    }

    useEffect(() => {
        fetchProductList();
    }, []);

    if (loading) {
        return <div className="notice-main-section-table">로딩 중...</div>;
    }

    if (error) {
        return <div className="notice-main-section-table">{error}</div>;
    }

    return (
        // <span className="notice-main-section-title">{titleInfo.title}</span>
        //             <hr />
        <div className = "notice-main-section-table" >
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => navigate('/product/write')} detailFunc={selectProduct}/>
        </div >
    );
};

export default ProductList;