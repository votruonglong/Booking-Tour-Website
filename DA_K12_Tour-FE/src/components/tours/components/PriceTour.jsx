import React, { useState, useEffect } from 'react';
import { InputNumber, Spin, Typography } from 'antd';
import { Table } from 'antd';

const { Title } = Typography;

const PriceTour = ({ childPrice, adultPrice, loading }) => {
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            customerType: 'Giá Người Lớn',
            quantity: 1,
            unitPrice: adultPrice || 0,
            totalPrice: adultPrice || 0,
        },
        {
            key: '2',
            customerType: 'Giá Trẻ Em',
            quantity: 1,
            unitPrice: childPrice || 0,
            totalPrice: childPrice || 0,
        },
    ]);

    useEffect(() => {
        // Update adult and child prices in the dataSource when props change
        const updatedDataSource = dataSource.map(item => {
            if (item.key === '1') { // Adult price
                const totalPrice = item.quantity * (adultPrice || 0);
                return {
                    ...item,
                    unitPrice: adultPrice || 0,
                    totalPrice,
                };
            }
            if (item.key === '2') { // Child price
                const totalPrice = item.quantity * (childPrice || 0);
                return {
                    ...item,
                    unitPrice: childPrice || 0,
                    totalPrice,
                };
            }
            return item;
        });
        setDataSource(updatedDataSource);
    }, [adultPrice, childPrice]);

    const formatCurrency = (amount) => {
        return `${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
    };

    const columns = [
        {
            title: 'Loại khách',
            dataIndex: 'customerType',
            key: 'customerType',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => handleQuantityChange(record.key, value)}
                />
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (text) => `${formatCurrency(text)}`,
        },
        {
            title: 'Tổng giá',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => `${formatCurrency(text)}`,
        },
    ];

    const handleQuantityChange = (key, value) => {
        const updatedDataSource = dataSource.map(item => {
            if (item.key === key) {
                const newTotalPrice = value * item.unitPrice;
                return {
                    ...item,
                    quantity: value,
                    totalPrice: newTotalPrice,
                };
            }
            return item;
        });
        setDataSource(updatedDataSource);
    };

    return (
        <div style={{ marginTop: '20px', width: "600px" }}>
            <Title level={3}>Thông tin giá tour</Title>
            <Spin spinning={loading}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered
                />
            </Spin>
        </div>
    );
}

export default PriceTour;
