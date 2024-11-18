import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Spin, Divider } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts";
import { UserOutlined, BookOutlined, DollarCircleOutlined } from '@ant-design/icons'; // Thêm icon
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "@redux/features/dashboard/dashboardSlice";

const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboards } = useSelector((state) => state.dashboards);

  const [loading, setLoading] = useState(false);

  const getDashBoardData = async () => {
    setLoading(true);
    try {
      await dispatch(fetchDashboard()).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashBoardData();
  }, [dispatch]);

  if (loading) {
    return <Spin size="large" />;
  }

  const data = [
    { name: "Jan", TotalTours: 30, TotalBookings: 20 },
    { name: "Feb", TotalTours: 40, TotalBookings: 25 },
    { name: "Mar", TotalTours: 50, TotalBookings: 30 },
    { name: "Apr", TotalTours: 60, TotalBookings: 40 },
    { name: "May", TotalTours: 70, TotalBookings: 50 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        {/* Card for Total Tours */}
        <Col span={8}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              backgroundColor: "#e6f7ff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Meta
              title="Tổng số lượng tour"
              description={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                  <Statistic
                    value={dashboards.totalTours}
                    precision={0}
                    valueStyle={{ color: "#1890ff", marginLeft: "10px" }}
                  />
                </div>
              }
            />
          </Card>
        </Col>

        {/* Card for Total Bookings */}
        <Col span={8}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              backgroundColor: "#fff7e6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Meta
              title="Tổng đơn đặt"
              description={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BookOutlined style={{ fontSize: "24px", color: "#faad14" }} />
                  <Statistic
                    value={dashboards.totalBookings}
                    precision={0}
                    valueStyle={{ color: "#faad14", marginLeft: "10px" }}
                  />
                </div>
              }
            />
          </Card>
        </Col>

        {/* Card for Total Revenue */}
        <Col span={8}>
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              backgroundColor: "#fff0f6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Meta
              title="Doanh thu"
              description={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DollarCircleOutlined style={{ fontSize: "24px", color: "#cf1322" }} />
                  <Statistic
                    value={dashboards.totalRevenue}
                    precision={2}
                    valueStyle={{ color: "#cf1322", marginLeft: "10px" }}
                    prefix="₫"
                    suffix="VND"
                  />
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Chart Section */}
      <Row gutter={16}>
        <Col span={12}>
          <Card
            hoverable
            title="Thống kê số lượng tour nhận và hủy"
            style={{
              borderRadius: "10px",
              backgroundColor: "#f0f5ff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={730} height={250} data={dashboards?.monthlyBookingStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="acceptedBookingsCount" fill="#8884d8" name="Tour đã nhận" />
                <Bar dataKey="canceledBookingsCount" fill="#82ca9d" name="Tour đã hủy" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            title="Booking & Tour Trends"
            style={{
              borderRadius: "10px",
              backgroundColor: "#e6f7ff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="TotalTours" stroke="#3f8600" />
                <Line type="monotone" dataKey="TotalBookings" stroke="#1d39c4" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
