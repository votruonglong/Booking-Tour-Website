import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Row, Col, message, Typography, Select, Divider } from 'antd';
import { fetchTourById } from '../../redux/features/system/tourSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PriceTour from '../../components/tours/components/PriceTour';
import { fetchPaymentMethods } from '../../redux/features/system/paymentMethodSlice';
import { createBooking } from '../../redux/features/system/bookingSlice';
import emailjs from 'emailjs-com'; // Import EmailJS
import { createMomoPayment } from '../../redux/features/system/paymentSlice';
import { v4 as uuidv4 } from 'uuid';

const { Title, Text } = Typography;

const BookingTour = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const { selectedTour } = useSelector((state) => state.tours);
    const { paymentMethods } = useSelector((state) => state.paymentMethods);
    const { bookings } = useSelector((state) => state.bookings);

    const BANK_TRANSFER_GUID = "6f716a87-3de5-4877-7350-08dcfe43e0f3";

    const getTourDetail = async () => {
        setLoading(true);
        try {
            await dispatch(fetchTourById(id)).unwrap();
        } catch (error) {
            message.error(error.message || "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    const getPaymentMethod = async () => {
        setLoading(true);
        try {
            await dispatch(fetchPaymentMethods({ searchName: "", searchCode: "" })).unwrap();
        } catch (error) {
            message.error(error.message || "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTourDetail();
        getPaymentMethod();
    }, [id, dispatch]);

    function formatAmount(amountString) {
        return amountString.replace(/\./g, "").replace("đ", "").trim();
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (values.departureDate) {
                values.departureDate = values.departureDate.format("YYYY-MM-DD");
            }
            if (values.totalAmount) {
                values.totalAmount = formatAmount(values.totalAmount);
            }



            if (selectedPaymentMethod === BANK_TRANSFER_GUID) {
                // Xử lý thanh toán qua MoMo
                const momoResponse = await dispatch(createMomoPayment({
                    orderId: `${Date.now()}-${uuidv4()}`,
                    amount: values.totalAmount,
                    orderInfo: `Đặt tour: ${selectedTour?.tourName}`,
                    fullName: values.name,
                    email: values.email,
                    phoneNumber: values.phoneNumber
                })).unwrap();

                if (momoResponse && momoResponse.payUrl) {
                    window.location.href = momoResponse.payUrl; // Điều hướng đến trang thanh toán MoMo
                    return;
                } else {
                    message.error("Thanh toán MoMo không thành công.");
                }
            } else {
                // Xử lý thanh toán thông thường
                const result = await dispatch(createBooking(values)).unwrap();
                sendConfirmationEmail(values)
                message.success("Đặt tour thành công");
                navigate(`/booking/booking-success/${result.id}`);
            }
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    const sendConfirmationEmail = (values) => {
        const emailData = {
            to_email: values.email, // Email của người đặt tour
            name: values.name,
            tourName: selectedTour?.tourName,
            numberOfAdult: values.numberOfAdult,
            numberOfChild: values.numberOfChild,
            totalAmount: values.totalAmount,
            departureDate: values.departureDate,
        };

        emailjs.send(
            'service_u7ux9p9', // Thay bằng service ID của bạn từ EmailJS
            'template_1hxvnpd', // Thay bằng template ID của bạn từ EmailJS
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

    const formatCurrency = (amount) => {
        return `${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
    };

    const calculateTotalAmount = (values) => {
        const { numberOfAdult = 1, numberOfChild = 0 } = values;
        const adultPrice = selectedTour?.adultPrice || 0;
        const childPrice = selectedTour?.childPrice || 0;
        const totalAmount = (numberOfAdult * adultPrice) + (numberOfChild * childPrice);
        form.setFieldsValue({ totalAmount: formatCurrency(totalAmount) }); // Update the form field
    };

    useEffect(() => {
        form.setFieldsValue({
            adults: 1,
            children: 0,
            totalAmount: formatCurrency(selectedTour?.price) || formatCurrency(0),
            tourName: selectedTour?.tourName,
            tourId: selectedTour?.id,
        });
    }, [selectedTour]);

    const onValuesChange = (changedValues, allValues) => {
        calculateTotalAmount(allValues);
    };

    const onPaymentMethodChange = (value) => {
        setSelectedPaymentMethod(value);
    };

    return (
        <Row gutter={16} style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <Col xs={24} md={16}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleOk}
                    onValuesChange={onValuesChange}
                    style={{ maxWidth: 600, margin: '0 auto' }}
                >
                    <Title level={2}>{selectedTour?.tourName}</Title>
                    <Form.Item
                        name="tourId"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tourName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
                        <Input placeholder="Nhập tên của bạn" style={{ width: '100%', height: '50px' }} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn' }, { type: 'email', message: 'Email không hợp lệ' }]}>
                        <Input placeholder="Nhập email của bạn" style={{ width: '100%', height: '50px' }} />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                        <Input placeholder="Nhập số điện thoại" style={{ width: '100%', height: '50px' }} />
                    </Form.Item>

                    <Form.Item
                        name="numberOfAdult"
                        rules={[{ required: true, message: 'Vui lòng nhập số người lớn' }]}>
                        <InputNumber min={1} placeholder="Số người lớn" style={{ width: '100%', height: '50px' }} />
                    </Form.Item>

                    <Form.Item
                        name="numberOfChild"
                        rules={[{ required: true, message: 'Vui lòng nhập số trẻ em' }]}>
                        <InputNumber min={0} placeholder="Số trẻ em" style={{ width: '100%', height: '50px' }} />
                    </Form.Item>

                    <Form.Item
                        name="departureDate"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày khởi hành' }]}>
                        <DatePicker
                            style={{ width: '100%', height: '50px' }}
                            placeholder="Chọn ngày đi"
                            showTime={false}
                            format="YYYY-MM-DD"
                            disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)} // Không cho phép chọn ngày trước ngày hiện tại
                        />
                    </Form.Item>

                    <Form.Item name="description">
                        <Input.TextArea rows={4} placeholder="Nhập ghi chú (tùy chọn)" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="paymentMethodId">
                        <Select
                            placeholder="Chọn phương thức thanh toán"
                            onChange={onPaymentMethodChange}
                            allowClear
                            showSearch>
                            {paymentMethods?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.methodName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="totalAmount"
                        label="Tổng số tiền"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng số tiền' }]}>
                        <Input disabled style={{ width: '100%' }} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Đặt Tour
                    </Button>
                </Form>
            </Col>

            <Col xs={24} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PriceTour childPrice={selectedTour?.childPrice} adultPrice={selectedTour?.adultPrice} loading={loading} />
            </Col>
        </Row>
    );
};

export default BookingTour;
