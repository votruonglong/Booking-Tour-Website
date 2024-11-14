// WelcomeMessage.js
import React from "react";
import { Typography, Card } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const WelcomeMessage = () => (
  <Card className="welcome-card">
    <div className="welcome-content">
      <SmileOutlined className="welcome-icon" />
      <Title level={2} className="welcome-title">
        Chào mừng đến trang quản lý <br />
        Tour du lịch
      </Title>
      <Text className="welcome-text">
        Quản lý chi nhánh, sản phẩm, giao dịch và nhiều hơn nữa.
      </Text>
    </div>
  </Card>
);

export default WelcomeMessage;
