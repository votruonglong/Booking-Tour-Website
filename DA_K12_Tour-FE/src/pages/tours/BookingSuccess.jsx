import { Typography, Row, Col, Card, Divider, Button, Spin } from 'antd';

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getBookingById } from '../../redux/features/system/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Title, Text } = Typography;
const BookingSuccess = () => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const { selectedBooking } = useSelector((state) => state.bookings)

    const fetchBookingById = async () => {
        setLoading(true)
        try {
            if (id) {
                await dispatch(getBookingById(id)).unwrap()
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookingById()
    }, [dispatch, id])

    console.log(selectedBooking);


    const booking = selectedBooking && selectedBooking[0];


    return (
        <Spin spinning={loading}>
            <Row justify="center" style={{ padding: '2rem' }}>
                <Col xs={24} md={16}>
                    <Card bordered style={{ textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
                        {booking ? (
                            <>
                                <Title level={2} style={{ color: '#3f6600', marginBottom: '1rem' }}>🎉 Đặt Tour Thành Công!</Title>
                                <Text style={{ fontSize: '16px', color: '#595959' }}>Cảm ơn bạn đã tin tưởng và đặt tour với chúng tôi.</Text>

                                <Divider />

                                <Row gutter={16} style={{ textAlign: 'left', fontSize: '16px', color: '#434343' }}>
                                    <Col span={24} style={{ marginBottom: '1rem' }}>
                                        <Title level={4} style={{ marginBottom: 0, color: '#006d75' }}>Thông tin đặt tour:</Title>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Mã đặt tour:</Text> <Text>{booking.bookingId}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Ngày đặt tour:</Text> <Text>{booking.bookingDate}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Tên tour:</Text> <Text>{booking.tourName}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Ngày khởi hành:</Text> <Text>{booking.departureDate}</Text>
                                    </Col>

                                    <Col span={24} style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                                        <Title level={4} style={{ marginBottom: 0, color: '#006d75' }}>Thông tin khách hàng:</Title>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Họ tên:</Text> <Text>{booking.name}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Email:</Text> <Text>{booking.email}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Số điện thoại:</Text> <Text>{booking.phoneNumber}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Người lớn:</Text> <Text>{booking.numberOfAdult}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Trẻ em:</Text> <Text>{booking.numberOfChild}</Text>
                                    </Col>
                                    <Col span={12} style={{ padding: '0.5rem' }}>
                                        <Text strong>Tổng số tiền:</Text> <Text style={{ fontSize: '18px', color: '#d4380d' }}>{booking.totalAmount}</Text>
                                    </Col>
                                </Row>

                                <Divider />

                                <Button type="primary" onClick={() => navigate('/')} block style={{ borderRadius: '5px' }}>
                                    Về trang chủ
                                </Button>
                            </>
                        ) : (
                            <Text>Đang tải thông tin đặt tour...</Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Spin>

    );
}

export default BookingSuccess