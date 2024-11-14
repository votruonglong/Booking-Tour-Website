import React from 'react'
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Dropdown,
    Space,
    Tag,
    Avatar,
    Button
} from 'antd'
import {
    HomeOutlined,
    TikTokOutlined,
    SunOutlined,
    DashboardOutlined,
    SearchOutlined
} from '@ant-design/icons';
import hat from "../assets/hat.svg";
import { useLocation, Link, Outlet } from 'react-router-dom';
import HomePage from '../pages/home';
import UserDropdown from '../components/user-dropdown';
import { useState } from 'react';
import CarouselPage from '../components/carousel';
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;





const CustomerLayout = () => {



    const { user } = useSelector(
        (state) => state.auth
    )


    const items = [
        {
            label: <Link to="/">Trang chủ</Link>,
            key: '1',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/mienbac">Tour Miền Bắc</Link>,
            key: '2',
            icon: <DashboardOutlined />,
        },
        {
            label: <Link to="/mientrung">Tour Miền Trung</Link>,
            key: '3',
            icon: <SunOutlined />,
        },
        {
            label: <Link to="/mientay">Tour Miền Tây</Link>,
            key: '4',
            icon: <TikTokOutlined />,
        },
        user ? { // Conditionally render this menu item
            label: <Link to="/cancel-booking">Tra cứu đơn & Hủy</Link>,
            key: '5',
            icon: <SearchOutlined />,
        } : null,
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const location = useLocation()

    const pathSnippets = location.pathname.split('/').filter(i => i);

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
        ...pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{pathSnippets[index]}</Link>
                </Breadcrumb.Item>
            );
        }),
    ];

    return (
        <Layout style={{ height: "100vh" }}>
            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                <div style={{ marginRight: '20px', display: "flex" }}>
                    <img
                        src={hat}
                        alt="Logo"
                        style={{ width: '50px', height: '50px' }}
                    />
                </div>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0, backgroundColor: '#f5f5f5' }}

                />
                {user ? <UserDropdown /> : <div>
                    <Link to="/login" style={{ color: "black", marginRight: '10px' }}>Đăng nhập</Link>
                    <Link to="/register" style={{ color: "black" }}>Đăng ký</Link>
                </div>}

            </Header>
            <Content style={{ padding: '0 48px', flex: '1', overflowY: 'auto' }}>
                <CarouselPage />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {breadcrumbItems}
                </Breadcrumb>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 'calc(100vh - 200px)',
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {location.pathname === "/" ? <HomePage /> : <Outlet />}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Đồ án tốt nghiệp ©{new Date().getFullYear()} Nhóm 4
            </Footer>
        </Layout>
    )
}

export default CustomerLayout