import React from 'react'
import { Dropdown, Space, Avatar, Tag, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'




const UserDropdown = ({ handleLogin }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };

    const items = [

        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
        },
        {
            label: (
                <Button onClick={handleLogout} style={{ width: "100%" }}>
                    Logout
                </Button >
            ),
            key: "3",
            style: { textAlign: "center" },
        },
    ]

    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={["click"]}
        >
            <a onClick={(e) => e.preventDefault()} style={{ color: "black" }}>
                <Space>
                    <Avatar size="large" src="https://i.pravatar.cc/300" />

                    <Tag color="blue">Hi {user?.fullName}</Tag>
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default UserDropdown