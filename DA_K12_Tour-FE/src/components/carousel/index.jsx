import React from 'react'
import { Carousel } from 'antd';

import carousel1 from '../../assets/imgs/carousel-1.jpg'
import carousel2 from '../../assets/imgs/carousel-2.jpg'
import carousel3 from '../../assets/imgs/carousel-3.jpg'
import carousel4 from '../../assets/imgs/carousel-4.jpg'

const contentStyle = {
    height: '650px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '12px',
};

const textOverlayStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    fontSize: '20px',
    zIndex: 2,
};

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '500px',
    overflow: 'hidden',
};

const CarouselPage = () => {
    return (
        <Carousel autoplay style={{ marginTop: "20px" }}>
            <div style={containerStyle}>
                <div style={{ position: 'relative' }}>
                    <img src={carousel1} alt="Slide 1" style={contentStyle} />
                    <div style={textOverlayStyle}>
                        CHÀO MỪNG BẠN ĐẾN VỚI DỊCH VỤ ĐẶT TOUR CỦA CHÚNG TÔI
                    </div>
                </div>
            </div>
            <div style={containerStyle}>
                <div style={{ position: 'relative' }}>
                    <img src={carousel2} alt="Slide 2" style={contentStyle} />
                    <div style={textOverlayStyle}>KHÁM PHÁ VẺ ĐẸP MIỀN BẮC</div>
                </div>
            </div>
            <div style={containerStyle}>
                <div style={{ position: 'relative' }}>
                    <img src={carousel3} alt="Slide 3" style={contentStyle} />
                    <div style={textOverlayStyle}>TRẢI NGHIỆM MIỀN TRUNG</div>
                </div>
            </div>
            <div style={containerStyle}>
                <div style={{ position: 'relative' }}>
                    <img src={carousel4} alt="Slide 4" style={contentStyle} />
                    <div style={textOverlayStyle}>KHÁM PHÁ VĂN HÓA MIỀN TÂY</div>
                </div>
            </div>
        </Carousel>
    )
}

export default CarouselPage