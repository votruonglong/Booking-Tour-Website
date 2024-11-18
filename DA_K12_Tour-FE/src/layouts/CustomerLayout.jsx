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
    Button,
    Typography,
    Row,
    Col,
} from 'antd'
import {
    HomeOutlined,
    TikTokOutlined,
    SunOutlined,
    DashboardOutlined,
    SearchOutlined,
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
import hat from "../assets/hat.svg";
import { useLocation, Link, Outlet } from 'react-router-dom';
import HomePage from '../pages/home';
import UserDropdown from '../components/user-dropdown';
import { useState } from 'react';
import CarouselPage from '../components/carousel';
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

const { Title, Text } = Typography;

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
        user ? {
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
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', position: 'fixed', width: '100%', zIndex: 1 }}>
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
            <Content style={{ padding: '0 48px', flex: '1', overflowY: 'auto', paddingTop: '64px', paddingBottom: '64px' }}>
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
            <Footer style={{
                backgroundImage: 'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)',
                padding: '40px 20px',
                color: '#fff',
                fontSize: '14px',
                borderTop: '1px solid #333',
                paddingLeft: '90px'
            }}>
                <Row gutter={[32, 32]} justify="space-around">
                    {/* Column 1: About Us */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={3} style={{ color: '#fff', fontWeight: 'bold' }}>Giới thiệu</Title>
                        <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                            Chúng tôi cung cấp những tour du lịch độc đáo, mang đến trải nghiệm khó quên.
                            Khám phá các điểm đến nổi bật trong và ngoài nước với dịch vụ chuyên nghiệp.
                        </Text>
                    </Col>

                    {/* Column 2: Useful Links */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={3} style={{ color: '#fff', fontWeight: 'bold' }}>Liên kết hữu ích</Title>
                        <Menu mode="vertical" theme="light" style={{ border: 'none' }}>
                            <Menu.Item key="1">
                                <Link to="/">Trang chủ</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/mienbac">Tour Miền Bắc</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/mientrung">Tour Miền Trung</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/mientay">Tour Miền Tây</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>

                    {/* Column 3: Contact & Social */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={3} style={{ color: '#fff', fontWeight: 'bold' }}>Liên hệ</Title>
                        <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                            Email: <a href="mailto:support@tours.com" style={{ color: '#f0f0f0' }}>votruonglong.work@gmail.com</a><br />
                            Điện thoại: +84 389496543
                        </Text>
                        <Title level={4} style={{ marginTop: '20px', color: '#fff' }}>Theo dõi chúng tôi</Title>
                        <Space size="large">
                            <a href="https://www.facebook.com/profile.php?id=61550893813788" target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ fontSize: '28px', color: '#3b5998', transition: 'color 0.3s ease' }} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61550893813788" target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ fontSize: '28px', color: '#e4405f', transition: 'color 0.3s ease' }} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61550893813788" target="_blank" rel="noopener noreferrer">
                                <TwitterOutlined style={{ fontSize: '28px', color: '#1da1f2', transition: 'color 0.3s ease' }} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61550893813788" target="_blank" rel="noopener noreferrer">
                                <LinkedinOutlined style={{ fontSize: '28px', color: '#0077b5', transition: 'color 0.3s ease' }} />
                            </a>
                        </Space>
                    </Col>
                </Row>

                {/* Footer Bottom */}
                <div style={{
                    marginTop: '40px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#f0f0f0'
                }}>
                    <Text type="secondary">
                        © {new Date().getFullYear()} Đồ án tốt nghiệp Nhóm 4. All rights reserved.
                    </Text>
                </div>
            </Footer>



        </Layout>
    )
}

export default CustomerLayout
