import React, { useState, useEffect } from 'react';
import { List, Button, Typography, Row, Col, Card, message, Spin, Modal, Descriptions } from 'antd';
import SearchComponent from '../../components/search-component';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, fetchBooking, getBookingByPhoneNumber } from '../../redux/features/system/bookingSlice';
import emailjs from 'emailjs-com'; // Import EmailJS
const { Title, Text } = Typography;


const CancelBooking = () => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [cancelingBookingId, setCancelingBookingId] = useState(null);
    const [searchParams, setSearchParams] = useState(
        {
            phoneNumberSearch: "",
            searchName: "",
            searchCode: ""
        }
    )

    const { selectedBooking, cancellationMessage } = useSelector((state) => state.bookings)
    const { user } = useSelector((state) => state.auth)

    const fetchBookingTour = async () => {
        setLoading(true)
        try {
            await dispatch(getBookingByPhoneNumber(user.phoneNumber)).unwrap()
        } catch (error) {
            message.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookingTour()

    }, [dispatch, user])

    const handleCancelBooking = (id) => {
        setCancelingBookingId(id);

        const cancelingBooking = selectedBooking?.filter(booking => booking.id === id);

        const cancellationConditions = (
            <Descriptions bordered column={1}>
                <Descriptions.Item label="14-19 ngày trước khởi hành">50% phí hủy</Descriptions.Item>
                <Descriptions.Item label="10-13 ngày trước khởi hành">70% phí hủy</Descriptions.Item>
                <Descriptions.Item label="2-9 ngày trước khởi hành">90% phí hủy</Descriptions.Item>
                <Descriptions.Item label="1 ngày trước khởi hành">100% phí hủy</Descriptions.Item>
            </Descriptions>
        );

        Modal.confirm({
            title: 'Xác nhận hủy đơn',
            content: (
                <div>
                    <p>Chú ý: Việc hủy tour sẽ chịu các khoản phí hủy như sau:</p>
                    {cancellationConditions}
                    <p>Bạn có chắc chắn muốn hủy tour này không?</p>
                </div>
            ),
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            centered: true,
            onOk: async () => {
                try {
                    await dispatch(cancelBooking(id)).unwrap();
                    message.success("Đã hủy tour thành công!");
                    await fetchBookingTour();
                    if (cancellationMessage) {
                        sendConfirmationEmail(cancelingBooking);
                    } else {
                        console.error('Cancellation message is undefined or empty');
                    }
                    Modal.destroyAll();
                } catch (error) {
                    message.error(error);
                } finally {
                }
            },
            onCancel() {
                setCancelingBookingId(null);
            },
        });
    };


    const sendConfirmationEmail = (cancelingBooking) => {

        const emailData = {
            to_email: cancelingBooking[0]?.email, // Email của người đặt tour
            name: cancelingBooking[0]?.name,
            tourName: cancelingBooking[0]?.tourName,
            numberOfAdult: cancelingBooking[0]?.numberOfAdult,
            numberOfChild: cancelingBooking[0]?.numberOfChild,
            totalAmount: cancelingBooking[0]?.totalAmount,
            departureDate: cancelingBooking[0]?.departureDate,
        };

        emailjs.send(
            'service_u7ux9p9', // Thay bằng service ID của bạn từ EmailJS
            'template_1b971nw', // Thay bằng template ID của bạn từ EmailJS
            emailData,
            '7jp95pZmHeTaKlu-o' // Thay bằng user ID của bạn từ EmailJS
        )
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    const filteredBookings = selectedBooking?.filter(booking => booking.status == 1);
    const formatCurrency = (amount) => {
        return `${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
    };
    return (
        <div>

            <Spin spinning={loading}>
                {filteredBookings?.length > 0 ? (
                    <List
                        itemLayout="vertical"
                        dataSource={filteredBookings}
                        renderItem={(booking) => (
                            <Card
                                style={{
                                    marginBottom: '1rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    padding: '16px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <List.Item
                                    key={booking.bookingId}
                                    actions={[
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={() => handleCancelBooking(booking.id)}
                                            loading={cancelingBookingId === booking.id}
                                            style={{ width: '100%' }}
                                        >
                                            Hủy Tour
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={
                                            <Text strong style={{ fontSize: '18px', color: '#1d1d1b' }}>
                                                {booking.tourName}
                                            </Text>
                                        }
                                        description={
                                            <>
                                                <Row gutter={16} style={{ marginBottom: '8px' }}>
                                                    <Col span={12}>
                                                        <Text strong>Tên người đặt: </Text>
                                                        <Text>{booking.name}</Text>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Text strong>Ngày khởi hành: </Text>
                                                        <Text>{booking.departureDate}</Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={16} style={{ marginBottom: '8px' }}>
                                                    <Col span={12}>
                                                        <Text strong>Số người lớn: </Text>
                                                        <Text>{booking.numberOfAdult}</Text>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Text strong>Số trẻ em: </Text>
                                                        <Text>{booking.numberOfChild}</Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={16} style={{ marginBottom: '8px' }}>
                                                    <Col span={12}>
                                                        <Text strong>Tổng tiền: </Text>
                                                        <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                                            {formatCurrency(booking.totalAmount)}
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                    />
                                </List.Item>
                            </Card>
                        )}
                    />

                ) : (
                    <Card style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', height: '600px' }}>
                        <Text type="secondary" style={{ fontSize: '18px' }}>
                            Nhánh chóng đi đặt tour đi
                        </Text>
                    </Card>
                )}
            </Spin>
        </div>

    )
}

export default CancelBooking