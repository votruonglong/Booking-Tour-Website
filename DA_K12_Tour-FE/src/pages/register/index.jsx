import React from 'react'
import { useDispatch } from "react-redux";
import { Form, Input, Button, message, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../../assets/hat.svg";
import "./index.css";
import { login, register } from '../../redux/features/auth/authSlice';

const { Title } = Typography;

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(values);

        try {
            await dispatch(register(values)).unwrap();
            message.success("Đăng ký thành công");
            navigate("/login");
        } catch (error) { }
    };
    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="login-logo-container">
                    <img src={logo2} alt="Logo" className="login-logo" />
                    <Title level={3} className="login-title">
                        Đăng nhập
                    </Title>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                        ]}

                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Tên đăng nhập"
                            size="large"
                            maxLength={20}
                        />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        rules={[
                            { required: true, message: "Vui lòng nhập họ tên!" },
                        ]}

                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Họ và tên"
                            size="large"
                            maxLength={20}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            {
                                type: 'email',
                                message: 'Nhập đúng định dạng email!',
                            },
                        ]}

                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            size="large"
                            maxLength={20}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phonenumber"
                        rules={[
                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                        ]}

                    >
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Số điện thoại"
                            size="large"
                            maxLength={20}
                        />
                    </Form.Item>
                    <Form.Item
                        name="passWord"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                            size="large"
                            minLength={6}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                    <div className="login-links">
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default Register