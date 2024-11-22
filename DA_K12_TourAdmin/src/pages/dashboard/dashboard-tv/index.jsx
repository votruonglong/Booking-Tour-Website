import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Spin, Divider } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, PieChart, Pie, Cell, RadialBarChart, RadialBar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { UserOutlined, BookOutlined, DollarCircleOutlined } from '@ant-design/icons'; // Thêm icon
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryRevenue, fetchDashboard, fetchTotalTour, fetchTourComment } from "@redux/features/dashboard/dashboardSlice";

const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboards, categoryRevenue, bookingsTour, tourComment } = useSelector((state) => state.dashboards);

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

  const getcategoryRevenue = async () => {
    setLoading(true);
    try {
      await dispatch(fetchCategoryRevenue()).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingTour = async () => {
    setLoading(true);
    try {
      await dispatch(fetchTotalTour()).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTourCommentDashBoard = async () => {
    setLoading(true);
    try {
      await dispatch(fetchTourComment()).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDashBoardData();
    getcategoryRevenue()
    getBookingTour()
    getTourCommentDashBoard()
  }, [dispatch]);

  if (loading) {
    return <Spin size="large" />;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const truncateText = (text, maxLength = 10) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

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
            <ResponsiveContainer width="100%" height={250}>
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
            title="Doanh thu theo Miền"
            style={{
              borderRadius: "10px",
              backgroundColor: "#e6f7ff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart width={730} height={250} data={categoryRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoryName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalRevenue" fill="#8884d8" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            title="Thống kê số lượng đặt từng tour"
            style={{
              borderRadius: "10px",
              backgroundColor: "#e6f7ff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={730} height={250}>
                <Pie
                  data={bookingsTour}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={90}
                  fill="#8884d8"
                  dataKey="totalBookings"
                  nameKey="tourName"
                >
                  {bookingsTour.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />

              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            title="Tour được yêu thích nhất"
            style={{
              borderRadius: "10px",
              backgroundColor: "#e6f7ff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart width={730} height={250} data={tourComment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tourName" tickFormatter={(tick) => truncateText(tick, 10)} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="commentCount" fill="#8884d8" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
