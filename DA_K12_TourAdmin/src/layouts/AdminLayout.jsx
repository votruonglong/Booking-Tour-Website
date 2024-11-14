import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChartOutlined,
  BarChartOutlined,
  BranchesOutlined,
  CloseCircleOutlined,
  ContainerOutlined,
  ControlOutlined,
  DatabaseOutlined,
  DownOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  WarningOutlined,
  ShoppingCartOutlined,
  SafetyOutlined,
  ScheduleOutlined,
  UserOutlined,
  PayCircleOutlined,
  CarOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
  Tag,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpg";
import WelcomeMessage from "./WelcomeLayout";
import { setActiveKey, toggleSidebar } from "@redux/features/sidebarMenuSlice";
import { logout } from "@redux/features/authReducer/authSlice";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const { collapsed, activeKey } = useSelector((state) => state.sidebar);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(setActiveKey(location.pathname));
  }, [location.pathname, dispatch]);

  const handleMenuClick = ({ key }) => {
    dispatch(setActiveKey(key));
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const items = [
    {
      label: (
        <Button onClick={handleLogout} style={{ width: "100%" }}>
          Logout
        </Button>
      ),
      key: "0",
      style: { textAlign: "center" },
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ overflow: "auto", height: "100vh" }}
        theme="light"
        width={270}
      >
        <div style={{ textAlign: "center", padding: "16px" }}>
          <img
            src={collapsed ? logo : logo}
            alt="logo"
            className="primary-logo"
            style={{ maxWidth: collapsed ? "32px" : "50px", height: "auto", borderRadius: "50%" }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          defaultOpenKeys={collapsed ? [] : ["1", "2", "3", "4"]}
          triggerSubMenuAction="hover"
          items={[
            {
              key: "1",
              icon: <LineChartOutlined />,
              label: "Dashboard",
              children: [
                {
                  key: "/dashboard/all",
                  icon: <BarChartOutlined />,
                  label: "Dashboard Tổng",
                },
                // {
                //   key: "/dashboard/module",
                //   icon: <AreaChartOutlined />,
                //   label: "Dashboard Chuyền",
                // },
                // {
                //   key: "/dashboard/error",
                //   icon: <CloseCircleOutlined />,
                //   label: "Dashboard Lỗi",
                // },
                // {
                //   key: "/dashboard/tv",
                //   icon: <AreaChartOutlined />,
                //   label: "Dashboard TV",
                // },
              ],
            },
            {
              key: "2",
              icon: <ControlOutlined />,
              label: "Quản lý hệ thống",
              children: [
                {
                  key: "/manage/category",
                  icon: <MenuOutlined />,
                  label: "Quản lý danh mục",
                },
                {
                  key: "/manage/tour",
                  icon: <CarOutlined />,
                  label: "Quản lý tour",
                },
                {
                  key: "/manage/booking",
                  icon: <ShoppingCartOutlined />,
                  label: "Quản lý đơn đặt tour",
                },
                {
                  key: "/manage/lichtrinh",
                  icon: <ScheduleOutlined />,
                  label: "Quản lý lịch trình",
                },
                {
                  key: "/manage/paymentmethod",
                  icon: <PayCircleOutlined />,
                  label: "Phương thức thanh toán",
                },
                // {
                //   key: "/manage/error-code",
                //   icon: <WarningOutlined />,
                //   label: "Quản lý mã lỗi",
                // },
                // {
                //   key: "/manage/orders",
                //   icon: <ShoppingCartOutlined />,
                //   label: "Quản lý đặt hàng",
                // },
                // {
                //   key: "/manage/qa-qc",
                //   icon: <SafetyOutlined />,
                //   label: "Quản lý thông tin QA/QC",
                // },
                // {
                //   key: "/manage/task",
                //   icon: <ScheduleOutlined />,
                //   label: "Quản lý công việc",
                // },
                // {
                //   key: "/manage/module",
                //   icon: <BranchesOutlined />,
                //   label: "Quản lý chuyền",
                // },
              ],
            },

            // {
            //   key: "3",
            //   icon: <DatabaseOutlined />,
            //   label: "Quản lý kho",
            //   children: [
            //     {
            //       key: "/warehouse/map",
            //       icon: <HeatMapOutlined />,
            //       label: "Sơ đồ kho",
            //     },
            //     {
            //       key: "/warehouse/stock",
            //       icon: <ContainerOutlined />,
            //       label: "Quản lý kho",
            //     },
            //   ],
            // },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Quản trị",
              children: [
                {
                  key: "/users",
                  icon: <UserOutlined />,
                  label: "Quản lý người dùng",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleSidebar())}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()} style={{ color: "black" }}>
              <Space>
                <Avatar size="large" src="https://i.pravatar.cc/300" />
                Hi {user?.fullName}
                <Tag color="blue">{role}</Tag>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <Outlet />
          {location.pathname === "/" && <WelcomeMessage />} */}
          {location.pathname === "/" ? <WelcomeMessage /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
