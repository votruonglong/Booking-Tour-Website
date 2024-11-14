import React from 'react';
import { Col, Card, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { TagOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SingleTour = ({ tour }) => {
    const truncateDescription = (description, maxLength = 100) => {
        if (!description) return '';
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    const imageUrl = tour.images && tour.images.length > 0 ? tour.images[0].image_url : '';
    const truncatedDescription = truncateDescription(tour.description, 100);

    const formatCurrency = (amount) => {
        return `${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
    };

    return (
        <Col xs={24} sm={12} md={8} lg={6} style={{ padding: '10px' }}>
            <Link to={`/tours/${tour.id}`}>
                <Card
                    style={{ height: '450px' }}
                    hoverable
                    cover={<img alt={tour.title} src={imageUrl} style={{ height: '300px' }} />}
                >
                    <Card.Meta
                        title={tour.tourName}
                        description={
                            <>
                                <Text type="secondary">{truncatedDescription}</Text>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    <TagOutlined />
                                    <Text strong style={{ fontSize: '16px', color: '#FF4D4F', textAlign: 'end' }}>
                                        {formatCurrency(tour.adultPrice)}
                                    </Text>
                                </div>
                            </>
                        }
                    />
                </Card>
            </Link>
        </Col>
    );
};

export default SingleTour;
