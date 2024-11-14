import React from 'react'
import { Card, Col, Pagination, Row, Typography, Button, Spin } from 'antd';
import SingleTour from '../single-tour';
import { useState } from 'react';
import SearchComponent from '../search-component';
import { PlayCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography


const Tours = ({ title, tours, pagination, search, loading, linkTo, viewAll }) => {

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const pageSize = 8; // Số lượng mục trên mỗi trang

    // Lấy các tour cho trang hiện tại
    const currentTours = tours.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Hàm thay đổi trang
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };
    return (
        <div style={{ padding: '20px' }}>
            {search && <SearchComponent
                searchFields={[
                    {
                        key: "codeDefectSearch",
                        placeholder: "Chọn ngày đi",
                        type: "date",
                    },
                    {
                        key: "codeDefectSearch",
                        placeholder: "Chọn nơi đi",
                        type: "select",
                    }
                ]}

            />}

            <Title level={2} style={{ marginTop: "20px", textAlign: "center" }}>{title}</Title>
            <Spin spinning={loading}>
                <Row gutter={16}>
                    {currentTours.map((tour) => (
                        <SingleTour tour={tour} key={tour.id} />
                    ))}
                </Row>
            </Spin>

            {pagination && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={tours.length}
                        onChange={handleChangePage}
                    />
                </div>
            )}
            {
                viewAll &&
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link to={linkTo}> {/* Add a proper link to view all tours */}
                        <Button type="primary" size="large">
                            Xem tất cả
                        </Button>
                    </Link>
                </div>
            }

        </div>
    )
}

export default Tours