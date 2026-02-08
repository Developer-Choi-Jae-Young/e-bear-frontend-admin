import { useState, useMemo } from 'react';
import "./OrderListPage.css";
import PopUp from '../components/PopUp';
import Receipt from '../components/Receipt';
import DataTable from "../components/DataTable";
import { Button } from "@mui/material";

const PRODUCT_NAMES = [
  "오브제 헤어 드라이기 UN-B1919N",
  "에어팟 프로 2세대",
  "갤럭시 버즈3 프로",
]

const ORDER_STATUSES = ["PAY_DONE", "SHIPPING", "DELIVERED"];

const ORDER_STATUS_LABEL = {
  PAY_DONE: "결제완료",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
};

const generateDummyRows = (count, onReceiptClick) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const productName = PRODUCT_NAMES[i % PRODUCT_NAMES.length];
    const day = i < 10 ? `0${i}` : `${i}`;
    const year = 2024;
    const month = (i % 12) + 1;
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const quantity = 999;
    const price = 100000000;
    const orderStatusCode = ORDER_STATUSES[i % ORDER_STATUSES.length];
    const orderStatus = ORDER_STATUS_LABEL[orderStatusCode];

    const row = {
      num: i,
      productName,
      quantity,
      price: price.toLocaleString(),
      customer: '김철수',
      paidDt: `${year}-${monthStr}-${day}`,
      orderStatus,
      orderStatusCode,
    };

    row.receipt = (
      <Button
        variant="outlined"
        size="small"
        sx={{ backgroundColor: '#000', color: 'white' }}
        onClick={(e) => { onReceiptClick?.(); }}
      >
        확인하기
      </Button>
    );
    data.push(row);
  }
  return data.reverse(); // 역순으로 정렬
};

const OrderListPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openReceiptPopup = () => setIsOpen(true);
  const handleClosePopup = () => setIsOpen(false);

  // rows는 한 번만 만들도록 함
  const rows = useMemo(() => generateDummyRows(105, openReceiptPopup), []);

  const receiptInfo = {
    paymentMethod: '신용카드',
    orderNumber: '1234567890',
    orderDate: '2025-01-01 19:15:33',
    orderAmount: 100000,
    seller: '드라이기만 판매하는 판매자',
    totalAmount: 100000,
    discountInfo: '30%',
    orderList: [
      { productName: "드라이기", amount: "1", price: "10,000원" },
      { productName: "드라이기", amount: "1", price: "10,000원" },
      { productName: "드라이기", amount: "1", price: "10,000원" }
    ]
  }

  const searchConfig = {
    showDate: false,      // 날짜 검색 
    showCondition: true, // 검색조건 선택 
    showText: true,      // 검색어 입력 
    showDelete: false,    // 삭제 버튼 
    showWrite: false,      // 글쓰기 버튼
  };

  const labelConfig = {
    statusLabel: "주문상태",
    searchLabel: "검색조건"
  };

  let pageInfo = {
    searchList: {
      all: "전체",
      productName: "제품명",
      customer: "고객명",
    },
    statusList: {
      all: "전체",
      PAY_DONE: "결제완료",
      SHIPPING: "배송중",
      DELIVERED: "배송완료",
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
      id: 'quantity',
      numeric: false,
      disablePadding: false,
      label: '수량',
      width: 70,
      align: 'center',
    },
    {
      id: 'price',
      numeric: false,
      disablePadding: false,
      label: '금액',
      width: 100,
      align: 'center',
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
      id: 'paidDt',
      numeric: true,
      disablePadding: false,
      label: '결제일',
      width: 90,
      align: 'center',
    },
    {
      id: 'orderStatus',
      numeric: false,
      disablePadding: false,
      label: '주문상태',
      width: 90,
      align: 'center',
    },
    {
      id: 'receipt',
      numeric: false,
      disablePadding: false,
      label: '영수증',
      width: 70,
      align: 'center',
    },
  ];

  return (
    <>
      <div className="order-main-section-table">
        <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')}/>
      </div>
      <PopUp
        isOpen={isOpen}
        onClose={handleClosePopup}
        title={"영수증"}
        component={<Receipt receiptInfo={receiptInfo} />}
      />
    </>
  )
}

export default OrderListPage
