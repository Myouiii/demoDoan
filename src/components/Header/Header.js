import { Link, useLocation } from 'react-router-dom';
import './Header.scss'
import image from '../../assets/imgs/sec_logo.png'
import avtDefault from '../../assets/imgs/default-avt.png'

import { MenuOutlined, ReconciliationOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Badge, Button, Drawer, Dropdown, Input, Menu, message } from 'antd';
import { useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md"
import { HiOutlineMenu } from "react-icons/hi"
import { useSelector } from 'react-redux';
import constants from '../../constants';
import CartView from './CartView/CartView';
import loginApi from '../../apis/loginApi';
function totalItemCarts(carts) {
    if (carts) {
        return carts.reduce((total, item) => total + item.amount, 0);
    }
}

function Header(isMobile) {
    const [openMenu, setOpenMenu] = useState(false);
    const { isAuth } = useSelector((state) => state.authenticate);
    const user = useSelector((state) => state.user);
    const carts = useSelector((state) => state.carts);
    const locations = useLocation().pathname;
    const initLink = '/search?keyword=';
    const [linkSearch, setLinkSearch] = useState('');
    const [isMdDevice, setIsMdDevice] = useState(false);
    const [isSmDevice, setIsSmDevice] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    
    const renderTitle = (title) => (
        <span>
            {title}
            <a
                style={{
                    float: 'right',
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
            </a>
        </span>
    );
    const renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    });
    // event: log out
    const onLogout = async () => {
        try {
            const response = await loginApi.postLogout();
            if (response) {
                message.success('Đăng xuất thành công', 2);
                localStorage.removeItem(constants.REFRESH_TOKEN_KEY);
                if (process.env.NODE_ENV === 'production')
                    localStorage.removeItem(constants.ACCESS_TOKEN_KEY);

                window.location.reload();
            }
        } catch (error) {
            console.log("error: ", error);
            message.error('Đăng xuất thất bại', 2);
        }
    };
    // event: get event change window width
    useEffect(() => {
        const w = window.innerWidth;
        if (w <= 992) setIsMdDevice(true);
        if (w <= 480) setIsSmDevice(true);
        const resize = function () {
            const width = window.innerWidth;
            if (width <= 992) {
                setIsMdDevice(true);
            } else {
                setIsMdDevice(false);
            }
            if (width <= 480) setIsSmDevice(true);
            else setIsSmDevice(false);
        }
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    // event: close drawer to redirect
    useEffect(() => {
        setDrawerVisible(false);
    }, [locations]);
    const options = [
        {
            label: renderTitle('Libraries'),
            options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
        },
        {
            label: renderTitle('Solutions'),
            options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
        },
        {
            label: renderTitle('Articles'),
            options: [renderItem('AntDesign design language', 100000)],
        },
    ];

    // Menu for user action
    const items = [
        {
            label: <>
                {isAuth ? (
                    <Button
                        onClick={onLogout}
                        size="large"
                        className="w-full"
                        type="primary"
                        danger={isAuth}>
                        Đăng xuất
                    </Button>
                ) : (
                    <Button size="large" className="w-full bg-primary" type="primary">
                        <Link to={'/login'}>Đăng nhập</Link>
                    </Button>
                )}
            </>,
            key: 'item-1'
        }, // remember to pass the key prop
        {
            label: <>
                <Link to={'/signup'}>
                    <Button size="large" className="w-full text-white bg-secondary" type="default">
                        Đăng ký
                    </Button>
                </Link>
            </>,
            key: 'item-2'
        }, // which is required
        {
            label: <>
                {isAuth && (
                    <Link to={constants.ROUTES.ACCOUNT + '/'}>
                        <Button size="large" className="w-full text-white bg-secondary" type="default">
                            Quản lý Tài khoản
                        </Button>
                    </Link>
                )}
            </>,
            key: 'item-3'

        }
    ];
    const userActionMenu = (
        <Menu className="mt-6 w-[16rem]" items={items} >
        </Menu>
    );
    return (
        <header className='sm:h-[104px] px-6 py-6 bg-[#fff]'>
            <div className="h-[100%] flex justify-between items-center lg:mx-20 sm:mx-10 lg:max-w-full">
                {/* Logo */}
                <Link to="/">
                    <img
                        className="lg:mx-auto"
                        src={image}
                        alt="logo"
                        width={isSmDevice ? 78 : 112}
                        height={isSmDevice ? 36 : 48}
                    />
                </Link>
                {/* thanh tìm kiếm */}
                <div className="hidden sm:block sm:max-w-[55%] text-right w-full">
                    <div className=" relative">
                        <AutoComplete
                            className="absolute w-full left-0"
                            dropdownMatchSelectWidth={500}
                            options={options}
                        >
                            <Input
                                size={isSmDevice ? 'middle' : 'large'}
                                placeholder={!isMobile ? 'Nhập từ khoá cần tìm' : 'Tìm kiếm'}
                            />
                        </AutoComplete>
                        <Button type="primary" className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:shadow-lg " size={isSmDevice ? 'middle' : 'large'}>
                            <Link to={linkSearch === '' ? locations : initLink + linkSearch} className="flex items-center justify-center">
                                <SearchOutlined /> {!isSmDevice ? 'Tìm kiếm' : ''}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* thanh công cụ navbar */}
                {isMdDevice ? (
                    <>
                        <MenuOutlined
                            className="text-xl text-[#999] transition duration-150"
                            onClick={() => setDrawerVisible(true)}
                        />
                        <Drawer
                            title="Menu"
                            placement="right"
                            closable={true}
                            headerStyle={{ display: "flex" }}
                            closeIcon={<MdOutlineClose />}
                            onClose={() => setDrawerVisible(false)}
                            maskClosable={true}
                            open={drawerVisible}>
                            <ul className="m-0">
                                <li className="mb-4">
                                    <Link
                                        to={
                                            isAuth
                                                ? `${constants.ROUTES.ACCOUNT}/`
                                                : constants.ROUTES.LOGIN
                                        }>
                                        {!isAuth ? (
                                            <div className="flex items-center">
                                                <UserOutlined className="text-2xl" />
                                                <span className="font-medium color-[#999]">Đăng nhập</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <Avatar src={avtDefault} className="mr-3" />
                                                <span className="font-medium color-[#999]">
                                                    {user.fullName}
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="flex items-center"
                                        to={constants.ROUTES.ACCOUNT + '/orders'}>
                                        <ReconciliationOutlined className="text-2xl" />
                                        <span className="font-medium color-[#999]">Đơn hàng</span>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="flex items-center "
                                        to={constants.ROUTES.CART}>
                                        <ShoppingCartOutlined className="text-2xl" />
                                        <Badge
                                            className="pos-absolute"
                                            size="default"
                                            style={{ color: '#fff' }}
                                            count={totalItemCarts(carts)}
                                            overflowCount={9}
                                            offset={[0, -10]}
                                        />

                                        <span className="font-medium color-[#999]">Giỏ hàng</span>
                                    </Link>
                                </li>
                                {isAuth &&
                                    <li className="mb-4">
                                        <Button
                                            onClick={onLogout}
                                            size="large"
                                            className="w-full"
                                            type="primary"
                                            danger={isAuth}>
                                            Đăng xuất
                                        </Button>
                                    </li>
                                }

                            </ul>
                        </Drawer>

                    </>
                ) : (
                    <ul className="flex m-0">
                        <li>
                            <Link
                                className="flex flex-col pl-0"
                                to={constants.ROUTES.ACCOUNT + '/orders'}>
                                <ReconciliationOutlined className="text-2xl" />
                                <span className="font-medium color-[#999]">Đơn hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Dropdown overlay={userActionMenu} placement="bottomRight">
                                <Link
                                    to={
                                        isAuth
                                            ? `${constants.ROUTES.ACCOUNT}/`
                                            : constants.ROUTES.LOGIN
                                    }>
                                    {!isAuth ? (
                                        <div className="flex flex-col pl-8">
                                            <UserOutlined className="text-2xl" />
                                            <span className="font-medium color-[#999]">Đăng nhập</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col pl-8">
                                            <Avatar src={avtDefault} className="m-auto" />
                                            <span className="font-medium color-[#999]">
                                                {user.fullName}
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown
                                overlay={<CartView list={carts} />}
                                placement="bottomRight"
                                arrow>
                                <Link
                                    className="flex flex-col pl-8"
                                    to={constants.ROUTES.CART}>
                                    <ShoppingCartOutlined className="text-2xl" />
                                    <Badge
                                        className="absolute"
                                        size="default"
                                        style={{ color: '#fff' }}
                                        count={totalItemCarts(carts)}
                                        overflowCount={9}
                                        offset={[36, -5]}
                                    />

                                    <span className="font-medium color-[#999]">Giỏ hàng</span>
                                </Link>
                            </Dropdown>
                        </li>
                    </ul>
                )}
               
            </div>
             {/* thanh tìm kiếm */}
             <div className="sm:hidden sm:max-w-[55%] mt-4 text-right w-full">
                    <div className=" relative">
                        <AutoComplete
                            className="absolute w-full left-0"
                            dropdownMatchSelectWidth={500}
                            options={options}
                        >
                            <Input
                                size={isSmDevice ? 'middle' : 'large'}
                                placeholder={!isMobile ? 'Nhập từ khoá cần tìm' : 'Tìm kiếm'}
                            />
                        </AutoComplete>
                        <Button type="primary" className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:shadow-lg " size={isSmDevice ? 'middle' : 'large'}>
                            <Link to={linkSearch === '' ? locations : initLink + linkSearch} className="flex items-center justify-center">
                                <SearchOutlined /> {!isSmDevice ? 'Tìm kiếm' : ''}
                            </Link>
                        </Button>
                    </div>
                </div>
        </header>
    );
}

export default Header;