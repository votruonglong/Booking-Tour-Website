import React, { useState, useEffect } from 'react';
import { List, Button, Typography, Row, Col, Card, message, Spin, Modal, Descriptions } from 'antd';
import SearchComponent from '../../components/search-component';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, fetchBooking, getBookingByPhoneNumber } from '../../redux/features/system/bookingSlice';

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

    const { selectedBooking } = useSelector((state) => state.bookings)
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
        Modal.confirm({
            title: 'Xác nhận hủy đơn',
            content: 'Bạn có chắc chắn muốn hủy đơn này không?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            centered: true,
            onOk: async () => {
                try {
                    await dispatch(cancelBooking(id)).unwrap();
                    message.success("Đã hủy tour thành công!");
                    await fetchBookingTour(); // Fetch lại danh sách bookings sau khi hủy
                } catch (error) {
                    console.error(error);
                    message.error("Đã xảy ra lỗi khi hủy tour.");
                } finally {
                    setCanceling(false);
                }
            },
            onCancel() {
                setCancelingBookingId(null);
            },
        });
    };


    const handleSearch = (searchValue) => {
        setSearchParams(searchValue)
    }

    const filteredBookings = selectedBooking?.filter(booking => booking.status == 1);

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
                                                            {booking.totalAmount}
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
                            Vui lòng tìm kiếm bằng số điện thoại đã đặt
                        </Text>
                    </Card>
                )}
            </Spin>
        </div>

    )
}

export default CancelBooking