import React from 'react';
import { Card, Row, Form, Col, Button, Descriptions, Carousel, Collapse, Typography, Spin, message, Image } from 'antd';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PriceTour from '../../components/tours/components/PriceTour';
import { useDispatch, useSelector } from "react-redux";
import { fetchTourById } from '../../redux/features/system/tourSlice';
import CommentComponent from '../../components/comment-component';
import { getScheduleByTour } from '../../redux/features/system/scheduleSlice';
import { getCommentByTourId } from '../../redux/features/system/commentSlice';


const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;


const TourDetail = () => {

    const dispatch = useDispatch();

    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    const [currentImage, setCurrentImage] = useState(0);
    const { selectedTour } = useSelector((state) => state.tours);
    const { schedules } = useSelector((state) => state.schedules);
    const { comments } = useSelector((state) => state.comments)
    const { user } = useSelector((state) => state.auth)



    const getTourDetail = async () => {
        setLoading(true);
        try {
            const result = await dispatch(fetchTourById(id)).unwrap();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const getSchedule = async () => {
        setLoading(true);
        try {
            const result = await dispatch(getScheduleByTour(id)).unwrap();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const fetchCommentByTourId = async () => {
        setLoading(true);
        try {
            await dispatch(getCommentByTourId(id)).unwrap();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getTourDetail();
        getSchedule();
    }, [id, dispatch]);

    useEffect(() => {
        fetchCommentByTourId();
    }, [dispatch]);




    const scheduleData = schedules.map((item, index) => ({
        key: item.id,
        id: item.id,
        scheduleId: item.scheduleId,
        tourId: item.tourId,
        tourName: item.tourName,
        description: item.description,
        title: item.title,
        stt: index + 1,
    }));


    return (
        <Spin spinning={loading}>
            <div style={{ padding: '20px' }}>
                <Row gutter={16}>
                    {/* Hình ảnh tour */}
                    <Col xs={24} md={12}>
                        <Carousel
                            autoplay
                            dots
                            afterChange={setCurrentImage}
                        >
                            {selectedTour?.images?.map((image, index) => (
                                <div key={index}>
                                    <img
                                        alt={selectedTour.tourName}
                                        src={image}
                                        style={{ width: '100%', borderRadius: '12px', height: '400px', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <Row gutter={8} style={{ marginTop: '10px' }}>
                            {selectedTour?.images?.map((image, index) => (
                                <Col span={8} key={index}>
                                    <Image
                                        alt={`Thumbnail ${index + 1}`}
                                        src={image}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            border: currentImage === index ? '2px solid #1890ff' : 'none'
                                        }}
                                        onClick={() => setCurrentImage(index)} // Thay đổi hình ảnh hiện tại khi click
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Thông tin chi tiết về tour */}
                    <Col xs={24} md={12}>
                        <Card>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <Text strong style={{ fontSize: '30px', color: '#c31432' }}>{selectedTour?.tourName}</Text>
                                    <Descriptions bordered layout="vertical">
                                        <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Mã tour">{selectedTour?.tourId}</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Tham gia tối đa">{selectedTour?.maxParticipant}</Descriptions.Item>
                                    </Descriptions>
                                    <PriceTour childPrice={selectedTour?.childPrice} adultPrice={selectedTour?.adultPrice} loading={loading} />
                                    <Button type="primary" size="large" style={{ marginTop: '20px', alignItems: "end" }}>
                                        <Link to={`/booking/${selectedTour?.id}`}>Đặt chỗ</Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                    </Col>

                </Row>
                {/* Hiển thị lịch trình tour */}
                <div style={{ marginTop: '30px' }}>
                    <Collapse defaultActiveKey={['1']}>
                        {scheduleData.map((dayPlan, index) => (
                            <Panel header={`LỊCH TRÌNH ${index + 1}`} key={index + 1}>
                                {/* Render description directly with proper HTML formatting */}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dayPlan.description
                                            .replace(/\n\n/g, '<p>')
                                            .replace(/\n/g, '<br />'),
                                    }}
                                />
                            </Panel>
                        ))}
                    </Collapse>
                </div>
                <CommentComponent comments={comments} userId={user?.id} tourId={id} fetchCommentByTourId={fetchCommentByTourId} />
            </div>
        </Spin>

    );
};



export default TourDetail;
