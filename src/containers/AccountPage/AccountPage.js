import {
  CompassOutlined,
  NotificationOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Result, Row } from 'antd';
import avtDefault from '../../assets/imgs/default-avt.png'

import constants from '../../constants/index';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './AccountPage.scss';
import OrderList from './OrderList';
// import OrderList from './OrderList';
 import UpdateAccountForm from './UpdateForm';
 import AddressUserList from './UserAddressList';

function AccountPage() {
  const { pathname } = useLocation();
  console.log(pathname);
  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const [activeKey, setActiveKey] = useState(() =>
    pathname.replace(`${constants.ROUTES.ACCOUNT}/`, ''),
  );
  // menu list
  const menu = [
    {
      Icon: <UserOutlined className="icon m-r-12 font-size-24px" />,
      title: 'Thông tin tài khoản',
      key: '',
    },
    {
      Icon: <ReconciliationOutlined className="icon m-r-12 font-size-24px" />,
      title: 'Quản lý đơn hàng',
      key: 'orders',
    },
    {
      Icon: <CompassOutlined className="icon m-r-12 font-size-24px" />,
      title: 'Địa chỉ giao hàng',
      key: 'addresses',
    },
    {
      Icon: <NotificationOutlined className="icon m-r-12 font-size-24px" />,
      title: 'Thông báo',
      key: 'notifications',
    },
  ];

  //render component with key
  function renderComponent(key = '') {
    switch (key) {
      case '':
        return (
          <>
            <h2 className="mb-4 text-lg font-bold">Thông tin tài khoản</h2>
            <UpdateAccountForm />
          </>
        );
      case 'orders':
        return (
          <>
            <h2 className="mb-4 text-lg font-bold">Các đơn hàng của bạn</h2>
            <OrderList />
          </>
        );
      case 'addresses':
        return (
          <>
            <h2 className="mb-4 text-lg font-bold">Danh sách địa chỉ giao hàng của bạn</h2>
            <AddressUserList />
          </>
        );
      // case 'notifications':
      //   return (
      //     <>
      //       <h2 className="m-b-16">Thông báo</h2>
      //       <Result
      //         icon={<NotificationOutlined />}
      //         title="Hiện tại, không có thông báo nào"
      //       />
      //       ,
      //     </>
      //   );
      default:
        <>
          <h2 className="m-b-16">Thông tin tài khoản</h2>
          
        </>;
    }
  }

  // event: lấy lại key khi bấm vào đơn hàng menu
  useEffect(() => {
    if (pathname === `${constants.ROUTES.ACCOUNT}/orders`)
      setActiveKey('orders');
  }, [pathname]);

  // rendering ...
  return (
    <>
      {!isAuth ? (
        <div style={{ minHeight: '82vh' }} className="">
          <Result
            title="Đăng nhập để xem thông tin"
            extra={[
              <Button type="primary" key="signup" className="bg-primary">
                <Link to={constants.ROUTES.SIGNUP}>Đăng ký</Link>
              </Button>,
              <Button type="primary" key="login" className="bg-primary">
                <Link to={constants.ROUTES.LOGIN}>Đăng nhập</Link>
              </Button>,
            ]}
          />
        </div>
      ) : (
        <Row className="account-page main mx-3 sm:mx-auto my-10">
          <Col className="pr-2" span={24} md={6}>
            {/* giới thiệu */}
            <div className="flex pb-1 mb-4 intro">
              <img src={avtDefault} width={45} height={45} className="mr-3" alt="logouser" />
              <div>
                <span className="m-b-0 font-size-16px">Tài khoản của</span>
                <h3>
                  <b className="name">{user.fullName}</b>
                </h3>
              </div>
            </div>

            {/* menu */}
            <ul className="account-page-menu my-4">
              {menu.map((item, index) => (
                <Link
                  key={index}
                  to={constants.ROUTES.ACCOUNT + '/' + item.key}>
                  <li
                    className={`account-page-menu-item pb-5 items-center ${
                      item.key === activeKey ? 'active' : ''
                    }`}
                    onClick={() => setActiveKey(item.key)}>
                    <span className="mr-3 text-lg">{item.Icon} </span>
                    <span className="text-sm">{item.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </Col>

          <Col className="px-2" span={24} md={18}>
            {renderComponent(activeKey)}
          </Col>
        </Row>
      )}
    </>
  );
}

export default AccountPage;
