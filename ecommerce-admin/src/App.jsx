import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import './App.css'
import SideNavigation from "./components/SideNavigation";
import MainPage from './pages/MainPage'
import ProductList from './pages/ProductList'
import NoticePage from './pages/NoticePage'
import NoticeWritePage from './pages/NoticeWritePage'
import NoticeDetail from './pages/NoticeDetail'
import MemberList from './pages/MemberList'
import CustomerInquiryListPage from './pages/CustomerInquiryListPage'
import CustomerInquiry from './pages/CustomerInquiry'
import ProductRegister from './pages/ProductRegister'
import OrderListPage from './pages/OrderListPage';
import Header from './components/Header';
import Login from './pages/Login'
import CommonError from './pages/commonError';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let userInfo = {
    name: '이베어',
    email: 'ebear@knou.ac.kr'
  }

  let navigation = [
    { subject: 'HOME', url: '/home' },
    { subject: '공지사항', url: '/notice' },
    { subject: '상품관리', url: '/proudct' },
    { subject: '회원목록', url: '/member' },
    { subject: '주문목록', url: '/order' },
    { subject: '문의목록', url: '/inquiry' }
  ];

  let notice = {
    content:'[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
  }

  if (location.pathname === '/admin/err') {
    return (
      <Routes>
        <Route path="/err" element={<CommonError />} />
        <Route path="*" element={<CommonError />} />
      </Routes>
    );
  }

  if (!isLoggedIn) {
    return (
      
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
    );
  }

  return (
    <div className='admin-container'>
      <SideNavigation userInfo={userInfo} navigation={navigation} />
      <div className='main-container'>
        <Header notice={notice} />
        <div className='main-section'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/view/:id" element={<NoticeDetail />} />
            <Route path="/notice/write" element={<NoticeWritePage />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/write" element={<ProductRegister />} />
            <Route path="/member" element={<MemberList />} />
            <Route path="/order" element={<OrderListPage />} />
            <Route path="/inquiry" element={<CustomerInquiryListPage />} />
            <Route path="/inquiry/view/:id" element={<CustomerInquiry />} />
            <Route path="/inquiry/write" element={<CustomerInquiry />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
