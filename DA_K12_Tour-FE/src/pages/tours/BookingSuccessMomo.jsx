import React from 'react';
import { useLocation } from 'react-router-dom';
import { Result, Button, Divider, Descriptions, Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined, TransactionOutlined } from '@ant-design/icons';

const { Title } = Typography;

const BookingSuccessMomo = () => {
    const location = useLocation();

    // Lấy thông tin từ query string trong URL
    const params = new URLSearchParams(location.search);
    const partnerCode = params.get('partnerCode');
    const accessKey = params.get('accessKey');
    const requestId = params.get('requestId');
    const amount = params.get('amount');
    const orderId = params.get('orderId');
    const orderInfo = decodeURIComponent(params.get('orderInfo'));
    const orderType = params.get('orderType');
    const transId = params.get('transId');
    const message = decodeURIComponent(params.get('message'));
    const localMessage = decodeURIComponent(params.get('localMessage'));
    const responseTime = params.get('responseTime');
    const errorCode = params.get('errorCode');
    const signature = params.get('signature');

    // Kiểm tra status thanh toán
    const isPaymentSuccess = errorCode === '0';  // ErrorCode 0 là thanh toán thành công

    const formatCurrency = (amount) => {
        return `${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
    };

    return (
        <div style={{ padding: "50px" }}>
            <Row gutter={24} justify="center">
                <Col xs={24} sm={18} md={12}>
                    <Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        {isPaymentSuccess ? (
                            <Result
                                status="success"
                                title="Thanh toán thành công!"
                                subTitle={`Mã đơn hàng: ${orderId}`}
                                icon={<CheckCircleOutlined style={{ fontSize: '40px', color: '#52c41a' }} />}
                                extra={[
                                    <Button type="primary" key="dashboard">
                                        <Link to="/dashboard">Về trang chủ</Link>
                                    </Button>,
                                ]}
                            />
                        ) : (
                            <Result
                                status="error"
                                title="Thanh toán thất bại"
                                subTitle={message || "Đã xảy ra lỗi khi thanh toán. Vui lòng kiểm tra lại thông tin và thử lại."}
                                icon={<CloseCircleOutlined style={{ fontSize: '40px', color: '#f5222d' }} />}
                                extra={[
                                    <Button type="primary" key="retry">
                                        <Link to="/">Thử lại</Link>
                                    </Button>,
                                    <Button key="contactSupport">
                                        <Link to="https://www.facebook.com/profile.php?id=61550893813788">Liên hệ hỗ trợ</Link>
                                    </Button>,
                                ]}
                            />
                        )}

                        <Divider orientation="left">Chi tiết giao dịch</Divider>
                        <Descriptions bordered column={1} size="small">
                            <Descriptions.Item label="Mã đơn hàng">{orderId}</Descriptions.Item>
                            <Descriptions.Item label="Mã giao dịch MoMo">{transId}</Descriptions.Item>
                            <Descriptions.Item label="Số tiền">{amount ? `${formatCurrency(amount)}` : 'Không có dữ liệu'}</Descriptions.Item>
                            <Descriptions.Item label="Thông tin đơn hàng">{orderInfo}</Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt">{responseTime}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BookingSuccessMomo;
